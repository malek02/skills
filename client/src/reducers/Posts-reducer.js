const INTIAL_STATE = {
  posts: [],
  post: [],
  loading: true,
  error: null,
};

const currentPosts = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "CREAT_POSTS_SUCCES":
      console.log(77777777, [...state.posts, action.payload]);
      return { ...state, posts: [action.payload, ...state.posts] };

    case "CREAT_POSTS_ERROR":
      return { ...state, error: action.payload };
    case "GET_POSTS_SUCCES":
      return { ...state, posts: action.payload };
    case "GET_POSTS_ERROR":
      return { ...state, error: action.payload };
    case "DELETE_POST_SUCCES":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "DELETE_POSTS_ERROR":
      return { ...state, error: action.payload };
    case "PUT_LIKES_SUCCES":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id == action.payload.id
            ? { ...post, likes: action.payload.resp }
            : post
        ),
      };

    case "PUT_LIKES_ERROR":
      return { ...state, error: action.payload };
    case "GET_POST_SUCCES":
      return { ...state, post: action.payload };
    case "GET_POST_ERROR":
      return { ...state, error: action.payload };

    case "PUT_COMMENT_SUCCES":
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
      };

    case "PUT_COMMENT_ERROR":
      return { ...state, error: action.payload };
      case 'DELETE_COMMENT_SUCCES':
        return {
          ...state,
          post: { ...state.post, comments: state.post.comments.filter(comment=> comment._id !== action.payload)}
        };
  
      case "DELETE_COMMENT_ERROR":
        return { ...state, error: action.payload };
        default:
      return state;
  }
};
export default currentPosts;
