var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    birthDate: { type: Date, required: true }
});

module.exports = mongoose.model('User', User);