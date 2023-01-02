import {v4 as uuidv4} from 'uuid';

const Mutation = {
  createArticle: async (parent, {writer, imageURL, description, time, content, title, headline, userpic, id}, {ArticleModel}) => {
    console.log('payload', {writer, imageURL, description, time, content, title, headline, userpic, id})
    if(id === '') id = uuidv4();
    const article =  await ArticleModel.findOne({id})
    if(article) {
      await ArticleModel.updateOne({id}, { $set: {writer, imageURL, description, time, content, title, headline, userpic}})
      return article
    }
    return await new ArticleModel({writer, imageURL, description, time, content, title, headline, userpic, id}).save();
  },
  deleteArticle: async (parent, {id}, {ArticleModel}) => {
    await ArticleModel.deleteOne({id})
    return 'article deleted'
  }
};

export default Mutation