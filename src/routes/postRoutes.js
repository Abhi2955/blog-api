const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const apiKeyAuth = require('../middlewares/authMiddleware');

router.use(apiKeyAuth);


router.post('/posts', postController.createPost);

router.get('/posts/:id', postController.getPost);

router.get('/posts', postController.getAllPosts);

router.put('/posts/:id', postController.updatePost);

router.delete('/posts/:id', postController.deletePost);

module.exports = router;
