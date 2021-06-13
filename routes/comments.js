const router = require('express').Router();
const commentsRepo = require('../repositories/comments')

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
      const comments = await commentsRepo.getAllComments()//(parseInt(req.query.offset),parseInt(req.query.limit)) ;
      return res.send(comments);
    } catch (err) { console.log(err.message) };
});

router.get('/articles/:id', async (req, res) => {
    try {
      const comments = await commentsRepo.getCommentsByArticleId(req.params.id)//(parseInt(req.query.offset),parseInt(req.query.limit)) ;
      return res.send(comments);
    } catch (err) { console.log(err.message) };
});
    
router.get('/:id', async (req,res) => {
  try {
    const comment = await commentsRepo.getComment(req.params.id);
    if (comment)
      res.send(comment);
    else
     res.send({});
  } catch (err) { console.log(err.message) };
});

router.post('/', async (req,res) => {
  try {
    commentsRepo.addComment(req.body);
    res.send("Comment Added !");
  } catch (err) { console.log(err.message) };
});

router.put('/:id', async (req,res) => {
  try {
    const id = req.params.id ;
    const [updated] = await commentsRepo.updateComment(id,req.body);
    if (updated) {
      res.send('Comment updated !');
    }
    else {
      res.send('Comment not found !');
    }
  } catch (err) { console.log(err.message) };
});

router.delete('/:id', async (req,res) => {
  try {
    const id = req.params.id ;
    const deleted = await commentsRepo.deleteComment(id);
    if (deleted) {
      res.send("Comment deleted !");
    }
    else {
      res.send('Comment not found !');
    }
  } catch (err) { console.log(err.message) };
});

module.exports = router;