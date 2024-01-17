import React from "react";
import logo from "../images/logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import usericon from "../images/usericon.jpg";
import { toggleGptSearchView } from "../utils/gptSlice";
import { Supported_languages } from "../utils/constants";
import {changeLanguage} from '../utils/configSlice'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribing when component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value));

  }

  return (
    <div className="absolute w-screen px-8  py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className=" w-32 mx-auto md:mx-0" src={logo} alt="logo" />
      {user && (
        <div className="flex p-2 justify-between  items-center">
         { showGptSearch && <select className="p-2 m-2 bg-gray-800 text-white" onChange={handleLanguageChange}>
            {Supported_languages.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="bg-purple-800 p-2 rounded-lg text-white"
            onClick={handleGptSearch}
          >
            {showGptSearch?"Homepage":"GPT Search"}
          </button>
          <img className=" w-20 h-16 p-3" src={usericon} alt="usericon" />
          <div>
            <p className="text-white px-4">{user.displayName}</p>
            <button className="text-white px-4" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
