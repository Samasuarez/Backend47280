import mongoose from "mongoose";
// import { MongoClient } from "mongodb";
// import session from "express-session";
import MongoStore from "connect-mongo";

const mongoConnect = async () => {
  try {
    const mongoUrl =
      "mongodb+srv://sama:suarez@cluster0.iy6wjg4.mongodb.net/your-database-name";

    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("db connected");

    const client = mongoose.connection.getClient();
    const db = client.db(); // Get the MongoDB database instance

    const store = MongoStore.create({
      client,
      dbName: "your-database-name", // Replace with your actual database name
    });

    store.on("error", (error) => {
      console.error("MongoStore Error:", error);
    });

    return store;
  } catch (error) {
    console.log("error al cargar la base de datos", error);
  }
};

export { mongoConnect };

