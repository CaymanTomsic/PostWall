// Trigger the code in post.model to be executed and export the model
const Post = require("../models/post.model");

// export an object with a bunch of methods in it
module.exports = {
  // key: value pair pattern, long-form for methods
  create: function (req, res) {
    console.log("create method executed");

    Post.create(req.body)
      .then((post) => {
        // post is the post from the DB now, which has a DB _id, createdAt, etc.
        // send it back in the response to the client
        res.json(post);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // shorthand method key value pair
  getAll(req, res) {
    console.log("getAll method executed");

    // .find always returns an array
    Post.find()
      .then((cities) => {
        res.json(cities);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  getOne(req, res) {
    console.log("getOne method executed", "url params:", req.params);

    Post.findById(req.params.id)
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  delete(req, res) {
    console.log("delete method executed", "url params:", req.params);

    Post.findByIdAndDelete(req.params.id)
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  update(req, res) {
    console.log("update method executed", "url params:", req.params);

    // req.body is the new updated info from the submitted form
    Post.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      // return the updated object rather than the old info
      new: true,
    })
      .then((post) => {
        res.json(post);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};
