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
  const { id } = req.params;
  try {
    const postComment = await Posts.findCommentById(id);
    if (!postComment) {
      res.status(404).json({ message: 'The post with the specified ID does not exists' })
    } else {
      res.status(200).json(postComment)
    }
  }
  catch {
    res.status(500).json({ message: 'The comments information could not be retrieved' })
  }
})

router.post(`/`, async (req, res) => {
  const post = req.body;
  try {
    await Posts.insert(post)
    if (!post.title || !post.contents) {
      res.status(400).json({ message: 'Please provide title and contents for the post' })
    } else {
      res.status(201).json(post);
    }
  }
  catch {
    res.status(500).json({ message: 'There was an error while saving the post to the database' })
  }
})

router.post(`/:id/comments`, async (req, res) => {
  const { id } = req.params;
  const specPost = req.body;
  try {
    const post = Posts.findCommentById(id);
    if (!post) {
      res.status(404).json({ message: 'The post with the specified ID does not exists' })
    } else if (!specPost.text) {
      res.status(400).json({ message: 'Please provide text for the comment' })
    } else {
      res.status(201).json(specPost)
    }
  }
  catch {
    res.status(500).json({ message: 'There was an error while saving the comment to the database' })
  }
})

module.exports = router;
