const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(`mongodb://localhost/belt-prep`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(`Successfully connected belt-prep`);
    })
    .catch((err) => {
      console.error(err);
    });
};
