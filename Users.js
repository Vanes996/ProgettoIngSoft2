var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// da fare
// I topic sono una collezione di domande
// Ogni domanda ha un rating e una risposta

// Devo vedere se conviene fare i topic come collections 
// e dentro ogni topic avere un json (Domanda, Risposta, rating)

// e come accedere a queste collection
var userSchema = new Schema({
	username : String,
	password : String
});

module.exports = mongoose.model('users', userSchema);