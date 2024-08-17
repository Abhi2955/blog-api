const Media = require('./Media');
class Post {
    constructor(id, title, content) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.media = [];
      this.createdAt = new Date();
      this.updatedAt = new Date();;
    }

    addMedia(type, url, metadata = {}) {
        const media = new Media(type, url, metadata);
        this.media.push(media);
        this.updatedAt = new Date();
    }
  }
  
  module.exports = Post;