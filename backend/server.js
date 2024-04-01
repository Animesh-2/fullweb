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
