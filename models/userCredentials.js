const mongoose = require('mongoose');

const userCredentialsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    email: { 
        type: String, 
        required: true,
        // unique doesn't validate whether there's a duplicate. It just provides some performance benefits
        unique: true,
        // email regex 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true}
});

const UserCredentials = mongoose.model('UserCredentials', userCredentialsSchema);

module.exports = UserCredentials;