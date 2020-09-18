const express = require('express');
const router = new express.Router;

const Plain = require('./controllers/PlainController');

// User routes
router.get('/plain', Plain.index);
router.get('/plain/:id', Plain.show);
router.post('/plain', Plain.create);
router.put('/plain', Plain.update);
router.delete('/plain/:id', Plain.delete);

module.exports = router;