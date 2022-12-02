const asynHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = asynHandler(async (req, res, next) => {
 const { authorization } = req.headers;

 if (!authorization) {
   return res.status(401).json({ error: "you must be logged in" });
 }
 const token = authorization.replace("Bearer ", "");
 jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
   if (err) {
     return res.status(401).json({ error: "you must be logged in" });
   }
   const { _id } = payload;
   User.findById(_id).then((userdata) => {
     req.user = userdata;
     // console.log(userdata)
     next();
   });
 });
});

module.exports = authMiddleware;
