const express = require('express');
const checkAuth = require('../middlewares/check-auth');
const NotesController = require('../controllers/notes-controller');

const router = express.Router();

router.get('/:timestamp', checkAuth, NotesController.getNotes);
router.post('/save', checkAuth, NotesController.save);

module.exports = router;
