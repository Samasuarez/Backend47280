import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log("error connecting to the database");
  }
};

const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  ttl: 60,
});

export { mongoConnect, sessionStore };
