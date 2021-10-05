var express = require('express');
var router = express.Router();

/* GET notes listing. */
router.get('/listNote', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST notes creating. */
router.post('/createNote', function(req, res, next) {
  res.send('respond with a resource');
});

/* PUT notes modifying. */
router.put('/modifyNote', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE notes deleting. */
router.delete('/deleteNote', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
