import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../actions/userActions";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
export default function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const userSignin = useSelector((state) => state.userSignin);
  const { userData } = userSignin;
  console.log(userData);
  useEffect(() => {
    if (userData) {
      history.push("/getstarted");
    }
  }, [history, userData]);


  const handlenameChange = (e) => {
    setname(e.target.value);
  };
  const handleemailChange = (e) => {
    setemail(e.target.value);
  };
  const handlepasswordChange = (e) => {
    setpassword(e.target.value);
  };
  const handleconfirmpasswordChange = (e) => {
    setconfirmpassword(e.target.value);
  };
  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:2001/api/google-login",
      data: { tokenId: response.tokenId },
    }).then((response) => {
      console.log(response);
    });

    history.push("/getstarted");

  };
  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  console.log(name, email, password, confirmpassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmpassword) {
      dispatch(registerUser(name, email, password, confirmpassword));
    } else {
      alert("Password and Confirm Password are not same");
    }
    setname("");
    setemail("");
    setpassword("");
    setconfirmpassword("");
    history.push("/getstarted");
  };

  return (
    <div className="py-6">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: `url('https://source.unsplash.com/7H77FWkK_x4/1600x900')`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center">
            CrashXDeveloper
          </h2>
          <div className="flex justify-center">
            <GoogleLogin
              clientId="666935365140-nki4tvcnjkdq1923kknk2b6jh4kicdbb.apps.googleusercontent.com"
              buttonText="Register with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailureGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <p href="#" className="text-xs text-center text-gray-500 uppercase">
              or Register with email
            </p>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
              </div>
              <input
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="text"
                value={name}
                onChange={handlenameChange}
              />
            </div>
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
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
              </div>
              <input
                className="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={confirmpassword}
                onChange={handleconfirmpasswordChange}
              />
            </div>
            <div className="mt-8">
              <button className="bg-purple-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-purple-400">
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link
              to="/login"
              className="text-xs text-gray-500 uppercase hover:text-yellow-500"
            >
              or Log In
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
          {userData ? (
            <button>User Hai</button>
          ) : (
            <button>User Nahi Hai</button>
          )}
        </div>
      </div>
    </div>
  );
}
