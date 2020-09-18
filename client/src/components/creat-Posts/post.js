import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { PutComment, GetPost, DeletComent } from "../../action/posts";
import Moment from 'react-moment';
import Spinner from '../router/Spinner';

const CostComment = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props.computedMatch.params._id);
    dispatch(GetPost(props.computedMatch.params._id));
  }, [GetPost]);
  const [text, setText] = useState("");
  const handelChange = (e) => {
    setText(e.target.value);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(PutComment({text}, props.computedMatch.params._id));
    setText("")
  };
  
  const user = useSelector((state) => state.auThentication.user);
  const post = useSelector((state) => state.CurrentPosts.post);
  console.log(55555, post);
  return (
    <section class="container">
      <Link to="/posts" class="btn">
        Back To Posts
      </Link>
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user._id}`}>
            <img class="round-img" src={post.avatar} alt="" />
            <h4>{post.name}</h4>
          </Link>
        </div>

        <p class="my-1">{post.text}</p>
      </div>

      <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave a Comment</h3>
        </div>
        <form class="form my-1" onSubmit={(e) => handelSubmit(e)}>
          <textarea
            onChange={(e) => handelChange(e)}
            value={text}
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

     {!post.comments ? <Spinner/>:
     <>
      {post.comments.map(comment=>
          <div class="comments" key={comment.id}>
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${post.user}`}>
              <img
                class="round-img"
                src={comment.avatar}
                alt=""
              />

              <h4>{comment.name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {comment.text}
            </p>
            <p class="post-date">Posted on<Moment format='DD/MM/YYYY'>{comment.date}</Moment> </p>
          
        

       {(comment.user ==user._id) ? 
        <button onClick={()=>dispatch(DeletComent(post._id,comment._id))} type="button" class="btn btn-danger">
              <i class="fas fa-times"></i>
            </button> : ""}
           
            </div>
          </div>
          </div>)
     }
          </>}
       
    </section>
  );
};
export default withRouter(CostComment);
