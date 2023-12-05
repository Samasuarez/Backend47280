import mongoose, { Schema } from "mongoose";
import cartModel from "./carts.model.js";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ["usuario", "admin", "premium"], 
    default: "usuario",
  },
  age: {
    type: Number,
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
});

userSchema.pre("save", async function (next) {
  try {
    const newCart = await cartModel.create({});
    this.cart = newCart._id;
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
