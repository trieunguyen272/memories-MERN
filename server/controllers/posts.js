import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    error.message;
  }
};

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body; //body luc nay da dc update

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.send('No post with that id');

  const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  //chinh la id ben route
  if (!mongoose.Types.ObjectId.isValid(id)) return res.send('No post with that id');

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  console.log('userId', req.userId);

  if (!req.userId) return res.json({ message: 'Unauthenticated.' });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.send('No post with that id');

  const post = await PostMessage.findById(id);

  //likes la array luu id da like
  const index = post.likes.findIndex((id) => id === String(req.userId));

  console.log('index', index);
  //neu ko tim thay id nao = userId thi them userId vao
  if (index === -1) {
    //like
    post.likes.push(req.userId);
  } else {
    //dislike
    post.likes = post.likes.filter((id) => id !== String(req.userId));
    //neu tim thay id nao = userId thi filter(loc) lay id khac userId
  }
  const updatePost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updatePost);
};
