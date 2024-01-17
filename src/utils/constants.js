export const Api_options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer "+ process.env.REACT_APP_TMBD_KEY,

 
  },
};

export const IMG_CDN = "https://image.tmdb.org/t/p/w500/";

export const Supported_languages = [
  { identifier: "en", name: "English" },
  { identifier: "telugu", name: "Telugu" },
  { identifier: "hindi", name: "Hindi" },
];

export const OPENAI_KEY=process.env.REACT_APP_OPENAI_KEY;

