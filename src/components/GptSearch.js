import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSuggestions from "./GptSuggestions";
import bg_img from "../images/bg-image.jpg";

const GptSearch = () => {
  return (
    <>
      <div className="fixed w-full -z-10">
        <img className="h-screen w-full  " src={bg_img} alt="bg" />
      </div>
      <div className="">
        <GptSearchBar />
        <GptSuggestions />
      </div>
    </>
  );
};

export default GptSearch;


