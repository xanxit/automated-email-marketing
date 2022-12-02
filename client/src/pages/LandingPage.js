
import React from "react";
import Imagesec from "../components/LandingPage/Imagesec";
import Writeup from "../components/LandingPage/Writeup";

function LandingPage() {
  return (
    <div className="flex w-full h-full items-center flex-wrap">
      <div className="w-full lg:w-6/12 mt-40 lg:mt-0">
        <Writeup />
      </div>
      <div className="w-6/12">
        <Imagesec />
      </div>
      <div className="absolute bottom-0 w-full h-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,128L48,160C96,192,192,256,288,245.3C384,235,480,149,576,138.7C672,128,768,192,864,224C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default LandingPage;

