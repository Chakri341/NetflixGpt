import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Api_options } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useSelector } from "react-redux";


const usePopular=()=>{

    const dispatch=useDispatch();

    const popular_movies=useSelector((store)=>store.movies.popularMovies)
    
    useEffect(()=>{
      !popular_movies && getPopularMovies();
      // eslint-disable-next-line
    }, []);

    const getPopularMovies=async()=>{
      const data= await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', Api_options);
      const json=await data.json();
      // console.log(json.results);
      dispatch(addPopularMovies(json.results));
    }

}
    
export default usePopular;