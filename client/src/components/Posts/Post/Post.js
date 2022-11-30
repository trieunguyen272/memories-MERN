import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <div>
          <ThumbUpAltIcon fontSize="small" padding="3px" />
          &nbsp;
          {post.likes.length > 2
            ? `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`
            : `You and ${post.likes.length - 1} others`}
        </div>
      ) : (
        <div>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </div>
      );
    }

    return (
      <div>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </div>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile}></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>

      <CardContent className={classes.cardContent}>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <div>
          <div>
            <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
              <Likes />
            </Button>
          </div>

          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div>
              <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize="small" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default Post;
