var express = require('express'),
  router = express.Router();

router.get('/logout', function(req, res) {
  res.clearCookie('cookie');
  res.send({
    "status": false,
    "message": "logged out"
  });
});
module.exports = router;
