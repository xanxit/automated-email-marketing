import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postEmailData, getEmailData } from "../actions/emailActions";
import axios from "axios";

function openList(e) {
  var target = e.target.parentNode.id;
  if (target === "1") {
    var to = document.getElementById("to");
    to.classList.toggle("hidden");
    to.classList.toggle("flex");
  }
  if (target === "2") {
    var cc = document.getElementById("cc");
    cc.classList.toggle("hidden");
    cc.classList.toggle("flex");
  }
  if (target === "3") {
    var sub = document.getElementById("sub");
    sub.classList.toggle("hidden");
    sub.classList.toggle("flex");
  }
  if (target === "4") {
    var body = document.getElementById("body");
    body.classList.toggle("hidden");
    body.classList.toggle("flex");
  }
  if (target === "reccuring") {
    var sec = document.getElementById("sec");
    sec.classList.toggle("hidden");
    sec.classList.toggle("flex");
  }
  if (target === "weekly") {
    var week = document.getElementById("week");
    week.classList.toggle("hidden");
    week.classList.toggle("flex");
  }
  if (target === "monthly") {
    var month = document.getElementById("month");
    month.classList.toggle("hidden");
    month.classList.toggle("flex");
  }
  if (target === "yearly") {
    var year = document.getElementById("year");
    year.classList.toggle("hidden");
    year.classList.toggle("flex");
  }
}

