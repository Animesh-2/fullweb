const express = require("express");
const cors = require("cors");
const userController = require("./routes/userRoutes");
const connection = require("./config/db");
const notesController = require("./routes/notesRoutes");
const authentication = require("./middlewares/authentication");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/user", userController);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Change * to your domain in production for security
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(authentication);
app.use("/notes", notesController);

const PORT = 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log("Error connecting to db");
    console.log(error);
  }
  console.log(`listening on port ${PORT}`);
});
