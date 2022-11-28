import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_COUNT,
} from '../constants/actionTypes';

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case LIKE_COUNT:
      return posts.map((post) =>
        post._id === action.payload._id
          ? action.payload
          : post
      );
    //duyet qua tung phan tu mang posts, neu co post nao co _id = voi id bam sua thi cap nhat lai post do, ko thi giu ng

    case CREATE:
      return [...posts, action.payload];

    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id
          ? action.payload
          : post
      );
    //duyet qua tung phan tu mang posts, neu co post nao co _id = voi id bam sua thi cap nhat lai post do, ko thi giu ng

    case DELETE:
      return posts.filter(
        (post) => post._id !== action.payload
      ); //vi payload tra ve id

    default:
      return posts;
  }
};

export default postsReducer;
