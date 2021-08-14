var express = require('express');
var router = express.Router();

const stickerController = require('../controllers/sticker');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

// Autoload for routes using :stickerId
router.param('stickerId', stickerController.load);


// Routes for the resource /stickers
router.get('/stickers',
  stickerController.index);
router.get('/stickers/:stickerId(\\d+)',
  stickerController.show);
router.get('/stickers/new', 
  stickerController.new);
router.post('/stickers', 
  stickerController.create);
router.get('/stickers/:stickerId(\\d+)/edit',
  stickerController.edit);
router.put('/stickers/:stickerId(\\d+)',
  stickerController.update);
router.delete('/stickers/:stickerId(\\d+)',
  stickerController.destroy);

module.exports = router;
