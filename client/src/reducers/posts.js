const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case 'UPDATE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        //duyet qua tung phan tu mang posts, neu co post nao co _id = voi id bam sua thi cap nhat lai post do, ko thi giu ng
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }
}

export default postsReducer;

