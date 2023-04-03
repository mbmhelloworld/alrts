import * as mongoose from 'mongoose';
import dotenv from "dotenv";

const setMongo = async (): Promise<any> => {
  const mongodbURI: string = process.env.MONGODB_URI as string;
  try {
    await mongoose.connect(mongodbURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
};

export default setMongo;
