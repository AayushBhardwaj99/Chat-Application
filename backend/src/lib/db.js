import mongoose from "mongoose";

export async function connectDb() {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("Mongo URI is required");
    }

    const conn = await mongoose.connect(mongoURI);

    console.log("MongoDb Connected Successfully", conn.connection.host);

  } catch (error) {

    console.error("MongoDb connection error:", error.message);

    process.exit(1);
  }
}
//1 means failed and 0 means success