require('dotenv').config();

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.header('x-access-key');
  const validApiKey = process.env.API_KEY;

  if (apiKey && apiKey === validApiKey) {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
};

module.exports = apiKeyAuth;