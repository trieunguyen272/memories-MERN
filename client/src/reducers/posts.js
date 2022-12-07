import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_COUNT,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes';

const postsReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING: {
      return { ...state, isLoading: true };
    }
    case END_LOADING: {
      return { ...state, isLoading: false };
    }

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };

    case LIKE_COUNT:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    //duyet qua tung phan tu mang posts, neu co post nao co _id = voi id bam sua thi cap nhat lai post do, ko thi giu ng

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    //duyet qua tung phan tu mang posts, neu co post nao co _id = voi id bam sua thi cap nhat lai post do, ko thi giu ng

    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }; //vi payload tra ve id

    default:
      return state;
  }
};

export default postsReducer;
