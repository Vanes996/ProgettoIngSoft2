# ProgettoIngSoft2
Progetto di ingegneria del software

Non ho messo il server in una cartella apposta perche per installare dei moduli di node ti da dei warning se non si ha fatto git init nella cartella
e avevo paura che mettendo i moduli in una cartella interna, node non sarebbe riuscito a trovare la .git e avrebbe dato problemi 

Se qualcuno vuole vedere il database le credenziali sono
LucaBazza
test01

Aggiornamento :
Sono riuscito ad ottenere le domande relative aitdopic dal database.
Serve la struttura della pagina web che andrà a contenere le domande cosi da riuscire poi a inserirci dinamicamente dentro le domande prese dal database per poi
mostrarla all'utente
Bisogna guardare come caricare una pagina web e modificarla via codice
Btw ogni domanda è un JSON, la variabile questions è una lista di JSON

Ogni domanda contiene:
	 value : String
	 answer : String
	 rating : String

Value è l'effettiva stringa corrispondente alla domanda
Answer è la risposta
Rating è il numero di click fatto su quella domanda (aumenta ogni volta che viene cliccata la domanda)

Non so perche non vada a capo spero si capisca comunque


Bisogna inserire tutte le domande e le risposte nel database, nel modificare le domande e risposte nel databse non si possono metteri i doppi apici e a quanto sembra neanche lasciare spazi vuoti, se bisogna andare a capo usate <br> come nell'html
