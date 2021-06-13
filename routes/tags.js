const router = require('express').Router();
const tagsRepo = require('../repositories/tags')

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
      const tags = await tagsRepo.getAllTags()//(parseInt(req.query.offset),parseInt(req.query.limit)) ;
      return res.send(tags);
    } catch (err) { console.log(err.message) };
});

router.get('/articles/:id', async (req, res) => {
    try {
      const tags = await tagsRepo.getTagsByArticleId(req.params.id)//(parseInt(req.query.offset),parseInt(req.query.limit)) ;
      return res.send(tags);
    } catch (err) { console.log(err.message) };
});
    
router.get('/:id', async (req,res) => {
  try {
    const tag = await tagsRepo.getTag(req.params.id);
    if (tag)
      res.send(tag);
    else
     res.send({});
  } catch (err) { console.log(err.message) };
});

router.post('/', async (req,res) => {
  try {
    const {name} = req.body ;
    const isNameValid = tagsRepo.getTagByName(name);
    if ( !name || isNameValid ) {
      res.send("Name invalid !");
    } else {
    tagsRepo.addTag(req.body);
    res.send("Tag Added !");
    }
  } catch (err) { console.log(err.message) };
});

router.put('/:id', async (req,res) => {
  try {
    const id = req.params.id ;
    const [updated] = await tagsRepo.updateTag(id,req.body);
    if (updated) {
      res.send('Tag updated !');
    }
    else {
      res.send('Tag not found !');
    }
  } catch (err) { console.log(err.message) };
});

router.delete('/:id', async (req,res) => {
  try {
    const id = req.params.id ;
    const {name} = req.body ;
    const isNameValid = tagsRepo.getTagByName(name);
    if ( !name || ( isNameValid && isNameValid!=id ) ) {
      res.send("Name invalid !");
    } else {
      const deleted = await tagsRepo.deleteComment(id);
      if (deleted) {
        res.send("Tag deleted !");
      }
      else {
        res.send('Tag not found !');
      }
    }
  } catch (err) { console.log(err.message) };
});

module.exports = router;