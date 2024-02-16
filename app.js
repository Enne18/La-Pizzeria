'use strict';

var createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const restaurantsRouter = require('./routes/restaurants');
const detailRouter = require('./routes/detail');
const reservedRouter = require('./routes/reserved-area');
const menuRouter = require('./routes/menu');
const registerRouter = require('./routes/register-pizzeria');
const sessionsRouter = require('./routes/sessions');
const signupRouter = require('./routes/signup');

var userDao = require('./modules/user-dao');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Implementazione logica login
passport.use('user', new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then(({user, check}) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
));

// Serialize and de-serialize the user (user object <-> session)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userDao.getUserById(id).then(user => {
    done(null, user);
  });
});

// Funzione per determinare se l'utente e' loggato o meno
  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.redirect('/signup');
}

// set up the session
app.use(session({
  secret: 'segreto',
  resave: false,
  saveUninitialized: false 
}));

// Inizializzazione passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', sessionsRouter);
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/detail', detailRouter);
app.use('/reserved-area', isLoggedIn, reservedRouter);
app.use('/menu', isLoggedIn, menuRouter);
app.use('/register-pizzeria', registerRouter);
app.use('/signup', signupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
