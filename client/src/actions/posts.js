import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_COUNT } from '../constants/actionTypes';
import * as api from '../api';

//Action Creator
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE_COUNT, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}