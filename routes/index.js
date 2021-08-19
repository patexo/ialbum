var express = require('express');
var router = express.Router();

const stickerController = require('../controllers/sticker');
const cromoController = require('../controllers/cromo');

const { Pool } = require ('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Stickers');
    const results = { 'results': (result) ? result.rows : null};
    res.render('db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// Autoload for routes using :stickerId
router.param('stickerId', stickerController.load);

// Autoload for routes using :cromoId
router.param('cromoId', cromoController.load);

// Routes for the resource /cromos
router.get('/cromos',
  cromoController.index);

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
