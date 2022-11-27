import http from 'http';
import express from 'express';
import mongo from './mongo';
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import WebSocket from 'ws';
import wsConnect from './wsConnect';

mongo.connect();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB connected");
    wss.on('connection', (ws) => {
        ws.box = '';
        // wsConnect.initData(ws)
        ws.onmessage = wsConnect.onMessage(wss);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
     // todo
});