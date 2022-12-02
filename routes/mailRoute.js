const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Email = require("../models/emailModel");
const nodemailer = require("nodemailer");
const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");

const scheduler = new ToadScheduler();

const authMiddleware = require("../middlewares/authMiddleware");
// const schedule= require('node-schedule')
const cron = require("node-cron");
const mailRoute = express.Router();

const Cronie = require("../models/cronModel");

// const Cronie = require("../models/cronModel");

mailRoute.get(
  "/getmail",
  expressAsyncHandler(async (req, res) => {
    try {
      const getMails = await Email.find({});

      res.status(200).send(getMails);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);
mailRoute.get(
  "/getmail/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const getMails = await Email.findById(req.params.id);

      res.status(200).send(getMails);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  })
);
mailRoute.post(
  "/postmail",
  expressAsyncHandler(async (req, res) => {
    const email = new Email({
      sender: req.body.sender,
      to: req.body.to,
      cc: req.body.cc,
      subject: req.body.subject,
      mailBody: req.body.mailBody,
      minutes: req.body.minutes,
      hours: req.body.hours,
      date: req.body.date,
      month: req.body.month,
      scheduled: req.body.scheduled,

      // selectedFile: req.body.selectedFile,
      // second: req.body.second,
      // week: req.body.week,
      // month: req.body.month,
      // year: req.body.year,

      // month: req.body.month,
    });

    if (req.body.to && req.body.subject) {
      var transporter = nodemailer.createTransport({
        secure: true,
        service: "gmail",
        auth: {
          user: "xanxit.shadow@gmail.com", //email ID
          pass: "blgpwjqeislqtzvv", //Password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      let sender = `${req.body.sender} <*********@*****.****>`;
      function sendMail() {
        var details = {
          from: sender, // sender address same as above
          to: req.body.to, // Receiver's email id
          cc: req.body.cc,
          subject: req.body.subject,
          html: req.body.mailBody,
        };

        const task = new Task("sending-email", () => {
          transporter.sendMail(details, function (error, data) {
            if (error) console.log(error);
            else console.log(data);
          });
        });

        const schedule = require("node-schedule");
        // var currentTime = new Date();
        // var currentOffset = currentTime.getTimezoneOffset();
        // var ISTOffset = 330; // IST offset UTC +5:30
        // const date = new Date(
        //   currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
        //   var hoursIST = date.getHours();
        //   var minutesIST = date.getMinutes();
        //   var secondsIST = date.getSeconds();
        //   console.log(hoursIST);
        //   console.log(minutesIST);
        const minutesIST = req.body.minutes;
        const hoursIST = req.body.hours;
        const date = req.body.date;
        const month = req.body.month;
        const scheduled = req.body.scheduled;
        const job = schedule.scheduleJob(
          `${minutesIST} ${hoursIST} ${date} ${month} *`,
          function () {
            if (scheduled === 1) {
              //in few seconds
              const job = new SimpleIntervalJob({ seconds: 30 }, task);

              scheduler.addSimpleIntervalJob(job);
            } else if (scheduled === 2) {
              //weekly
              const job = new SimpleIntervalJob({ days: 7 }, task);

              scheduler.addSimpleIntervalJob(job);
            } else if (scheduled === 3) {
              //monthly
              const job = new SimpleIntervalJob({ days: 30 }, task);

              scheduler.addSimpleIntervalJob(job);
            } else if (scheduled === 4) {
              //yearly
              const job = new SimpleIntervalJob({ days: 30 * 12 }, task);

              scheduler.addSimpleIntervalJob(job);
            }
          }
        );
      }
      sendMail(email, req.body.mailBody);
    }

    try {
      email.save();
    } catch (error) {
      res.send(error.message);
    }
    res.status(201).send({
      _id: email._id,
      to: email.to,
      cc: email.cc,
      subject: email.subject,
      mailBody: email.mailBody,
      // selectedFile: email.selectedFile,

      second: email.second,
      week: email.week,
      month: email.month,
      year: email.year,
      // month: email.month,
    });
  })
);

// mailRoute.post(
//   "/gettime",
//   expressAsyncHandler(async (req, res) => {
//     const cronie = new Cronie({
//       second: req.body.second,
//       week: req.body.week,
//       month: req.body.month,
//       year: req.body.year,
//       month: req.body.month,
//     });
//     try {
//       cronie.save();
//     } catch (error) {
//       res.send(error.message);
//     }
//     res.status(201).send({
//       _id: cronie._id,
//       second: cronie.second,
//       week: cronie.week,
//       month: cronie.month,
//       year: cronie.year,
//       month: cronie.month,
//     });
//   })
// );

mailRoute.put(
  "/mail/:id",
  expressAsyncHandler(async (req, res) => {
    const mail = await Email.findById(req.params.id);
    if (mail) {
      const updatedBook = await Email.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200);
      res.json(updatedBook);
    } else {
      res.status(500);
      throw new Error("Update failed");
    }
  })
);

mailRoute.delete(
  "/mail/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      scheduler.stop();
      const deletedmail = await Email.findById(req.params.id);
      res.status(200).json(deletedmail);
    } catch (error) {
      res.json(error);
    }
  })
);

module.exports = mailRoute;
