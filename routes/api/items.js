const express = require("express");
const router = express.Router();
var multer = require("multer");
const fileUpload = require("express-fileupload");
var path = require("path");
// var upload = multer({ dest: "./uploads/" });
// router.use(fileUpload());

// const storage = multer.diskStorage({
//   // destination: function (req, file, cb) {
//   //   // cb(null, "./uploads/");
//   //   cb(null, "uploads/");

//   //   // cb(null, "uploads/");
//   // },

//   destination: "./public/uploads/",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage }).single("thumbnail");
// console.log(upload);
//Item Model
const Item = require("../../models/item");

//Get request   api/items

router.get("/", (req, res) => {
  Item.find().then((items) => res.json(items));
});

router.get("/:id", (req, res) => {
  Item.findById(req.params.id).then((items) => {
    res.status(200).json(items);
  });
});

//Post request   api/items

router.post("/", (req, res) => {
  console.log(req.files);
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uplaoded" });
  }
  const file = req.files.thumbnail;
  file.mv(
    `/Practice/MERN/Kitchen_Jungle/client/public/uploads/${file.name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      const newItem = new Item({
        title: req.body.title,
        ingredients: req.body.ingredients,
        redirection: req.body.redirection,
        thumbnail: `/uploads/${file.name}`,
      });
      newItem.save().then((item) => res.json(item));
    }
  );
});

//Delete request   api/items

router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

//Put request
router.put("/:id", (req, res) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Item.findOne({ _id: req.params.id }).then((item) => {
        res.send(item);
      });
    })
    .catch((err) => res.status(404).json({ error: err }));
});

module.exports = router;
