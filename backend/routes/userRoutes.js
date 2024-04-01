const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userModel = require("../model/userModel");

const userController = Router();

userController.post("/signup", async (req, res) => {
  const { email, password, age } = req.body;

  try {
    await bcrypt.hash(password, 3, async function (err, hash) {
      if (err) {
        res.send("something went wrong");
      }
      const user = await userModel.create({
        email,
        password: hash,
        age,
      });
      res.send("Signup Succesfull");
    });
  } catch (error) {
    console.log(error);
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  const hash = user.password;
  await bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send("something went wrong please try again later");
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.send({ message: "Login Successfull", token: token });
    } else {
      res.send("Invalid credentials, Plz Signup first if not Registered");
    }
  });
});

module.exports = userController;
