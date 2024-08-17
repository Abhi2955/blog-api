class AlreadyExistsException extends Error {
    constructor(message) {
      super(message);
      this.name = 'AlreadyExistsException';
      this.statusCode = 409; 
    }
  }
  
  module.exports = AlreadyExistsException;