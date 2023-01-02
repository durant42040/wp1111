import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import data from './db'
import ArticleModel from "./models/article";

export default {
    connect: () => {
    dotenv.config();
    if (!process.env.MONGO_URL) {
        console.error("missing MONGO_URL");
        process.exit(1);
    }
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then( async (res) => {
        console.log("mongo db connection created")
        await ArticleModel.deleteMany()
        await ArticleModel.insertMany(data)
        console.log("data saved")
    });

    mongoose.connection.on('error',
            console.error.bind(console, 'connection error:')); }
};
 
