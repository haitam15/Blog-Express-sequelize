const { Tag } = require('../models')

module.exports = {
    getAllTags() {
        return Tag.findAll();
    },
    geTags(offset=0, limit=10) {
        return Tag.findAll({
             offset: offset,
              limit: limit
            });
    },
    getTag(id) {
        return Tag.findOne({ where: { id: id } });
    },
    getTagByName(tagName) {
        return Tag.findOne({ where: { name : tagName } });
    },
    addTag(tag) {
        Tag.create(tag);
    },
    updateTag(id,tag) {
        return Tag.update(tag, { where: { id: id } } );
    },
    deleteTag(id) {
        return Tag.destroy({ where: { id: id } });
    }
}