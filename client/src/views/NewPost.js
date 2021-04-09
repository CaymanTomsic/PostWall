import React, { useEffect, useState } from "react";

import axios from "axios";
import { navigate } from "@reach/router";

const NewPost = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [secondaryCategory, setSecondaryCategory] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [errors, setErrors] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const newPost = {
      // long-form key: value pair
      title: title,

      // shorthand when key name matches value variable name
      description,
      primaryCategory,
      secondaryCategory,
      imgUrl,
    };

    axios
      .post("http://localhost:8000/api/posts", newPost)
      .then((res) => {
        navigate("/posts");
      })
      .catch((err) => {
        console.log(err.response);
        setErrors(err.response.data?.errors);
      });
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label>Title: </label>
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            type="text"
          />
          {errors?.title && (
            <span style={{ color: "red" }}>{errors.title?.message}</span>
          )}
        </div>

        <div>
          <label>Description: </label>
          <input
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            type="text"
          />
          {errors?.description && (
            <span style={{ color: "red" }}>{errors.description?.message}</span>
          )}
        </div>

        <div>
          <label>Primary Category: </label>
          <input
            onChange={(event) => {
              setPrimaryCategory(event.target.value);
            }}
            type="text"
          />
          {errors?.primaryCategory && (
            <span style={{ color: "red" }}>
              {errors.primaryCategory?.message}
            </span>
          )}
        </div>

        <div>
          <label>Secondary Category: </label>
          <input
            onChange={(event) => {
              setSecondaryCategory(event.target.value);
            }}
            type="text"
          />
          {errors?.secondaryCategory && (
            <span style={{ color: "red" }}>
              {errors.secondaryCategory?.message}
            </span>
          )}
        </div>

        <div>
          <label>Image Url: </label>
          <input
            onChange={(event) => {
              setImgUrl(event.target.value);
            }}
            type="text"
          />
          {errors?.imgUrl && (
            <span style={{ color: "red" }}> {errors.imgUrl?.message}</span>
          )}
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
