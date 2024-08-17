const autocannon = require('autocannon');
const axios = require('axios');

const API_KEY = 'testing';
const BASE_URL = 'http://localhost:3000/api';
const INITIAL_POSTS_COUNT = 50;
const TEST_ITERATIONS = 2;

async function createPost(id, title, content) {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, { id, title, content }, {
      headers: { 'Content-Type': 'application/json', 'x-access-key': API_KEY },
    });
    return response.data.id;
  } catch (error) {
    console.error(`Failed to create post with ID ${id}:`, error.message);
  }
}

function runLoadTest(endpoint, method = 'GET', body = null) {
  const options = {
    url: `${BASE_URL}${endpoint}`,
    connections: 100,
    pipelining: 10,
    duration: 10,
    method,
    headers: { 'x-access-key': API_KEY },
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }

  return new Promise((resolve) => {
    autocannon(options, (err, results) => {
      if (err) {
        console.error(`Error during load testing for ${endpoint}:`, err);
        resolve(null);
      } else {
        console.log(`Load test results for ${method} ${endpoint}:`);
        console.log(`Requests/sec: ${results.requests.average}`);
        console.log(`Latency (ms): ${results.latency.average}`);
        console.log('-----------------------------');
        resolve(results);
      }
    });
  });
}

async function createInitialPosts() {
  console.log("Initializing posts for load testing");
  const postIds = [];

  for (let i = 1; i <= INITIAL_POSTS_COUNT; i++) {
    const id = `id-${i}`;
    await createPost(id, `Title ${i}`, `Content for post ${i}`);
    postIds.push(id);
  }

  return postIds;
}

async function runPostTests(postIds) {
  for (let i = 0; i < TEST_ITERATIONS; i++) {
    await runLoadTest('/posts', 'POST', {
      title: `Title post loadtesting- ${i}`,
      content: `Content for loadtesting ${i}`,
    });
  }
}

async function runGetTests(postIds) {
  for (let i = 0; i < TEST_ITERATIONS; i++) {
    const id = postIds[Math.floor(Math.random() * postIds.length)];
    await runLoadTest(`/posts/${id}`);
  }
}

async function runUpdateTests(postIds) {
  for (let i = 0; i < TEST_ITERATIONS; i++) {
    const id = postIds[Math.floor(Math.random() * postIds.length)];
    await runLoadTest(`/posts/${id}`, 'PUT', {
      title: `Updated Title for ${id}`,
      content: `Updated content for ${id}`,
    });
  }
}

async function runPaginationTests() {
  await runLoadTest('/posts?page=1&limit=10');
  await runLoadTest('/posts?page=2&limit=10');
}

async function runAllTests() {
  const postIds = await createInitialPosts();
  await runPostTests(postIds);
  await runGetTests(postIds);
  await runUpdateTests(postIds);
  await runPaginationTests();
}

runAllTests();