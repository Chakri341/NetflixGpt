import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { Api_options } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import openai from "../utils/openai";

const GptSearchBar = () => {
  
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmbd = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      Api_options
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value);

    //make api call here

    const gptQuery =
      "Act As a moive recommendation system and suggest  some movies for the query :" +
      searchText.current.value +
      ".only give me names of 5 movies ,comma seperated like the example result given ahead.Example Result:Gadar, Sholay, Don, Golmal, koi mil Gaya ";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    // if (!gptResuts.choices) return;

    const gptMovies = gptResults.choices[0]?.message?.content.split(",");
    // console.log(gptResuts.choices?.[0]?.message?.content.split(",")); //

    // this maps gives the array of promises (5 prom. of array)
    const promiseArray = gptMovies.map((movie) => searchMovieTmbd(movie));
    const tmbdResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmbdResults })
    );
  };

  return (
    <>
      <div className="pt-[35%] md:pt-[10%] flex  justify-center">
        <form
          className="w-full md:w-1/2 bg-black grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="p-4 m-4 col-span-9"
            placeholder={lang[langKey].placeHolder}
          />
          <button
            className="py-2 px-4 bg-red-700 text-white rounded-lg m-4 col-span-3"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GptSearchBar;
