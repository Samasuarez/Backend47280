import mongoose from "mongoose";


const collectionName = "user";

const collectionSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
});

const Users = mongoose.model(collectionName, collectionSchema);

export default Users;