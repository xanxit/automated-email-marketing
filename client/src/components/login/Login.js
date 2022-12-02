import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signinUser,
  signoutUser,
  googleLogin,
} from "../../actions/userActions";
import { Link, useHistory } from "react-router-dom";

import { GoogleLogin } from "react-google-login";
import axios from "axios";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleemailChange = (e) => {
    setemail(e.target.value);
  };
  const handlepasswordChange = (e) => {
    setpassword(e.target.value);
  };

  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:2001/api/google-login",
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log(response);

      console.log(response.data.token);
    });
    history.push("/getstarted");
  };
  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userData } = userSignin;
  console.log(userData);
  useEffect(() => {
    if (userData) {
      history.push("/getstarted");
    }
  }, [history, userData]);

  // const config = {
  //   headers: { Authorization: `Bearer ${userData.token}` },
  // };

  // console.log(config);

  console.log(email, password);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinUser(email, password));
    setemail("");
    setpassword("");
    history.push("/getstarted");
  };

  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(signoutUser());
  };

  return (
    <div className="py-28">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: `url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fmail-yellow-circle-icon-5273834.jpg&f=1&nofb=1')`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center">
            CrashXDeveloper
          </h2>

          <div className="flex justify-center">
            <GoogleLogin
              clientId="666935365140-nki4tvcnjkdq1923kknk2b6jh4kicdbb.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailureGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <p href="#" className="text-xs text-center text-gray-500 uppercase">
              or login with email
            </p>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={handleemailChange}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={handlepasswordChange}
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-purple-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-purple-400"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link
              to="/signup"
              className="text-xs text-gray-500 uppercase hover:text-yellow-500"
            >
              or Sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
          <div>
            <button onClick={handleSignout}>Signout</button>
          </div>
          <div>
            {userData ? (
              <button>User Hai</button>
            ) : (
              <button>User Nahi Hai</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
