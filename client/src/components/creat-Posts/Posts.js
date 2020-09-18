import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setPosts } from "../../action/posts";
import { setCurrentUser } from "../../action/action";
import { GetPosts } from "../../action/posts";
import {Link} from 'react-router-dom';
import Moment from "react-moment";
import { DeletPost } from "../../action/posts";
import { putLike } from "../../action/posts";
import { putUnlike } from "../../action/posts";
import Spinner from "../router/Spinner";
const Posts = ({
  loading,
  putLike,
  putUnlike,
  setPosts,
  user,
  isAuthenticated,
  setCurrentUser,
  posts,
  GetPosts,
  DeletPost,...otherProps
}) => {
  console.log(otherProps)
  useEffect(() => {
    GetPosts();
  }, [GetPosts]);
  const [text, setText] = useState('');
  const handelChange = (e) => {
    setText(e.target.value );
    console.log("state posts", text);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      setCurrentUser("your post its empty try to say something :)", "danger");
    } else {
      setPosts({text});

      setText('');
    }
  };

  return (
    <section class="container">
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>

      <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form class="form my-1" onSubmit={(e) => handelSubmit(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={(e) => handelChange(e)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      {!posts ? (
        <Spinner />
      ) : (
        <div class="posts">
          {posts.map((post) => (
            <div class="post bg-white p-1 my-1" key={post.id}>
              <div>
                <Link to={`/profile/${post.user}`}>
                  <img class="round-img" src={post.avatar} alt="" />
                  <h4>{post.name}</h4>
                </Link>
              </div>
              <div>
                <p class="my-1">{post.text}</p>
                <p class="post-date">
                  Posted on{"   "}
                  <Moment format="YYYY/MM/DD">{post.date}</Moment>
                </p>
                <button
                  onClick={(e) => putLike(post._id)}
                  type="button"
                  className={ loading ? 
                    (post.likes.filter(like => like.user.toString() === user._id).length > 0
                      ? "btn btn-danger"
                      : "btn btn-light") : "btn btn-light"
                  }
                >
                  <i className="fas fa-thumbs-up"></i>
                  <span>{post.likes.length}</span>
                </button>
                <button
                  onClick={(e) => putUnlike(post._id)}
                  type="button"
                  class="btn btn-light"
                >
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/api/${post._id}`} class="btn btn-primary">
                  Discussion <span class="comment-count">{post.comments.length}</span>
                </Link>

                {isAuthenticated && post.user === user._id ? (
                  <button
                    onClick={(e) => DeletPost(post._id)}
                    type="button"
                    class="btn btn-danger"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const mapToprops = (state) => ({
  loading:state.CurrentPosts.loading,
  posts: state.CurrentPosts.posts,
  isAuthenticated: state.auThentication.isAuthenticated,
  user: state.auThentication.user,
});

export default connect(mapToprops, {
  setPosts,
  putLike,
  putUnlike,
  setCurrentUser,
  GetPosts,
  DeletPost,
})(Posts);
