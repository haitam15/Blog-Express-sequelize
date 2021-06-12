const { User } = require('../models');

module.exports = {
    getAllUsers() {
        return User.findAll();
    },
    getUsers(offset=0, limit=10) {
        return User.findAll({
             offset: offset,
              limit: limit
            });
    },
    getAdmins() {
        return User.findAll({ where: { role: "admin" }});
    },
    getAuthors() {
        return User.findAll({ where: { role: "author" } });
    },
    getGuests() {
        return User.findAll({ where: { role: "guest" } });
    },
    getUser(id) {
        return User.findOne({ where: { id: id } });
    },
    getUserByEmail(email) {
        return User.findOne({ where: { email: email } });
    },
    addUser(user) {
        User.create(user);
    },
    updateUser(id,user) {
        return User.update(user, { where: { id: id } } );
    },
    deleteUser(id) {
        return User.destroy({ where: { id: id } });
    }
}