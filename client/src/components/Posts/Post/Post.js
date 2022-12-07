import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate = useNavigate();

  const Likes = () => {
    if (post.likes.length > 0) {
      //neu da co acc like
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        //acc log in like
        <div>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 1 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like`}
        </div>
      ) : (
        //acc log in ko like
        <div>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? ' Like' : ' Likes'}
        </div>
      );
    }
    //chua co acc like
    return (
      <div>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </div>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  //ThumbUpAltOutlined: ko mau
  //ThumbUpAltIcon: mau xanh
  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} component="div" image={post.selectedFile}></CardMedia>
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
      <>
        <ButtonBase className={classes.cardActions} onClick={openPost}>
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
        </ButtonBase>
      </>
      <CardActions className={classes.cardActions}>
        <div className={classes.overlay3}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </Button>
        </div>

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay4}>
            <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          </div>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
