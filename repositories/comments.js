const { Comment } = require('../models')

module.exports = {
    getAllComments() {
        return Comment.findAll();
    },
    geComments(offset=0, limit=10) {
        return Comment.findAll({
             offset: offset,
              limit: limit
            });
    },
    getCommentsByArticleId(articleId) {
        return Article.findAll({ where: { ArticleId: articleId } });
    },
    getComment(id) {
        return Comment.findOne({ where: { id: id } });
    },
    addComment(comment) {
        Comment.create(comment);
    },
    updateComment(id,comment) {
        return Comment.update(comment, { where: { id: id } } );
    },
    deleteComment(id) {
        return Comment.destroy({ where: { id: id } });
    }
}