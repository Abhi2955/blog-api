class Media {
    constructor(type, url, metadata = {}) {
      this.type = type; // VIDEO, AUDIO, IMAGE
      this.url = url;
      this.metadata = metadata; // Optional metadata object
    }
  }
  
module.exports = Media;
  