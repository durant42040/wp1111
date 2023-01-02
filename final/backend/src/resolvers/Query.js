

const Query = {
  getArticles: async (parent, args, {ArticleModel}) => {
    const articles = await ArticleModel.find({})
    return articles.map((a) => {
      return a
    });
  },
  getArticle: async (parent, {id}, {ArticleModel}) => {
    return await ArticleModel.findOne({id})
  },
};

export default Query;