const mongoose = require('mongoose');
const CONSTANTS = require('../helpers/constants');
const Note = require('../models/note');

exports.getNotes = (req, res, next) => {
    Note.find({
        user: req.userData.id,
        date: { $gte: req.params.timestamp, $lt: Number(req.params.timestamp) + CONSTANTS.TIMESTAMP_24_HOURS * 7 },
    }).then(notes => {
        res.status(200).json(notes);
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}

exports.save = (req, res, next) => {
    Note.findOne({
        user: req.userData.id,
        date: req.body.date
    }).then(note => {
        if (note) {
            updateNote(note, req.body.content, res);
        } else {
            createNote(req, res);
        }
    }).catch(error => {
        res.status(500).json({ error: error });
    });
};

function updateNote(note, content, res) {
    note.content = content;
    
    note.save().then(addedNote => {
        res.status(201).json({ message: 'OK' });
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}

function createNote(req, res) {
    let note = new Note({
        _id: new mongoose.Types.ObjectId,
        content: req.body.content,
        date: req.body.date,
        user: req.userData.id
    });

    note.save().then(addedNote => {
        res.status(201).json({ message: 'OK' });
    }).catch(error => {
        res.status(500).json({ error: error });
    });
}