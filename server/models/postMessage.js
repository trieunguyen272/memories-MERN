import mongoose from 'mongoose';

// const Schema = mongoose.Schema;
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String, //name la name sign in
  creator: String, // creator la ng tao post
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
