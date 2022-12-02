const express = require("express");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils");
const authMiddleware = require("../middlewares/authMiddleware");
const { OAuth2Client } = require("google-auth-library");
const userRouter = express.Router();

const client = new OAuth2Client(
  "666935365140-nki4tvcnjkdq1923kknk2b6jh4kicdbb.apps.googleusercontent.com"
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const Username = await User.findOne({ email: req.body.email });
    if(Username){
      res.send("User already exist!")
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      confirmpassword: bcrypt.hashSync(req.body.confirmpassword, 8),
    });

    try {
      if (req.body.password === req.body.confirmpassword) {
        user.save();
      }
    } catch (error) {
      res.send("Password does not match with confirm Password");
    }
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user), 
      
    });
  })
);

userRouter.post(
  "/google-login",
  expressAsyncHandler(async (req, res) => {
    const { tokenId } = req.body;
    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          "666935365140-nki4tvcnjkdq1923kknk2b6jh4kicdbb.apps.googleusercontent.com",
      })
      .then((response) => {
        const { email_verified, name, email } = response.payload;
        if (email_verified) {
          User.findOne({ email }).exec((err, user) => {
            if (err) {
              return res.status(400).json({
                error: "User does not exist",
              });
            } else {
              if (user) {
                const token = generateToken(user);
                const { _id, name, email } = user;
                res.json({ token, user: { _id, name, email } });
              } else {
                let password = email + process.env.JWT_SECRET;
                let newUser = new User({ name, email, password });
                newUser.save((err, data) => {
                  if (err) {
                    return res.status(400).json({
                      error: "Something went wrong!!!",
                    });
                  }
                  const token = generateToken(data);
                  const { _id, name, email } = newUser;
                  res.json({ token, user: { _id, name, email } });
                });
              }
            }
          });
        }
      });
  })
);
module.exports = userRouter;


