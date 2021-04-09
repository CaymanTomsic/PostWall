import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const Posts = (props) => {
  const [posts, setPosts] = useState(null);

  // arg2 passed into useEffect is the empty array which means useEffect
  // should only be executed once when the component is loaded for the first time
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then((res) => {
        console.log("get all posts", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDelete(delId) {
    axios
      .delete("http://localhost:8000/api/posts/" + delId)
      .then((res) => {
        // since we delete on the same page as we display, we need to tell react
        // to update the state that is displayed when our db responds.
        const filteredPosts = posts.filter((post) => {
          return delId !== post._id;
        });

        setPosts(filteredPosts);
      })
      .catch((err) => {
        console.log(err);
      });

    // const filteredArr = [];

    // for (let i = 0; i < posts.length; i++) {
    //   if (posts[i]._id !== delId) {
    //     filteredArr.push(posts[i]);
    //   }
    // }

    // setPosts(filteredArr);
  }

  function handleLike(post) {
    const updatedPost = { likeCount: post.likeCount + 1 };

    axios
      .put("http://localhost:8000/api/posts/" + post._id, updatedPost)
      .then((res) => {
        // create a new array containing all the same posts except with the one post
        // replaced with the updated post from the DB response so that we can update state
        const updatedPosts = posts.map((currPost) => {
          if (currPost._id === post._id) {
            return res.data;
          } else {
            return currPost;
          }
        });

        setPosts(updatedPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // easier way to do it, but this mutates state directly so is not preferred
  // function handleLike(post) {
  //   post.likeCount++;

  //   axios
  //     .put("http://localhost:8000/api/posts/" + post._id, post)
  //     .then((res) => {
  //       setPosts([...posts]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // database has not responded to our request for data yet..
  if (posts === null) {
    return "Loading...";
  }

  return (
    <div style={{ textAlign: "center" }}>
      {posts.map((post, i) => {
        return (
          <div key={post._id}>
            <div style={{ display: "inline-block", padding: 20 }}>
              <h2>
                <span>{post.likeCount}</span>
                <img
                  src="https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png"
                  alt="Likes"
                  width="30px"
                  style={{ cursor: "pointer" }}
                  onClick={(event) => {
                    handleLike(post);
                  }}
                />{" "}
                <Link to={`/posts/${post._id}`}>Title: {post.title}</Link>
              </h2>
              <ul style={{ textAlign: "left" }}>
                <li>Primary Category: {post.primaryCategory}</li>
                <li>Secondary Category: {post.secondaryCategory}</li>
              </ul>
              <p>{post.description}</p>
              <img width="80%" src={post.imgUrl} alt={post.title} />
              <div>
                <button
                  onClick={(event) => {
                    handleDelete(post._id);
                  }}
                >
                  Delete
                </button>{" "}
                | <Link to={`/posts/${post._id}/edit`}>Edit</Link>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
