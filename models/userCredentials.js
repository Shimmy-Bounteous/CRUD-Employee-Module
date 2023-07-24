const mongoose = require('mongoose');

const userCredentialsSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true,
        // unique doesn't validate whether there's a duplicate. It just provides some performance benefits
        unique: true,
    },
    password: { type: String, required: true}
});

const UserCredentials = mongoose.model('UserCredentials', userCredentialsSchema);

module.exports = UserCredentials;