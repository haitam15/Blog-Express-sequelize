const router = require('express').Router();
const articlesRepo = require('../repositories/articles')

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
      const articles = await articlesRepo.getAllArticles()//(parseInt(req.query.offset),parseInt(req.query.limit)) ;
      return res.send(articles);
    } catch (err) { console.log(err.message) };
});

router.get('/users/:id', async (req, res) => {
    try {
      const articles = await articlesRepo.getArticlesByUserId(req.params.id)//(parseInt(req.query.offset),parseInt(req.query.limit)) ;
      return res.send(articles);
    } catch (err) { console.log(err.message) };
});
    
router.get('/:id', async (req,res) => {
  try {
    const article = await articlesRepo.getArticle(req.params.id);
    if (article)
      res.send(article);
    else
     res.send({});
  } catch (err) { console.log(err.message) };
});

router.post('/', async (req,res) => {
  try {
    const {title} = req.body ;
    const istitleValid = await articlesRepo.getArticleByTitle(title);
    if ( !title || istitleValid ) {
      res.send("Title invalid");
    } else {
      articlesRepo.addArticle(req.body);
      res.send("Article Added !");
    }
  } catch (err) { console.log(err.message) };
});

router.put('/:id', async (req,res) => {
  try {
    const id = req.params.id ;
    const {title} = req.body ;
    const istitleValid = await articlesRepo.getArticleByTitle(title);
    if ( !title || ( istitleValid && istitleValid.id!=id ) ) {
      res.send("Title invalid !");
    } else {
      const [updated] = await articlesRepo.updateArticle(id,req.body);
      if (updated) {
        res.send('Article updated !');
      }
      else {
        res.send('Article not found !');
      }
    }
  } catch (err) { console.log(err.message) };
});

router.delete('/:id', async (req,res) => {
  try {
    const id = req.params.id ;
    const deleted = await articlesRepo.deleteArticle(id);
    if (deleted) {
      res.send("Article deleted !");
    }
    else {
      res.send('Article not found !');
    }
  } catch (err) { console.log(err.message) };
});

module.exports = router;