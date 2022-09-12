import React,{useEffect, useState} from "react";
import AppRouter from "./Router";
import {authService}from "../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const[init, setInit] = useState(false);
  // 파이어베이스가 초기화되기를 기다려(처으엔 false) - 그다임 isLoggedIn이 바뀌기를 

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  // authService.currentUser - 유저가 로그인안했으면 널 아니면 유저값 있음 - 공식 사이트에서 내가 뭘할 수 있는지 확인하고 활용하기
  //https://firebase.google.com/docs/reference/js?authuser=0&hl=ko
  console.log(authService.currentUser);
  const [userObj,setUserobj] = useState(null);


  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //사용자의 상태가바뀌었는지 확인하는 파이어베이스 내장함수 ! !
      if (user) {
      setIsLoggedIn(true);
      setUserobj(user); //user가 누구인지 정하기

      const uid = user.uid;
      } else {
      setIsLoggedIn(false);
      }
      setInit(true);
      });

  },[])

  return(
  <>
  {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..." }
  <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>)
}
 
export default App;
