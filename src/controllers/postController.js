const postService = require('../services/postService');
const AlreadyExistsException = require('../exceptions/AlreadyExistsException');
const NotFoundException = require('../exceptions/NotFoundException');

const handleErrors = (res, error) => {
  if (error instanceof AlreadyExistsException || error instanceof NotFoundException) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error, Please reach out to support team' });
  }
};

const executeServiceMethod = async (res, serviceMethod, successStatus = 200) => {
  try {
    const result = await serviceMethod();
    res.status(successStatus).json(result);
  } catch (error) {
    handleErrors(res, error);
  }
};

exports.createPost = (req, res) => {
  const { id, title, content } = req.body;
  executeServiceMethod(res, () => postService.createPost(id, title, content), 201);
};

exports.getPost = (req, res) => {
  const { id } = req.params;
  executeServiceMethod(res, () => postService.getPost(id));
};

exports.getAllPosts = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  executeServiceMethod(res, () => postService.getAllPosts(parseInt(page), parseInt(limit)));
};

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  executeServiceMethod(res, () => postService.updatePost(id, title, content));
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  executeServiceMethod(res, async () => {
    await postService.deletePost(id);
    return { message: `Post deleted of ID: ${id}` };
  });
};