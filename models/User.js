const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require:true,
        minLength: 4,
    },
});

// Hash password before saving to database
userSchema.pre('save', function (next) {

    return bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            return next;
        })
        .catch(err => {
            return next(err);
        })
});


// Check if passwords match
userSchema.methods.validatePassword = function (passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');