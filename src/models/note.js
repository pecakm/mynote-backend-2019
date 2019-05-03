const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Note', noteSchema);
