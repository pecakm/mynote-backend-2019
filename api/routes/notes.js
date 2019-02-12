const express = require('express');
const checkAuth = require('../middlewares/check-auth');
const NotesController = require('../controllers/notes-controller');

const router = express.Router();

router.get('/all', checkAuth, NotesController.getAll);

module.exports = router;
