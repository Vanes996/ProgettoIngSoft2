// SERVER 
// Prende  la domanda inserita dall'utente nella barra di ricerca (per adesso la voce non funziona)
// e stampa sulla console la risposta dell'agent
// Qua il server si collega ad un piccolo agent fatto solo per provare 
// Quando marco avrà l'agent completo cambio gli access token


var express = require('express');
var apiai = require('apiai');
// 26/11 aggiorno per il database
var mongoose = require('mongoose');
mongoose.connect('mongodb://LucaBazza:test01@ds121716.mlab.com:21716/database_topic');

var app = express();
// client access token da cambiare con il mio
var dia = apiai('c22a4fe6d883458e8063bc34327996d5');


// Quello che sto per fare è un po una porcata a non so come altro fare
var ISEE_Question = require("./ISEE_Question.js");
var Laurea_Question = require("./Laurea_Question.js");
var Piano_Question = require("./Piano_Question.js");

//handle get req on /question
// Due funzioni annodate c'è un problema di callback la funzione esterna finsice prima della funzione interna TO DO
app.get('/question', function (req, res) {    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    //process
    // questionValue è il nome della barra di ricerca nell'html
    var q = req.query.questionValue;
    //write response

    // Richiesta 
    // sessionId da cambiare con quello di Marco
    var request = dia.textRequest(q, {
    	sessionId: 'unibot-437c3'
    });

    // HO PROVATO A CREARE A MANO LE DOMANDE E QUANDO FA IL FIND NON LE TROVA
    // ALLA PEGGIO LE INSERIAMO TUTTE VIA CODICE
    // IL CODDICE CHE HO COMMMENTATO SERVE A QUELLO
    request.on('response', function(response) {
    	 // Devo prendere la risposta vera e propria
         // 24/11 Sostituito l'agent placeholder con il io funziona
         var ris = response.result.fulfillment.speech;
   		 console.log(ris);

         // cercare la risposta nel db
         if (ris == "LAUREA") {
            console.log("cercherò nel database le risposte riguardanti la Laurea");
            /*var domanda = new Laurea_Question();
            domanda.value = "questa è la prima domanda";
            domanda.answer = "questa è la risposta alla prima domanda";
            domanda.rating = "1 è una stringa dopo devo cambiare";
            domanda.save(function(err) {
                if (err) {
                    console.log("errore");
                }
                console.log("domanda creata in che collection finirà?");
            });*/
            Laurea_Question.find(function(err, questions) {
                if (err) {
                    console.log(err);
                }
                // OK COSI FUNZIA
                res.end(JSON.stringify(questions));
                console.log(questions);
            });
         }
         else if (ris == "PIANO") {
            console.log("cercherò nel database le risposte riguardanti il PIANO");
            Piano_Question.find(function(err, questions) {
                if (err) {
                    console.log(err);
                }
                console.log(questions);
            });
         }
         else if (ris == "ISEE") {
            console.log("cercherò nel database le risposte riguardanti l'ISEE");
            ISEE_Question.find(function(err, questions) {
                if (err) {
                    console.log(err);
                }
                console.log(questions);
            });
         }
         else {
            console.log("non ci arriva mai in teoria ma lo metto per il futuro"); 
         }

	});

	request.on('error', function(error) {
    	 // Devo prendere la risposta vera e propria
   		 console.log(error);
	});
	request.end();

});


//listen in a specific port
// Magari dopo si puo pensare di cambiare la porta 
app.listen((process.env.PORT || 80));

//check status
console.log('Server running at http://localhost:80/');