import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsEmail, deleteEmail } from "../actions/emailActions";
import { Link } from "react-router-dom";
import Box from "../components/Box";

const HCard = (props) => {
  const CardId = props.match.params.id;
  console.log(CardId);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const emailDetails = useSelector((state) => state.emailDetails);
  const { emailInfo } = emailDetails;
  useEffect(() => {
    dispatch(detailsEmail(CardId));
  }, [CardId, dispatch]);
  console.log(emailInfo);
  const [currentId, setCurrentId] = useState(CardId);
  const stopSchedule = (e) => {
    e.preventDefault();
    dispatch(deleteEmail(CardId));
    props.history.push("/history");
  };

  const editMail = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="email"
              class="lg:w-1/2 w-full lg:h-auto h-56 object-cover object-center rounded"
              src="https://dummyimage.com/200x200"
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                SENDING TIME:
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                TO: {emailInfo.to}
              </h1>
              <h2 class="text-sm title-font text-gray-500 tracking-widest mb-4">
                CC: {emailInfo.cc}
              </h2>
              <p class="leading-relaxed">BODY: {emailInfo.mailBody}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <span class="mr-3">Yours sincerely: {emailInfo.sender}</span>
                <span class="mr-3">Scheduling Type: </span>
              </div>
              <div className="inline-flex">
                <div className="px-2">
                  <button
                    className="px-2 py-3 bg-blue-600 rounded-xl text-white"
                    onClick={stopSchedule}
                  >
                    Stop Schedule
                  </button>
                </div>
                <div className="px-2">
                  <>
                    <button
                      className="bg-blue-600 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(true)}
                    >
                      Edit Mail
                    </button>
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <Box
                            setShowModal={setShowModal}
                            setCurrentId={setCurrentId}
                            currentId={currentId}
                          />
                          <div className="opacity-20 inset-0 bg-black"></div>
                        </div>
                      </>
                    ) : null}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HCard;
