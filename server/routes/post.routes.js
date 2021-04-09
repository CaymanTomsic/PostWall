const postController = require("../controllers/post.controller");

// LEADING SLASHES IN URLS REQUIRED

// export a function to be called and passed the app
module.exports = (app) => {
  // in DJango: path("api/posts", views.allposts)
  app.get("/api/posts", postController.getAll);
  // :id is a url paramter that will be added to req.params.id
  app.get("/api/posts/:id", postController.getOne);
  app.post("/api/posts", postController.create);
  app.delete("/api/posts/:id", postController.delete);
  app.put("/api/posts/:id", postController.update);
};
