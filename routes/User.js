const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "373151948151-7ucdilvhgce7u17fv2s1vs67bbvjesh3.apps.googleusercontent.com"
);
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "NoobCoder",
      sub: userID,
    },
    "NoobCoder",
    { expiresIn: "1h" }
  );
};




userRouter.post("/register", (req, res) => {
  console.log("req body", req.body.token);
  const { token } = req.body;
  const ticket = async () => {
    const ticket = await client.verifyIdToken({
      idToken: token,
    });
    const user = ticket.getPayload();
    const tokenn = signToken(token);
    res.cookie("access_token", tokenn, { httpOnly: true, sameSite: true });
    if (user.email != "b20165@students.iitmandi.ac.in") {
      const newUser = new User({
        email: user.email,
      });
      User.findOne({ email: user.email }, function (err, user1) {
        if (user1) {
          if (user1.email === user.email) {
            console.log("user already registered");
          } else {
            newUser.save((err) => {
              if (err)
                res.status(500).json({
                  message: { msgBody: "Error has occurred", msgError: true },
                });
              else
              res.status(201).json({
                message: {
                  msgBody: "User details saved",
                  msgError: false,
                },
              });
            });
          }
        }else {
          newUser.save((err) => {
            if (err)
              res.status(500).json({
                message: { msgBody: "Error has occurred", msgError: true },
              });
            else
            res.status(201).json({
              message: {
                msgBody: "User details saved",
                msgError: false,
              },
            });
          });
        }
        if(err){
          console.log("user fetch failed",err)
        }
      });

    }
    res.status(200).json({
      message: { msgBody: "no error" },
      isAuthenticated: true,
      user: user,
      isAdmin: user.email === "b20165@students.iitmandi.ac.in",
    });
  }
  ticket();
});
userRouter.post("/login", (req, res) => {
  console.log(req.body.token);
  const { token } = req.body;
  const ticket = async () => {
    const ticket = await client.verifyIdToken({
      idToken: token,
    });
    const user = ticket.getPayload();
    const tokenn = signToken(token);
    res.cookie("access_token", tokenn, { httpOnly: true, sameSite: true });
    res.status(200).json({
      isAuthenticated: true,
      user: user,
      isAdmin: user.email === "b20165@students.iitmandi.ac.in",
    });
  }
  ticket();
});

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({
      success: true,
    });
  }
);
userRouter.post("/getuserByemail", (req, res) => {
  console.log("Fetching User");
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log(err, "User failed to fetch");
      res.status(500).json({
        message: { msgBody: "User failed to fetch", msgError: true },
      });
    } else {
      console.log("User fetched successfully");
      res.status(200).json({ user: user });
    }
  });
});
userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, email } = req.user;
    console.log("route", req.user);
    res.status(200).json({
      isAuthenticated: true,
      user: { name, email },
    });
  }
);



module.exports = userRouter;
