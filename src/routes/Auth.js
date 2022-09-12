import React from "react";
// import { authService } from "../fbase";
import {  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup} from 'firebase/auth';
import AuthForm from "../components/AuthForm";

function Auth() {

    const onSocialClick = async (event) => {
      const {
        target:{name},
    } = event;
    let provider;
    const auth= getAuth();
    if (name === "google"){
      provider = new GoogleAuthProvider();

    } else if ( name ==="github"){
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth,provider);
    console.log(data);
 
    }

  return(
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button> 
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  )
};

export default Auth;

