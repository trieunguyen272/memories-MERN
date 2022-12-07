import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts); //posts chinh la key trong combineReducer

  //posts: {posts: Array(3), currentPage: 1, numberOfPages: 2}
  //{posts}: (3) [{…}, {…}, {…}]
  //[] -> {isLoading, posts: []}
  //huy cau truc {post} de lay dc [] post ben trong object post
  const classes = useStyles();

  if (!posts.length && !isLoading) return 'No post';
  //lay ra tung post trong mang luu trong store posts bang useSelector
  // posts?.length de bo qua loi neu ko co post nao
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
