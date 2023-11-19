 //Reference : https://blog.appsignal.com/2023/08/09/how-to-use-mongodb-and-mongoose-for-nodejs.html
 import mongoose from "mongoose";


let db = null;

async function connectDB() {
  if (!db) {
        try {
            const connection = await mongoose.connect(`mongodb+srv://Cluster96567:SOEN341@cluster96567.wpnpdsc.mongodb.net/soen341test`);
            db = connection;
        } catch (err) {
            console.error('Failed to connect to MongoDB', err);
            process.exit(1);
        }
    }
    return db;
};

export default connectDB;