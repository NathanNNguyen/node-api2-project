const express = require('express');

const Posts = require('./db.js');

const router = express();

router.get(`/`, async (req, res) => {
  const posts = await Posts.find();
  try {
    res.status(200).json(posts);
  }
  catch {
    res.status(500).json({ message: 'The posts information could not be retrieved' })
  }
})

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id);
    if (!post) {
      res.status(404).json({ message: 'The post with the specified ID does not exist' })
    } else {
      res.status(200).json(post)
    }
  }
  catch {
    res.status(500).json({ message: 'The post information could not be retrieved' })
  }
})

router.get(`/:id/comments`, async (req, res) => {
  const {id} = req.params;
  try{
    const postComment = await Posts.findPostComments(id);
    if(!postComment) {
      res.status(404).json({message: 'The post with the specified ID does not exists'})
    } else {
      res.status(200).json(postComment)
    }
  }
  catch {
    res.status(500).json({message: 'The comments information could not be retrieved'})
  }
})

module.exports = router;
