import mongoose from "mongoose";

const collection = "products";

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  thumbnails: {
    type: Array,
    require: false,
    default: [],
  },
});

const productsModel = mongoose.model(collection, schema);

export default productsModel;
