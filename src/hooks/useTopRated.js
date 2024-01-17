import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Api_options } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useSelector } from "react-redux";


const useTopRated=()=>{

    const dispatch=useDispatch();

    const top_rated=useSelector((store)=>store.movies.topRatedMovies);

    
    useEffect(()=>{
      !top_rated && getTopRatedMovies();
      // eslint-disable-next-line
    }, []);

    const getTopRatedMovies=async()=>{
      const data= await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', Api_options);
      const json=await data.json();
      // console.log(json.results);
      dispatch(addTopRatedMovies(json.results));
    }

}
    
export default useTopRated;