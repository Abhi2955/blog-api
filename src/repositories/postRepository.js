const { v4: uuidv4 } = require('uuid');
const Post = require('../models/Post');
const AlreadyExistsException = require('../exceptions/AlreadyExistsException');
const NotFoundException = require('../exceptions/NotFoundException');

class PostRepository {
  constructor() {
    this.posts = new Map();
  }

  createPost(id, title, content) {
    id = this.validateAndGenerateId(id);
    const post = new Post(id, title, content);
    this.posts.set(id, post);
    return post;
  }

  getPost(id) {
    return this.findPostOrThrow(id);
  }

  getAllPosts(page, limit) {
    const allPosts = Array.from(this.posts.values());
    return this.paginatePosts(allPosts, page, limit);
  }

  updatePost(id, title, content) {
    const post = this.findPostOrThrow(id);
    Object.assign(post, { title, content, updatedAt: new Date() });
    return post;
  }

  deletePost(id) {
    this.findPostOrThrow(id);
    return this.posts.delete(id);
  }

  validateAndGenerateId(id) {
    if (!id || id.trim() === '') {
      return uuidv4();
    }
    if (this.posts.has(id)) {
      throw new AlreadyExistsException(`Post with ID: ${id} already exists.`);
    }
    return id;
  }

  findPostOrThrow(id) {
    const post = this.posts.get(id);
    if (!post) {
      throw new NotFoundException(`Post with ID: ${id} not found.`);
    }
    return post;
  }

  paginatePosts(posts, page, limit) {
    const start = (page - 1) * limit;
    const end = page * limit;
    return posts.slice(start, end);
  }
}

module.exports = new PostRepository();