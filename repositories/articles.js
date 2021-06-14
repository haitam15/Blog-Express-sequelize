const { Article } = require('../models')

module.exports = {
    getAllArticles() {
        return Article.findAll();
    },
    geArticles(offset=0, limit=10) {
        return Article.findAll({
             offset: offset,
              limit: limit
            });
    },
    getArticlesByUserId(userId) {
        return Article.findAll({ where: { UserId: userId } });
    },
    getArticle(id) {
        return Article.findOne({ where: { id: id } });
    },
    getArticleByTitle(title) {
        return Article.findOne({ where: { title: title } });
    },
    addArticle(article) {
        Article.create(article);
    },
    updateArticle(id,article) {
        return Article.update(article, { where: { id: id } } );
    },
    deleteArticle(id) {
        return Article.destroy({ where: { id: id } });
    }
}