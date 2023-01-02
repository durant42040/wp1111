import mongoose from 'mongoose';

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    writer: {
        type: String,
        required: [true, 'writer is required.']
    },
    description: {
        type: String,
        required: [true, 'description is required.']
    },
    imageURL: {
        type: String,
    },
    time: {
        type: String,
    },
    title: {
        type: String,
        required: [true, 'title is required.']
    },
    headline: {
        type: Boolean,
        required: [true, 'is this headline?']
    },
    content: {
        type: String,
        required: [true, 'content is required.']
    },
    userpic: {
        type: String,
    },
    id: {
        type: String
    }
});

const ArticleModel = mongoose.model('Article', ArticleSchema);

export default ArticleModel;