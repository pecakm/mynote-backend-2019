const mongoose = require('mongoose');
const Note = require('../models/note');

exports.getAll = (req, res, next) => {
    Note.find().then(notes => {
        res.status(200).json(notes);
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}
