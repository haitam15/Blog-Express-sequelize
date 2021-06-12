'use strict';
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let users = [];
   let user = {id:undefined,username:undefined,email:undefined,password:undefined,role:undefined,createdAt:undefined,updatedAt:undefined};
   let r=["author","guest","admin"];
   for (let i=0; i<20; i++) {
    user.id = i+1;
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.role = r[faker.datatype.number(2)];
    user.createdAt = user.updatedAt = faker.date.between(1900,2021);
    users.push({...user});
   }
   var k = await queryInterface.bulkInsert('users',users,{});
   return Promise.all([k]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
