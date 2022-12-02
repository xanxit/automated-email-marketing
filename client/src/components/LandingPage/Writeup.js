import React from 'react';
import { Link } from "react-router-dom";

function Writeup() {
  return (
    <div className="relative z-10">
      <div className="absolute w-32 h-32  lg:w-44 bg-blue-400  lg:h-44 rounded-full -z-1 -top-20 left-8"></div>
      <div className="px-24 md:px-32">

        <p className="font-bold text-xl md:text-4xl" style={{lineHeight: "1.5"}}>
          Reach the right people
          with the automation
          of your <span className="bg-blue-300 px-4 text-white">Email</span>
        </p>
        <Link to='/getstarted'>
          <button className="bg-blue-400 text-white px-6 py-2 md:px-12 md:py-4 rounded-full font-semibold mt-10" >Get Started</button>
        </Link>
      </div>
      
      
    </div>
  )
}

export default Writeup
