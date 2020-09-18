import axios from "axios";
import { setCurrentUser } from "./action";

export const setPosts = (text) => async (dispatch) => {
  const head = {
    headers: { "Content-Type": "application/json" },
  };

  console.log("posts", text);
  try {
    const res = await axios.post("api/posts", text, head);
    console.log("posts", res.data);
    dispatch({
      type: "CREAT_POSTS_SUCCES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CREAT_POSTS_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const GetPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("api/posts");
    console.log("get posts", res.data);
    dispatch({
      type: "GET_POSTS_SUCCES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_POSTS_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const DeletPost = (id) => async (dispatch) => {
  if (window.confirm("are you sure to dlelete your profile?")) {
    try {
      const res = await axios.delete(`api/posts/${id}`);
      console.log("delet post", res.data);
      dispatch({ type: "DELETE_POST_SUCCES", payload: id });
      dispatch(setCurrentUser(res.data.msg, "danger"));
    } catch (err) {
      dispatch({
        type: "DELETE_POSTS_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
export const putLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/like/${id}`);
    console.log("like response", res.data);
    dispatch({
      type: "PUT_LIKES_SUCCES",
      payload: { id, resp: res.data },
    });
  } catch (err) {
    console.log("lerrrrror posterr", err.response);
    dispatch(setCurrentUser(err.response.data.msg, "danger"));
    dispatch({
      type: "PUT_LIKE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const putUnlike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/posts/unlike/${id}`);
    console.log("unlike put", res.data);
    dispatch({
      type: "PUT_LIKES_SUCCES",
      payload: { id, resp: res.data },
    });
  } catch (err) {
    dispatch(setCurrentUser(err.response.data.msg, "danger"));
    dispatch({
      type: "PUT_LIKE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const GetPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    console.log("get post", res.data);
    dispatch({
      type: "GET_POST_SUCCES",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "GET_POST_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const PutComment = (formData, id) => async (dispatch) => {
  const head = {
    headers: { "Content-Type": "application/json" },
  };

  const text = JSON.stringify(formData);
  console.log(text);
  try {
    const res = await axios.post(`/api/posts/comment/${id}`, text, head);
    console.log(11111111111111, res.data);
    dispatch({
      type: "PUT_COMMENT_SUCCES",
      payload: res.data,
    });
  } catch (err) {
    console.log(2323232, err);
    dispatch({
      type: "PUT_COMMENT_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const DeletComent=(id,comment_id)=>async dispatch=>{

  try {
    await axios.delete(`/api/posts/comment/${id}/${comment_id}`);
    dispatch({
      type:'DELETE_COMMENT_SUCCES',
      payload:comment_id
    })
    
  } catch (err) {
    dispatch({
      type: "DELETE_COMMENT_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }

}