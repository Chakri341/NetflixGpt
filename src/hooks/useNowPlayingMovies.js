import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Api_options } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useSelector } from "react-redux";

const useNowPlayingMovies=()=>{

    const dispatch=useDispatch();

    const nowPlaying_Movies=useSelector((store)=>store.movies.nowPlayingMovies);

    useEffect(()=>{
    !nowPlaying_Movies && getNowPlayingMovies(); 
      // eslint-disable-next-line
    }, []);

    const getNowPlayingMovies=async()=>{
      const data= await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', Api_options);
      const json=await data.json();
      // console.log(json.results);
      dispatch(addNowPlayingMovies(json.results));
    }

}
    
export default useNowPlayingMovies;