import mongoose from 'mongoose';

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: [true, 'Name field is required.']},
    chatBoxes: [{type: mongoose.Types.ObjectId, ref: 'ChatBox'}]
});
const UserModel = mongoose.model('User', UserSchema);

const MessageSchema = new Schema({
    chatBox: {type: String, ref: 'ChatBox'},
    name: {type: String, ref: 'User'},
    body: {type: String, required: [true, 'Body field is required.']}
});

const MessageModel = mongoose.model('Message', MessageSchema);

const ChatBoxSchema = new Schema({
    name: {type: String, required: [true, 'Name field is required.']},
    users: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    messages: [{type: mongoose.Types.ObjectId, ref: 'Message'}]
});

const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

export {UserModel, ChatBoxModel, MessageModel}