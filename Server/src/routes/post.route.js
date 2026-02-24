const express = require('express');
const { verifyToken } = require('../Middleware/verifyUser');
const { createPost, getposts, deletePost, updatePost } = require('../controller/post.controller');

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken,  deletePost);
router.put('/updatepost/:postId/:userId', verifyToken,  updatePost);




module.exports = router;