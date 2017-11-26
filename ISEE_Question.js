var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// da fare
// I topic sono una collezione di domande
// Ogni domanda ha un rating e una risposta

// Devo vedere se conviene fare i topic come collections 
// e dentro ogni topic avere un json (Domanda, Risposta, rating)

// e come accedere a queste collection
var QuestionSchema = new Schema({
	value : String,
	answer : String,
	rating : String
});

module.exports = mongoose.model('isee_questions', QuestionSchema);