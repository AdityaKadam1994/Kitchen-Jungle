const itemCollection = require('../model/item');

// Get All Item Details
const getItems = (req, res) => {
  itemCollection.find({}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
    res.send(data)
  })
}

// Get one item detail by its id
const getItem = (req, res) => {
  let id = req.param.id;
  itemCollection.find({ id: id }, (err, data) => {
    if (err) {
      res.send(err)
    }
    res.send(data)
  })
}

// Create item information in database
const createItem = (req, res) => {
  let itemData = {}
  itemData['title'] = req.body.title;
  itemData['ingredients'] = req.body.ingredients;
  itemData['redirection'] = req.body.redirection;
  itemData['thumbnail'] = req.file.path;

  itemCollection.insertMany(itemData, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
  res.send({ success: true });
}

module.exports = {
  getItem,
  getItems,
  createItem
}