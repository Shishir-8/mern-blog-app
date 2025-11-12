import mongoose from "mongoose";

let cached = global.mongoose;
if(!cached) {
  cached = global.mongoose = {conn: null, promise: null}
}

const connectDB = async () => {
  if(cached.conn) {
    return cached.conn
  }

  if(!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((mongoose) => mongoose)
  }

    try {
    cached.conn = await cached.promise;
    console.log('Mongodb Connected')
    return cached.conn
  } catch (error) {
    console.error("DB Connection Failed ❌", error.message);
    process.exit(1);
  }
}

export default connectDB;