CREATE TABLE "Utente" (
	"Email"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"ID_User"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("ID_User")
);

CREATE TABLE "Recensione" (
	"Testo"	TEXT,
	"Voto"	INTEGER NOT NULL,
	"Email"	TEXT NOT NULL UNIQUE,
	"ID_User"	INTEGER NOT NULL UNIQUE,
	"ID_Pizzeria"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("ID_User","ID_Pizzeria"),
	FOREIGN KEY("ID_Pizzeria") REFERENCES "Pizzeria"("ID_Pizzeria"),
	FOREIGN KEY("ID_User") REFERENCES "Utente"("ID_User")
);

CREATE TABLE "Proprietario" (
	"Email"	TEXT NOT NULL UNIQUE,
	"Password"	TEXT NOT NULL,
	"ID_Prop"	INTEGER NOT NULL UNIQUE,
	PRIMARY KEY("ID_Prop")
);

CREATE TABLE "Prenotazione" (
	"ID_Prenotazione"	INTEGER NOT NULL UNIQUE,
	"NumeroPersone"	INTEGER NOT NULL,
	"Orario"	TEXT NOT NULL,
	PRIMARY KEY("ID_Prenotazione")
);

CREATE TABLE "Pizzeria" (
	"ID_Pizzeria"	INTEGER NOT NULL UNIQUE,
	"Nome"	TEXT NOT NULL,
	"Indirizzo"	TEXT NOT NULL,
	"Orari"	TEXT NOT NULL,
	"Tipologia"	INTEGER NOT NULL,
	"GoogleMapsLink"	TEXT,
	PRIMARY KEY("ID_Pizzeria")
);

CREATE TABLE "Pizza" (
	"Nome"	TEXT NOT NULL,
	"ID_Pizzeria"	NUMERIC NOT NULL,
	"Ingredienti"	TEXT NOT NULL,
	"Prezzo"	NUMERIC NOT NULL,
	"ID_Pizza"	INTEGER NOT NULL UNIQUE,
	FOREIGN KEY("ID_Pizzeria") REFERENCES "Pizzeria"("ID_Pizzeria"),
	PRIMARY KEY("ID_Pizza")
);

CREATE TABLE "Ordine" (
	"ID_Ordine"	INTEGER NOT NULL,
	"ID_User"	INTEGER NOT NULL,
	"ID_Pizzeria"	INTEGER NOT NULL,
	"ID_Pizza1"	INTEGER NOT NULL,
	"ID_Pizza2"	INTEGER,
	"ID_Pizza3"	INTEGER,
	"ID_Pizza4"	INTEGER,
	"ID_Pizza5"	INTEGER,
	"ID_Pizza6"	INTEGER,
	"ID_Pizza7"	INTEGER,
	"ID_Pizza8"	INTEGER,
	"ID_Pizza9"	INTEGER,
	"ID_Pizza10"	INTEGER,
	PRIMARY KEY("ID_Ordine"),
	FOREIGN KEY("ID_User") REFERENCES "Utente"("ID_User"),
	FOREIGN KEY("ID_Pizzeria") REFERENCES "Pizzeria"("ID_Pizzeria"),
	FOREIGN KEY("ID_Pizza1") REFERENCES "Pizza"("ID_Pizza"),
	FOREIGN KEY("ID_Pizza2") REFERENCES "Pizza"("ID_Pizza"),
	FOREIGN KEY("ID_Pizza3") REFERENCES "Pizza"("ID_Pizza"),
	FOREIGN KEY("ID_Pizza4") REFERENCES "Pizza"("ID_Pizza"),
	FOREIGN KEY("ID_Pizza5") REFERENCES "Pizza"("ID_Pizza"),
	FOREIGN KEY("ID_Pizza6") REFERENCES "Pizza"("ID_Pizza"),
	FOREIGN KEY("ID_Pizza7") REFERENCES "Pizza"("ID_Pizza"),
	FOREIGN KEY("ID_Pizza8") REFERENCES "Pizza"("ID_Pizza"),
	FOREIGN KEY("ID_Pizza9") REFERENCES "Pizza"("ID_Pizza"),
	FOREIGN KEY("ID_Pizza10") REFERENCES "Pizza"("ID_Pizza")
);
