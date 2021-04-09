import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const SinglePost = (props) => {
  console.log(props);

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts/" + props.id)
      .then((res) => {
        console.log("SinglePost:", res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.id]);

  function handleDelete() {
    axios
      .delete("http://localhost:8000/api/posts/" + post._id)
      .then((res) => {
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLike() {
    const updatedPost = { likeCount: post.likeCount + 1 };

    axios
      .put("http://localhost:8000/api/posts/" + post._id, updatedPost)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (post === null) {
    return <p>Loading...</p>;
  }

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
              handleLike();
            }}
          />{" "}
          Title: {post.title}
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
              handleDelete();
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
};

export default SinglePost;
