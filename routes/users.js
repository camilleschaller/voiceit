var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/listUser', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users creating. */
router.post('/createUser', function(req, res, next) {
  res.send('respond with a resource');
});

/* PUT users modifying. */
router.put('/modifyUser', function(req, res, next) {
  res.send('respond with a resource');
});

/* DELETE users deleting. */
router.delete('/deleteUser', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
