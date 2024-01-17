import React, { useState, useRef} from 'react';
import Header from './Header';
import bg_img from '../images/bg-image.jpg'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm ,setIsSignInForm]=useState(false);
  const [errorMsg, setErrorMsg]=useState(null);
  const dispatch=useDispatch();

  const email=useRef(null);
  const password=useRef(null);
  const name = useRef(null);
  
  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick=()=>{
    // console.log(email.current.value);
    // console.log(password.current.value);

     const message=checkValidData(email.current.value, password.current.value);
    //  console.log(message);
     setErrorMsg(message);
     if(message) return ;

     if(!isSignInForm){

       // Signed up 
  createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    
    updateProfile(user, {
      displayName: name.current.value ,
    }).then(() => {
      // Profile updated!
      const { uid, email, displayName } =auth.currentUser;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
    }).catch((error) => {
      setErrorMsg(error.message);
    });
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg(errorCode+"_"+errorMessage);
    
    
  });
}else{
  signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    // eslint-disable-next-line
    const user = userCredential.user;

    // console.log(user);
  })
  .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode+"_"+errorMessage);
        });
      }
  };

  return (
    <>
    <Header/>

    <div className='absolute w-full '>
      <img  className='w-full object-cover ' src={bg_img} alt='bg'/>
    </div>

    <form onSubmit={(e)=>e.preventDefault()} className='w-full md:w-1/4 absolute   bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg  bg-opacity-80  p-12'>
      <h1 className='font-bold text-3xl py-4 '>{isSignInForm ? "Sign In": "Sign Up"}</h1>
      {!isSignInForm && <input type='text' ref={name} placeholder='Full Name' className='p-4 my-4 w-full  bg-gray-700 rounded-lg'/>}
      <input ref={email} type='text' placeholder='Email or phone number' className='p-4 my-4 w-full  bg-gray-700 rounded-lg'/>
      <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-lg'/>
      <p className='text-red-700 text-lg py-2'>{errorMsg}</p>
      <button className=' p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In": "Sign Up"}</button>
      <p className='py-4 cursor-pointer'><span className='text-gray-400'>{isSignInForm ? "New to Netflix?": "Already Customer?"}</span ><span onClick={toggleSignInForm} className=' hover:underline'> {isSignInForm ? "Sign up now.": "Sign In now."}</span></p>
    </form>

    </>
  )
}

export default Login;
