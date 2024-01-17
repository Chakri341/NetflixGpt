import { useEffect } from "react";
import { Api_options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useSelector } from "react-redux";


const useTrailer= (movieId) =>{

    const dispatch=useDispatch();

    const trailer_video=useSelector((store)=>store.movies.trailerVideo);

    useEffect(() => {
      !trailer_video && getMovieVideo();
        // eslint-disable-next-line
      }, []);
    
      const getMovieVideo = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/"+
          movieId+ 
          "/videos?language=en-US",
          Api_options
        );

        const json = await data.json();
        // console.log(json.results);
        const filterData = json.results?.filter((video)=> video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));

}

}

export default useTrailer;