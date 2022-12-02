import React from "react";
import { signoutUser } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter, useHistory } from "react-router-dom";

const Navbar = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userData } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(signoutUser());
    history.push("/login");
  };
  return (
    <div className="w-full h-23 bg-navbarbg flex justify-between mb-6">
      <Link to="/" className="px-6 flex justify-between">
        <img src="/assets/logo.svg" alt="logo" className="w-full" />
      </Link>
      {history.location.pathname === "/login" ||
      history.location.pathname === "/signup" ||
      history.location.pathname === "/" ? (
        <div className="h-full text-gray-100 font-semibold text-base w-1/2 flex items-center justify-end mr-10">
          <Link to="/login" className="px-4 py-2">
            LOGIN
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-signup rounded-3xl">
            SIGN UP
          </Link>
        </div>
      ) : (
        <div className="h-full text-gray-100 font-semibold text-xs sm:text-base w-full flex items-center justify-end">
          <div
            className="sm:px-4 sm:py-2 p-2 inline-flex cursor-pointer transform sm:hover:scale-125 sm:transition-transform sm:ease-in-out sm:duration-500"
            onClick={() => history.push("/dashboard")}
          >
            <img
              src="https://img-premium.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1624790546~hmac=882e8e2e16874dc118a4bfedaecdf8a8"
              alt="account"
              className="w-8"
            />
          </div>
          <p className="">{userData ? `Welcome, ${userData.name}` : ""}</p>
          <Link
            to="/dashboard"
            className="px-4 py-2 transform hover:scale-110 transition-transform ease-in-out duration-500"
          >
            Dashboard
          </Link>
          <Link
            to="/history"
            className="px-4 py-2 transform sm:hover:scale-110 transition-transform ease-in-out duration-500"
          >
            History
          </Link>

          <div
            className="sm:px-4 sm:py-2 p-2 cursor-pointer transform sm:hover:scale-125 sm:transition-transform sm:ease-in-out sm:duration-500"
            onClick={handleLogout}
          >
            <div>Logout</div>
            <div>
              <img
                src="/assets/power-off-icon.svg"
                alt="logout"
                className="w-5"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Navbar);
