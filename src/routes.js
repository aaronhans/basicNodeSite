var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//router.post('/comment',urlencodedParser,require('./routes/comment'))
router.get('/:owner/:id', require('./routes/project'));
router.get('*',require('./routes/404'));

module.exports = router;