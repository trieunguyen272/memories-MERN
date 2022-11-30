import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

//GET THE CURRENT ID
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });

  const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
  // console.log('post theo id', post);
  //lay duoc post
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
    //do data tu post qua form la post lay dc theo id o tren
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name })); // tham so va Object
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name })); //Object
    }
    clear();
  };

  console.log('user', user);
  if (localStorage.getItem('profile') === null) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          size="small"
          required
          value={postData.title}
          onChange={(e) =>
            setPostData({
              ...postData,
              title: e.target.value,
            })
          }
        />

        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          size="small"
          required
          value={postData.message}
          onChange={(e) =>
            setPostData({
              ...postData,
              message: e.target.value,
            })
          }
        />

        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          size="small"
          required
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(','),
            })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            required
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({
                ...postData,
                selectedFile: base64,
              })
            }
          />
        </div>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear}>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
