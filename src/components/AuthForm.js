import React from "react";
import { useState } from "react";
import {  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,} from 'firebase/auth';

const inputStyles = {};

function AuthForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount]= useState(true);
    const [error,setError] = useState("");

    const onChange = (event) => {
        const { target: {name, value}} = event;
        if( name === "email"){
            setEmail(value);
        }else if( name === "password"){
            setPassword(value);
        }
        // 여기 코드 고쳐봐 벨로퍼트에서 공부한걸로
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        // 기본행위가 실행되는것을 방지 - 새로고침되어서 스테이트가 사라지는 것을 방지

        try {
            const auth =getAuth();
            let data;
        if(newAccount){
            //create account - 파이어베이스 내장 기능
            data = await createUserWithEmailAndPassword(auth, email, password);
        } else {
            //log in
            data = await signInWithEmailAndPassword(auth, email,password);
        }
        console.log(data);

    } catch(error) {
        setError(error.message);
    }
        //https://firebase.google.com/docs/reference/js/v8/firebase.auth.EmailAuthProvider
    };

    const toggleAccount = ( )=> setNewAccount((prev) => !prev);

  return(
    <div>
      <form onSubmit={onSubmit}  className="container" >
        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}  className="authInput"/>
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}  className="authInput" />
        <input type="submit" className="authInput authSubmit" value={newAccount ? "Create Account" : "Log In"}/>
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount}  className="authSwitch" >{newAccount ? "Log in" : "Sing in"} </span>
    </div>
  )
};

export default AuthForm;

