import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  score: Number,   // Number is shorthand for {type: Number}
  name: String,
  subject: String
});
const User = mongoose.model('User', UserSchema);

export default User;


