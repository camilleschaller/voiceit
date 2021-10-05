var express = require('express');
var router = express.Router();

/* GET subjects listing. */
router.get('/listSubject', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST subjects creating. */
router.post('/createSubject', function(req, res, next) {
  res.send('respond with a resource');
});

/* PUT subjects modifying. */
router.put('/modifySubject', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE subjects deleting. */
router.delete('/deleteSubject', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
