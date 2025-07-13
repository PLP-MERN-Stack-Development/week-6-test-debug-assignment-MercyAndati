const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.status(200).json(post);
};

exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const post = await Post.create({
    title,
    content,
    category,
    author: req.user.id,
    slug: title.toLowerCase().replace(/ /g, '-')
  });
  res.status(201).json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  await post.save();
  res.status(200).json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

  await Post.findByIdAndDelete(post._id);
  res.status(200).json({ message: 'Post deleted' });
};
