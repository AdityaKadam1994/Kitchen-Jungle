var express = require('express');
const multer = require('multer');
const path = require('path');

var router = express.Router();

let item = require('../controllers/itemController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const thumbnailFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({ storage: storage, fileFilter: thumbnailFilter })

// Routers
router.get("/", item.getItems);
router.get("/:id", item.getItem);
router.post("/", upload.single('thumbnail'), item.createItem);
// router.put("/:id", item.updateItem);
// router.delete("/:id", item.deleteItem);

module.exports = router;
