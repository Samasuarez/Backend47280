// import "dotenv/config";
import mongoose from "mongoose";

const mongoConect = async () => {
  try {
    await mongoose.connect("mongodb+srv://sama:suarez@cluster0.iy6wjg4.mongodb.net/?retryWrites=true&w=majority");
    console.log("db conected");
  } catch (error) {
    console.log("error al cargar la base de datos");
  }
};
export default mongoConect;
