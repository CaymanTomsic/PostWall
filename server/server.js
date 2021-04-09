const port = 8000;
const dbName = "belt-prep";
const cors = require("cors");
const express = require("express");

// requiring a file will execute the code in that file, and if the file
// the function is imported and then immediately executed

require("./config/mongoose.config")(dbName);

const app = express();

// WITHOUT THIS req.body will be undefined (the body / data of a form submission)
app.use(express.json());
app.use(cors());

require("./routes/post.routes")(app);

app.listen(port, () =>
  console.log(`Listening on port ${port} for REQuests to RESpond to.`)
);
