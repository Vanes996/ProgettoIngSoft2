// SERVER
// Prende la domanda inserita dall'utente nella barra di ricerca (per adesso la voce non funziona)
// e stampa sulla console la risposta dell'agent
// Qua il server si collega ad un piccolo agent fatto solo per provare 
// Quando marco avrà l'agent completo cambio gli access token


var express = require('express');
var apiai = require('apiai');

var app = express();
// client access token da cambiare con il mio
var dia = apiai('c22a4fe6d883458e8063bc34327996d5');


//handle get req on /question
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
    // OCCHIO AL CALLBACK HELL BISOGNA ASSICURARSI CHE QUESTO FINISCA PRIMA

    request.on('response', function(response) {
    	 // Devo prendere la risposta vera e propria
         // 24/11 Sostituito l'agent placeholder con il io funziona
         var ris = response.result.fulfillment.speech;
   		 console.log(ris);

         // cercare la risposta nel db
         if (ris == "LAUREA") {
            console.log("cercherò nel database le risposte riguardanti la LAUREA");
         }
         else if (ris == "PIANO") {
            console.log("cercherò nel database le risposte riguardanti il PIANO");
         }
         else if (ris == "ISEE") {
            console.log("cercherò nel database le risposte riguardanti l'ISEE");
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

    //send response
    res.end();
});


//listen in a specific port
// Magari dopo si puo pensare di cambiare la porta 
app.listen((process.env.PORT || 80));

//check status
console.log('Server running at http://localhost:80/');