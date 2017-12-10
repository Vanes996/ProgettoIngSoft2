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


var ISEE_Question = require("./ISEE_Question.js");
var Laurea_Question = require("./Laurea_Question.js");
var Piano_Question = require("./Piano_Question.js");

// per la segreteria se vuole aggiungere domande
var db_user = require("./Users.js");

var bodyParser = require('body-parser');
var util = require('util');

/* Configure express app to use bodyParser()
 * to parse body as URL encoded data
 * (this is how browser POST form data)
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// variabile per il login
var logged = false;

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
                		loggedIn : logged
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
            Piano_Question.find(function(err, questions) {
                if (err) {
                    console.log(err);
                }
                 bind.toFile('./FRONTEND/search.html', 
                	{
                		domande : questions,
                		loggedIn : logged
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
                		loggedIn : logged
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
                		domande : questions,
                		loggedIn : logged
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
                		domande : questions,
                		loggedIn : logged
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
                		domande : questions,
                		loggedIn : logged
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


// LINK PER INSERIRE UNA DOMANDA
// Problema con gli id 
// non faccio inserire l'id della domanda
// prendo l'id piu alto nel db faccio + 1 e gli do quell'id
app.get('/insertQuestion', function(req, res) {
	console.log("INSERIRE DOMANDA");
	bind.toFile('./FRONTEND/insert.html', 
	{

	},
	function(data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
	}
	); 
});

app.post('/insert', function(req, res) {
	var d = req.body.question;
	var a = req.body.answer;
	var t = req.body.topic;

	var maxId = 0;

	if (t == "Laurea") {
		Laurea_Question.find(function(err, questions) {
			maxId = questions.length+1;
            // ci sarebbe anche da gestire err
			// Salvol la domanda

            var domanda = new Laurea_Question();
            domanda.value = d;
            domanda.answer = a;
            domanda.rating = "1";
            domanda.nId = maxId.toString();
            domanda.topic = "Laurea";
            domanda.save(function(err) {
                if (err) {
                    console.log("errore");
                }
                // IN alternativa si puo rimandare alla pagina prima
                res.end("DOMANDA CREATA");
            });
		});
	}

    if (t == "Isee") {
        ISEE_Question.find(function(err, questions) {
            maxId = questions.length+1;

            // Salvol la domanda

            var domanda = new ISEE_Question();
            domanda.value = d;
            domanda.answer = a;
            domanda.rating = "1";
            domanda.nId = maxId.toString();
            domanda.topic = "Laurea";
            domanda.save(function(err) {
                if (err) {
                    console.log("errore");
                }
                res.end("DOMANDA CREATA");
            });
        });
    }

    if (t == "Piano") {
        Piano_Question.find(function(err, questions) {
            maxId = questions.length+1;

            // Salvol la domanda

            var domanda = new Piano_Question();
            domanda.value = d;
            domanda.answer = a;
            domanda.rating = "1";
            domanda.nId = maxId.toString();
            domanda.topic = "Piano";
            domanda.save(function(err) {
                if (err) {
                    console.log("errore");
                }
                res.end("DOMANDA CREATA");
            });
        });
    }

});


// Listen to /login 
// Apre la form di login
app.get('/login', function(req, res){

    // INTANTO INSERISCO QUA L'UTENTE PER TESTARE
    // Luca
    // test01
   /*var utente = new db_user();
    utente.username = "Luca";
    utente.password = "test01";
    utente.save(function(err) {
        if (err) {
            console.log(err);
        }

    });*/


    bind.toFile('./FRONTEND/login.html', 
    {

    },
    function(data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    }    

    );
});


// Prende il nome utente e la password inserite nella form
// Guarda se c'è nel database
// In caso mette la variabile login a true
app.post('/loginForm', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
     
    // Guardo se c'è l'utente nel db
    db_user.find(function(err, users) {
        if (err) {
            console.log(err);
        }
        console.log("USERS");
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username && users[i].password == password) {
                logged = true;
                // DA CAMBIARE
                res.end("LOGGED IN");
            }
        }
    });
});

//listen in a specific port
// Magari dopo si puo pensare di cambiare la porta 
app.listen((process.env.PORT || 80));

//check status
console.log('Server running at http://localhost:80/');

