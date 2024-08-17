# Blog API Project Setup

This project is a simple Blog API built using Node.js and Express.js. It supports creating, updating, retrieving, and deleting blog posts. Each post can include associated media items such as images, videos, or audio files.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Design Decisions](#design-decisions)
- [Assumptions](#assumptions)
- [Further Improvements](#further-improvements)

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Abhi2955/blog-api.git
   cd blog-api
   ```
2. **Install Dependency and Run Application:**
  ```bash
  npm install
  npm start
  ```
**Run Load testing**
```bash
cd loadtesting
npm loadTesting
```

## Design Decisions
1. **MVC Architecture:**
    The application follows the MVC (Model-View-Controller) pattern to separate concerns. This makes the code more modular and easier to maintain.
2. **Custom Exception Handling**
   Custom exceptions, such as PostAlreadyExistsException and NotFoundException, are implemented to provide meaningful error messages and proper HTTP status codes (e.g., 404 for not found, 409 for conflict).
3. **Interceptors For Authentication**
   introduce interceptors for authentication so unauthorized requests can be validated before hand.

## Assumptions
1. **API Key Authentication:**
   A simple API key-based authentication is assumed to be sufficient for securing the API. More advanced authentication (e.g., OAuth) could be implemented if needed.
2. **Error Handling:**
   The current error handling covers typical use cases. Edge cases and more detailed logging may be added for a production environment.
3. **Post Contains Text Only**
   assuming that post contains text only, i added extended capability of adding media in future but in current implementation there is no scope for the same.

## Future Scope 
1. **Database Integration:**
   Database Integration is one of the future scope items, it allows to data loss and implement real world application.

3. **Adding Cache at Interceptor level**:
  Cache can be introduce at interceptor level to avoid latency into overall system.

2. **Advanced Authentication:**
  Implement OAuth or JWT-based authentication for more robust security, especially if the API is intended to be publicly accessible.

3. **Rate Limiting:**
  introducing rate limiting to prevent abuse of the API, particularly for public-facing endpoints.

4. **Pagination and Filtering Enhancements:**
  on GET /posts endpoint by adding more advanced pagination, filtering, and sorting capabilities, a generic filter probably.

5. **Unit and Integration Testing:**
  Add comprehensive unit and integration tests to ensure the API's reliability and correctness.

6. **Swagger Documentation:**
  Integrate Swagger to make it easier for developers to understand and use the API.

7. **File Uploads for Media:**
  Extend the API to support file uploads for media. This could be integrated with cloud storage solutions like AWS S3.
