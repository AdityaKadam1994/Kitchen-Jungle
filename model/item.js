const mongoConnection = require("../config");

const ItemSchema = {
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    redirection: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
};

const item = mongoConnection.model("item", mongoConnection.Schema(ItemSchema));

module.exports = item;

