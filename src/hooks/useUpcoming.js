import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Api_options } from "../utils/constants";
import { addUpComingMovies } from "../utils/moviesSlice";
import { useSelector } from "react-redux";


const useUpComing=()=>{

    const dispatch=useDispatch();
    
    const upcoming_movies=useSelector((store)=>store.movies.upComingMovies);

    
    useEffect(()=>{
      !upcoming_movies && getUpComingMovies();
      // eslint-disable-next-line
    }, []);

    const getUpComingMovies=async()=>{
      const data= await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', Api_options);
      const json=await data.json();
      // console.log(json.results);
      dispatch(addUpComingMovies(json.results));
    }

}
    
export default useUpComing;