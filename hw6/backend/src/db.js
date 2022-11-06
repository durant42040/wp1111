import mongoose from 'mongoose';
import {deleteDB} from './routes/ScoreCard'



export default {
    connect: () => {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((res) => console.log("mongo db connection created"));

        const db = mongoose.connection;
        db.on("error", (err) => console.log(err));
        db.once("open", async () => {
            await deleteDB();
        });
    }
};


