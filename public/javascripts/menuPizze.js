var pizzeriaDao = require('../modules/pizzeria-dao');

function nuovaPizza() {
  var modalContainer = document.getElementById('nuovaPizza');

  var form = document.createElement('form');
  form.classList.add('nuova-pizza-form');

  var nomeLabel = document.createElement('label');
  nomeLabel.textContent = 'Nome:';
  var nomeInput = document.createElement('input');
  nomeInput.type = 'text';
  nomeInput.classList.add('form-control');
  nomeInput.name = 'Nome';
  nomeInput.required = true;

  var ingredientiLabel = document.createElement('label');
  ingredientiLabel.textContent = 'Ingredienti:';
  var ingredientiInput = document.createElement('input');
  ingredientiInput.type = 'text';
  ingredientiInput.classList.add('form-control');
  ingredientiInput.name = 'Ingredienti';
  ingredientiInput.required = true;

  var prezzoLabel = document.createElement('label');
  prezzoLabel.textContent = 'Prezzo:';
  var prezzoInput = document.createElement('input');
  prezzoInput.type = 'number';
  prezzoInput.classList.add('form-control');
  prezzoInput.name = 'Prezzo';
  prezzoInput.required = true;

  var confermaButton = document.createElement('button');
  confermaButton.type = 'button';
  confermaButton.textContent = 'Conferma';
  confermaButton.classList.add('btn', 'btn-primary');

  confermaButton.onclick = function () {
    // Ottenere i valori inseriti dall'utente
    var nuovoNome = nomeInput.value;
    var nuoviIngredienti = ingredientiInput.value;
    var nuovoPrezzo = prezzoInput.value;

    // Creare un oggetto pizza con i valori ottenuti
    var Pizza = {
      PizzaNome: nuovoNome,
      Ingredienti: nuoviIngredienti,
      Prezzo: nuovoPrezzo
    };

    // Aggiungere la nuova pizza alla lista
    pizzeriaDao.insertPizza(Pizza, req.params.ID_Pizzeria)
      .then(function (pizzaInserita) {
        console.log('Pizza inserita con successo:', pizzaInserita);
        // Qui puoi gestire ulteriori azioni dopo l'inserimento della pizza nel database, se necessario
      })
      .catch(function (errore) {
        console.error('Errore durante l\'inserimento della pizza: ', errore);
        // Gestisci l'errore in base alle tue esigenze
      });

    // Pulire i campi del modulo
    nomeInput.value = '';
    ingredientiInput.value = '';
    prezzoInput.value = '';

    // Chiudere il modulo
    $('#nuovaPizza').modal('hide');
  };
}