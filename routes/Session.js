const express = require("express");
const sessionRouter = express.Router();

const Session = require("../models/Session");

sessionRouter.post("/addsession", (req, res) => {
  const { title, img, startDate, startTime, endDate, endTime, maxStudents, subject, currStudents, status } = req.body;
  const newSession = new Session({
    title,
    img,
    startDate,
    startTime,
    endDate,
    endTime,
    maxStudents,
    subject,
    currStudents,
    status,
  });
  console.log("session")
  console.log(newSession);
  newSession.save((err) => {
    console.log("debug")
    console.log("error", err)
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "Session successfully added",
          msgError: false,
        },
      });
  });
});

sessionRouter.post("/delsession", (req, res) => {
  Session.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("Session failed to delete");
      res.status(500).json({
        message: { msgBody: "Session failed to delete", msgError: true },
      });
    } else {
      console.log("Session deleted successfully");
    }
  });
});
sessionRouter.post("/editsession", (req, res) => {
  console.log(req.body.session)
  Session.findByIdAndUpdate(req.body.SEID, req.body.session, (err) => {
    if (err) {
      console.log("Session failed to update");
      res.status(500).json({
        message: { msgBody: "Session failed to update", msgError: true },
      });
    } else {
      console.log("session updated",req.body.session)
      console.log("Session updated successfully");
    }
  });
});
sessionRouter.get("/sessions", (req, res) => {
  console.log("Fetching Sessions");
  Session.find().exec((err, document) => {
    if (err) {
      console.log("Sessions failed to fetch")
      res.status(500).json({
        message: { msgBody: "Sessions failed to fetch", msgError: true },
      });
    } else {
      console.log("Sessions fetched successfully");
      res.status(200).json({ sessions: document });
    }
  });
});
sessionRouter.post("/getsessionbyid", (req, res) => {
  console.log("Fetching Session");
  Session.findById(req.body._id).exec((err, document) => {
    if (err) {
      console.log("Session failed to fetch");
      res.status(500).json({
        message: { msgBody: "Session failed to fetch", msgError: true },
      });
    } else {
      console.log("Sessions fetched successfully");
      res.status(200).json({ session: document });
    }
  });
});



module.exports = sessionRouter;
