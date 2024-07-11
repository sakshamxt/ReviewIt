import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if(conn){
      console.log("Connected to the database");
    
    }
  } catch (error) {
    console.log(`Mongoose connection error: ${error.message}`);
  }
};

export default connectDB;
