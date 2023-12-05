import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnails: [],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user", 
  },
});

productsSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("products", productsSchema);

export default productModel;

