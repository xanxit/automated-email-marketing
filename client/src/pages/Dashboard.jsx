
import React, { useEffect } from "react";
import Card from "../components/Card";
import EmailCard from "../components/emailCard";
import { Route } from "react-router-dom";
import { getEmailData } from "../actions/emailActions";
import { useDispatch, useSelector } from "react-redux";


const Dashboard = ({ match }) => {
  const emailDat = useSelector((state) => state.emailDat);
  const { emailData } = emailDat;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmailData());
  }, [dispatch]);
  // console.log(emailData);
  return (
    <div>
      <Route path={`${match.path}/:emailId`} component={EmailCard} />
    </div>
  );
};

export default Dashboard;
