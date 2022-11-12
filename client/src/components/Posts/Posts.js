import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';
const Posts = () => {
    const posts = useSelector((state) => state.posts) //posts chinh la key trong combineReducer
    const classes = useStyles();

    console.log("posts", posts);

    return (
        <>
            <h1>POSTS</h1>
            <Post />
            <Post />
            <Post />
        </>
    );
}

export default Posts;