import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connection DB successful');
  } catch (error) {
    console.log('Error on DB connection', error);
  }
}
