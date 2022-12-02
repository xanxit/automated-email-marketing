import React, { useEffect } from "react";
import Card from "../components/Card";
import HCard from "../components/HCard";
import { Route } from "react-router-dom";
import { getEmailData } from "../actions/emailActions";
import { useSelector, useDispatch } from "react-redux";

const History = ({ match }) => {
  const emailDat = useSelector((state) => state.emailDat);
  const { emailData } = emailDat;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmailData());
  }, [dispatch]);
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mx-2">
      {emailData.map((mail) => (
        <Card mail={mail} key={mail._id} />
      ))}
      <Route path={`${match.path}/:emailId`} component={HCard} />
    </div>
  );
};

export default History;
