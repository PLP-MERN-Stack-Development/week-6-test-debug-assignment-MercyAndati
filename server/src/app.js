const express = require('express');
const postsRoutes = require('./routes/posts');
const app = express();

app.use(express.json());
app.use('/api/posts', postsRoutes);

// Error handler for debugging
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
