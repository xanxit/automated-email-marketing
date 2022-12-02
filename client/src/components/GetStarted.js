import React from 'react';
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <div className="flex flex-col w-full h-96 items-center justify-center">
      <div className="w-10/12">
        <p className="text-4xl font-bold">Ready to get started?</p>
        <p className="mt-2">Here's what we recommend you do next</p>
        <div className="flex w-full mt-8 border-black lg:border">
          <div className="w-6/12 hidden lg:flex">
            <img src="./assets/startimg.png" alt="startimg"/>
          </div>
          <div className="flex lg:justify-center items-center w-full">
            <div>
              <p className="text-2xl font-bold">Send your first email</p>
              <p className="mt-2">Choose a pre-designed template and put the information in minutes and send.</p>
              <Link to='/form'>
                <button className="bg-blue-500 text-white px-8 py-2 mt-4">Create Your Email</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
