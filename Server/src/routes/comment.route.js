const express = require('express');
const { verifyToken } = require('../Middleware/verifyUser');
const { createComment, getComment, likeComment, editComment, deleteComment, getComments } = require('../controller/comment.controller');

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getComment', getComment);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getComments);











module.exports = router;