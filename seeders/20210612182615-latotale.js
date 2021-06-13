'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [];
    let tags = [];
    let articles = [];
    let comments = [];
    let tagArticles = [];
    let user = {id:undefined,username:undefined,email:undefined,password:undefined,role:undefined,createdAt:undefined,updatedAt:undefined};
    let tag = {id:undefined,name:undefined,createdAt:undefined,updatedAt:undefined};
    let article = {id:undefined,title:undefined,content:undefined,published:true,createdAt:undefined,updatedAt:undefined,UserId:undefined};
    let comment = {content:undefined,ArticleId:undefined,createdAt:undefined,updatedAt:undefined};
    let tagArticle = {TagId:undefined,ArticleId:undefined,createdAt:undefined,updatedAt:undefined}
    const r = ['admin','author','guest']
    let idArticle = 1 ;
    let tagIndex;
    let emailSet = new Set();
    let tagNameSet = new Set();
    let articleTitleSet = new Set();
    for (let i=0 ; i<10 ; i++) {
      tag.id = i+1;
      do {
        tag.name = faker.lorem.sentence(3);
      } while (tagNameSet.has(tag.name));
      tagNameSet.add(tag.name);
      tags.push({...tag});
    }
    for (let i=0 ; i<20 ; i++) {
      user.id = i+1;
      user.username = faker.internet.userName();
      do {
        user.email = faker.internet.email();
      } while (emailSet.has(user.email));
      emailSet.add(user.email);
      user.password = faker.internet.password();
      user.role = r[faker.datatype.number(2)];
      user.createdAt = user.updatedAt = faker.date.between(2000,2021);
      users.push({...user});
      const articleNumber = faker.datatype.number(8)+2 ;
      for (let j=0 ; j<articleNumber ; j++) {
        article.id = idArticle++ ;
        do {
          article.title = faker.random.words();
        } while (articleTitleSet.has(article.title));
        articleTitleSet.add(article.title);
        article.content = faker.lorem.paragraph();
        article.createdAt = article.updatedAt = faker.date.between(user.createdAt,2021);
        article.UserId = i+1 ;
        articles.push({...article});
        const tagNumber = faker.datatype.number(4)+2 ;
        let tagIndexUsed = [] ;
        for (let k=0 ; k<tagNumber ; k++) {
          do {
            tagIndex = faker.datatype.number(9);
          } while (tagIndexUsed.some(index => index===tagIndex)) ;
          tagIndexUsed.push(tagIndex);
          tagArticle.TagId = tagIndex+1 ;
          tagArticle.ArticleId = article.id ;
          tagArticle.createdAt = tagArticle.updatedAt = tags[tagIndex].createdAt = tags[tagIndex].updatedAt = faker.date.between(article.createdAt,2021);
          tagArticles.push({...tagArticle});
        }
        const commentNumber = faker.datatype.number(10);
        for (let k=0 ; k<commentNumber ; k++) {
          comment.content = faker.lorem.paragraph();
          comment.createdAt = comment.updatedAt = faker.date.between(article.createdAt,2021);
          comment.ArticleId = article.id ;
          comments.push({...comment});
        }
      }
    }
    tags.forEach( T => {
      if (T.createdAt===undefined)
          T.createdAt = T.updatedAt = faker.date.between(2000,2021);
    })
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('articles', articles, {});
    await queryInterface.bulkInsert('comments', comments, {});
    await queryInterface.bulkInsert('tags', tags, {});
    await queryInterface.bulkInsert('articletags', tagArticles, {});
    console.log('Done');
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
