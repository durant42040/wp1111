import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db'
import User from "../models/ScoreCard"
import dotenv from "dotenv-defaults";
import routes from './routes';

dotenv.config();

const app = express();
app.use('/', routes);
app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 4000;

app.listen(port, () =>
console.log(`Example app listening on port ${port}!`),
);

db.connect();