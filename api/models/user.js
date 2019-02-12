const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: String
});

userSchema.statics.save = (user, res) => {
    user.save().then(updatedUser => {
        res.status(201).json({ message: 'OK' });
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}

module.exports = mongoose.model('User', userSchema);
