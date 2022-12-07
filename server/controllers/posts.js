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
  const { page } = req.query; //string

  try {
    const LIMIT = 3; //so luong post o moi page
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page

    const total = await PostMessage.countDocuments({}); //dem tong so posts

    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  console.log('search server');
  const { searchQuery, tags } = req.query; //query lay cu the chi co search va tags

  try {
    const title = new RegExp(searchQuery, 'i'); //Test test TEST -> test: chu hoa hay thuong deu ve 1 kieu
    //cac text field label="Search Memories"

    const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
    //tim cac post trung voi title(search) hoac 1 trong cac tag
    console.log('search data', posts);
    res.json({ data: posts });
  } catch (error) {
    console.log('search loi');
    error.message;
  }
};

export const updatePost = async (req, res) => {
  console.log('update server');
  const { id: _id } = req.params; //params lay tat ca id
  const post = req.body; //post luc nay da dc edit tren form

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.send('No post with that id');

  const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  console.log('delete server');
  const { id } = req.params;
  //chinh la id ben route
  if (!mongoose.Types.ObjectId.isValid(id)) return res.send('No post with that id');

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthenticated.' });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.send('No post with that id');

  const post = await PostMessage.findById(id);

  //likes la array luu id da like
  const index = post.likes.findIndex((id) => id === String(req.userId));

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