const Box = () => {
  const [to, setTomail] = useState([]);
  const [cc, setCcemail] = useState([]);
  const [subject, setSubject] = useState("");
  const [mailBody, setMailbody] = useState("");
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const [scheduled, setscheduled] = useState(0);
  const [minutes, setMin] = useState(0);
  const [hours, setHour] = useState(0);
  const [date, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [sender, setSender] = useState("");

  const emailDat = useSelector((state) => state.emailDat);
  const { emailData } = emailDat;
  console.log(emailData);
  useEffect(() => {
    dispatch(getEmailData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      postEmailData({
        minutes,
        scheduled,
        hours,
        date,
        month,
        sender,
        to,
        cc,
        subject,
        mailBody,
      })
    );
    // axios.post("/api/postmail", {
    //   sender,
    //   to,
    //   cc,
    //   subject,
    //   mailBody,
    // });
    setSender("");
    setTomail([]);
    setCcemail([]);
    setSubject("");
    setMailbody("");
    setDay(0);
    setMin(0);
    setHour(0);
    setMonth(0);
    setscheduled(0);
  };

  useEffect(() => {
    axios.get("/api/getmail").then((response) => {
      const info = response;
      setData(info);
    });
  }, []);

  return (
    <div className="pt-20 flex flex-col justify-center items-center">
      <div className="border-2 border-gray-400 w-4/5 flex flex-col justify-evenly">
        <form onSubmit={handleSubmit}>
          <div className="flex p-3 h-auto border-b-2 border-gray-400">
            <div className="flex-row justify-between items-center">
              <h2 className="text-navbarbg text-lg md:text-2xl font-semibold pr-8">
                Sender
              </h2>
            </div>
            <input
              type="text"
              name="author"
              placeholder="Enter sender's name"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />
          </div>
          <div className="flex p-3 h-auto border-b-2 border-gray-400 justify-between">
            <div className="flex-row justify-between items-center">
              <h2 className="text-navbarbg text-lg md:text-2xl font-semibold pr-8">
                Time
              </h2>
            </div>
            <input
              type="text"
              name="author"
              placeholder="Enter minute"
              value={minutes}
              className="bg-blue-400 text-white placeholder-white px-4"
              onChange={(e) => setMin(e.target.value)}
            />
            <input
              type="text"
              name="author"
              placeholder="Enter hour"
              value={hours}
              className="bg-blue-400 text-white placeholder-white px-4"
              onChange={(e) => setHour(e.target.value)}
            />
            <input
              type="text"
              name="author"
              placeholder="Enter Month"
              value={month}
              className="bg-blue-400 text-white placeholder-white px-4"
              onChange={(e) => setMonth(e.target.value)}
            />
            <input
              type="text"
              name="author"
              placeholder="Enter Date"
              value={date}
              className="bg-blue-400 text-white placeholder-white px-4"
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
          <div className="flex flex-col p-3 h-auto border-b-2 border-gray-400">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-navbarbg text-lg md:text-2xl font-semibold">
                To
              </h2>
              <div
                id="1"
                className="bg-navbarbg hover:bg-indigo-400 cursor-pointer text-white h-10 w-36 md:w-52 p-4 flex items-center rounded-sm"
                onClick={openList}
              >
                <span className="w-full text-center text-xs md:text-base">
                  Add all emails
                </span>
              </div>
            </div>
            <div id="to" className="hidden p-4">
              <input
                type="text"
                name="email"
                placeholder="Enter email (splitted by ,)"
                value={to}
                onChange={(e) => setTomail(e.target.value.split(","))}
              />
            </div>
          </div>
          <div className="flex flex-col p-3 h-auto border-b-2 border-gray-400">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-navbarbg text-lg md:text-2xl font-semibold">
                Cc
              </h2>
              <div
                id="2"
                className="bg-navbarbg hover:bg-indigo-400 cursor-pointer text-white h-10 w-36 md:w-52 p-4 flex items-center rounded-sm"
                onClick={openList}
              >
                <span className="w-full text-center text-xs md:text-base">
                  Add all CC
                </span>
              </div>
            </div>
            <div id="cc" className="hidden p-4">
              <input
                type="text"
                name="email"
                placeholder="Enter email (splitted by ,)"
                value={cc}
                onChange={(e) => setCcemail(e.target.value.split(","))}
              />
            </div>
          </div>
          <div className="flex flex-col p-3 h-auto border-b-2 border-gray-400">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-navbarbg text-lg md:text-2xl font-semibold">
                Subject
              </h2>
              <div
                id="3"
                className="bg-navbarbg hover:bg-indigo-400 cursor-pointer text-white h-10 w-36 md:w-52 p-4 flex items-center rounded-sm"
                onClick={openList}
              >
                <span className="w-full text-center text-xs md:text-base">
                  Write your subject
                </span>
              </div>
            </div>
            <div id="sub" className="hidden p-4 justify-center items-center">
              <input
                type="text"
                name="subject"
                className="w-5/6 border-2 border-blue-400 bg-blue-50"
                placeholder="Enter subject here"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col p-3 h-auto border-b-2 border-gray-400">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-navbarbg text-lg md:text-2xl font-semibold">
                Mail Body
              </h2>
              <div
                id="4"
                className="bg-navbarbg hover:bg-indigo-400 cursor-pointer text-white h-10 w-36 md:w-52 p-4 flex items-center rounded-sm"
                onClick={openList}
              >
                <span className="w-full text-center text-xs md:text-base">
                  Write the mail content
                </span>
              </div>
            </div>
            <div id="body" className="hidden p-4 justify-center items-center">
              {/* <Editor
              placeholder="Start writing from here"
              init={{
                height: 500,
                width: 700,
                menubar: false,
              }}
              value={mailBody}
              onChange={(e) => setMailbody(e.target.value)}
            /> */}
              <input
                type="text"
                name="mailBody"
                className="w-5/6 border-2 border-blue-400 bg-blue-50"
                placeholder="Enter Mail Body here"
                value={mailBody}
                onChange={(e) => setMailbody(e.target.value)}
              />
            </div>
          </div>
          <div className="flex p-4 flex-col h-auto">
            <h2 className="text-navbarbg text-lg md:text-2xl font-semibold">
              Schedule Selector
            </h2>

            <div className="flex flex-col lg:flex-row p-4">
              <div className="flex md:relative items-center justify-between">
                <div className="pr-1 md:pr-4" id="reccuring">
                  <input
                    type="radio"
                    name="scheduling"
                    onChange={(e) => setscheduled(1)}
                  />
                  <label
                    htmlFor="reccuring"
                    className="text-xs text-gray-500 py-2 px-1"
                  >
                    Every few seconds
                  </label>
                </div>
              </div>

              <div className="flex md:relative items-center justify-between">
                <div className="pr-1 md:pr-4" id="weekly">
                  <input
                    type="radio"
                    name="scheduling"
                    onChange={(e) => setscheduled(2)}
                  />
                  <label
                    htmlFor="weekly"
                    className="text-xs text-gray-500 py-2 px-1"
                  >
                    Every week
                  </label>
                </div>
              </div>

              <div className="flex md:relative items-center justify-between">
                <div className="pr-1 md:pr-4" id="monthly">
                  <input
                    type="radio"
                    name="scheduling"
                    onChange={(e) => setscheduled(3)}
                  />
                  <label
                    htmlFor="monthly"
                    className="text-xs text-gray-500 py-2 px-1"
                  >
                    Every month
                  </label>
                </div>
              </div>

              <div className="flex md:relative items-center justify-between">
                <div className="pr-1 md:pr-4" id="yearly">
                  <input
                    type="radio"
                    name="scheduling"
                    onChange={(e) => setscheduled(4)}
                  /> 
                  <label
                    htmlFor="yearly"
                    className="text-xs text-gray-500 py-2 px-1"
                  >
                    Every year
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full mb-3">
            <button
              type="submit"
              className="-bottom-16 flex justify-center items-center align-middle bg-send hover:bg-indigo-700 rounded-3xl text-white text-lg w-28 px-3 py-2 text-center cursor-pointer"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Box;
