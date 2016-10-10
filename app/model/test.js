var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var BookSchema = new mongoose.Schema({
	 name: String 
});
mongoose.model('Book',BookSchema);