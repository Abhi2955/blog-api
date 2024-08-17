const postRepository = require('../repositories/postRepository');
const NodeCache = require('node-cache');

class PostService {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
  }

  createPost(id, title, content) {
    const post = postRepository.createPost(id, title, content);
    this.invalidateListCache();
    return post;
  }

  getPost(id) {
    return this.getCachedOrFetch(id, () => postRepository.getPost(id));
  }

  getAllPosts(page = 1, limit = 10) {
    const cacheKey = this.getListCacheKey(page, limit);
    return this.getCachedOrFetch(cacheKey, () => postRepository.getAllPosts(page, limit));
  }

  updatePost(id, title, content) {
    const post = postRepository.updatePost(id, title, content);
    if (post) {
      this.cache.set(id, post);
      this.invalidateListCache();
    }
    return post;
  }

  deletePost(id) {
    const success = postRepository.deletePost(id);
    if (success) {
      this.cache.del(id);
      this.invalidateListCache();
    }
    return success;
  }

  getCachedOrFetch(key, fetchFunction) {
    let data = this.cache.get(key);
    if (!data) {
      data = fetchFunction();
      if (data) {
        this.cache.set(key, data);
      }
    }
    return data;
  }

  getListCacheKey(page, limit) {
    return `posts_page_${page}_limit_${limit}`;
  }

  invalidateListCache() {
    this.cache.keys().forEach(key => {
      if (key.startsWith('posts_page_')) {
        this.cache.del(key);
      }
    });
  }
}

module.exports = new PostService();