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


//for templates 06/12
var bind = require('bind');

var ObjectId = require('mongoose').Schema.ObjectId


// Quello che sto per fare è un po una porcata a non so come altro fare
var ISEE_Question = require("./ISEE_Question.js");
var Laurea_Question = require("./Laurea_Question.js");
var Piano_Question = require("./Piano_Question.js");

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
            domanda.value = "domanda_3";
            domanda.answer = "risposta_3";
            domanda.rating = "rating_3";
            domanda.nId = "3";
            domanda.topic = "Laurea";
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
                // res.end(JSON.stringify(questions));
                //res.end(questions[0].value);
     
                bind.toFile('./FRONTEND/search.html', 
                	{
                		domande : questions,
                	},
                	function (data) {
                		res.writeHead(200, {'Content-Type': 'text/html'});
            			res.end(data);
                	}
                );
                console.log(questions);
            });
         }
         else if (ris == "PIANO") {

            console.log("cercherò nel database le risposte riguardanti il PIANO");
            /*var domanda = new Piano_Question
            domanda.value = "domanda_1";
            domanda.answer = "risposta_1";
            domanda.rating = "rating_1";
            domanda.nId = "1";
            domanda.topic = "Piano";
            domanda.save(function(err) {
                if (err) {
                    console.log("errore");
                }
                console.log("domanda creata in che collection finirà?");
            })
            */
            Piano_Question.find(function(err, questions) {
                if (err) {
                    console.log(err);
                }
                 bind.toFile('./FRONTEND/search.html', 
                	{
                		domande : questions,
                	},
                	function (data) {
                		res.writeHead(200, {'Content-Type': 'text/html'});
            			res.end(data);
                	}
                );
                console.log(questions);
            });
         }
         else if (ris == "ISEE") {
            console.log("cercherò nel database le risposte riguardanti l'ISEE");
            /*var domanda = new ISEE_Question();
            domanda.value = "domanda_1";
            domanda.answer = "risposta_1";
            domanda.rating = "rating_1";
            domanda.nId = "1";
            domanda.topic = "Isee";
            domanda.save(function(err) {
                if (err) {
                    console.log("errore");
                }
                console.log("domanda creata in che collection finirà?");
            })*/
            ISEE_Question.find(function(err, questions) {
                if (err) {
                    console.log(err);
                }
                // OK COSI FUNZIA
                // res.end(JSON.stringify(questions));
                //res.end(questions[0].value);
     
                bind.toFile('./FRONTEND/search.html', 
                	{
                		domande : questions,
                	},
                	function (data) {
                		res.writeHead(200, {'Content-Type': 'text/html'});
            			res.end(data);
                	}
                );
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

// Handle get req on /LAUREA
app.get('/laurea', function(req, res) {
	Laurea_Question.find(function(err, questions) {
                if (err) {
                    console.log(err);
                }
                // OK COSI FUNZIA
                // res.end(JSON.stringify(questions));
                //res.end(questions[0].value);
                bind.toFile('./FRONTEND/search.html', 
                	{
                		domande : questions
                	},
                	function (data) {
                		res.writeHead(200, {'Content-Type': 'text/html'});
            			res.end(data);
                	}
                );
                console.log(questions);
    });
});

// Handle get req on /LAUREA
app.get('/isee', function(req, res) {
	ISEE_Question.find(function(err, questions) {
                if (err) {
                    console.log(err);
                }
                // OK COSI FUNZIA
                // res.end(JSON.stringify(questions));
                //res.end(questions[0].value);
                bind.toFile('./FRONTEND/search.html', 
                	{
                		domande : questions
                	},
                	function (data) {
                		res.writeHead(200, {'Content-Type': 'text/html'});
            			res.end(data);
                	}
                );
                console.log(questions);
    });
});

// Handle get req on /LAUREA
app.get('/piano', function(req, res) {
	Piano_Question.find(function(err, questions) {
                if (err) {
                    console.log(err);
                }
                // OK COSI FUNZIA
                // res.end(JSON.stringify(questions));
                //res.end(questions[0].value);
                bind.toFile('./FRONTEND/search.html', 
                	{
                		domande : questions
                	},
                	function (data) {
                		res.writeHead(200, {'Content-Type': 'text/html'});
            			res.end(data);
                	}
                );
                console.log(questions);
    });
});



app.get('/risposta', function(req, res) {
	var id = req.query.id;
	var topic = req.query.topic;

	if (topic == "Laurea") {
		// INtanto faccio nel modo sporco ovvero cerco nel database con un for 
		Laurea_Question.find(function(err, questions) {
			if (err) {
				console.log(err);
			}
			// Ciclo
			// da modificarean
			for (var i = 0; i < questions.length; i++) {
				if (questions[i].nId == id) {
					//res.end(questions[i].answer);
					// rimando alla pagina della risposta
					bind.toFile('./FRONTEND/answer.html',
					{
						answer : questions[i].answer
					},
					function(data) {
						res.writeHead(200, {'Content-Type': 'text/html'});
            			res.end(data);
					}
					);
				}
			} 
		});
	}

	if (topic == "Isee") {
		ISEE_Question.find(function(err, questions) {
			if (err) {
				console.log(err);
			}
			for (var i = 0; i < questions.length; i++) {
				if (questions[i].nId == id) {
					// rimando alla pagina della risposta
					bind.toFile('./FRONTEND/answer.html',
					{
						answer : questions[i].answer
					},
					function(data) {
						res.writeHead(200, {'Content-Type': 'text/html'});
            			res.end(data);
					}
					);
				}
			}
		});
	}

	if (topic == "Piano") {
		Piano_Question.find(function(err, questions) {
			if (err) {
				console.log(err);
			}
			for (var i = 0; i < questions.length; i++) {
				if (questions[i].nId == id) {
					// rimando alla pagina della risposta
					bind.toFile('./FRONTEND/answer.html',
					{
						answer : questions[i].answer
					},
					function(data) {
						res.writeHead(200, {'Content-Type': 'text/html'});
            			res.end(data);
					}
					);
				}
			}
		});
	}
});



//listen in a specific port
// Magari dopo si puo pensare di cambiare la porta 
app.listen((process.env.PORT || 80));

//check status
console.log('Server running at http://localhost:80/');

