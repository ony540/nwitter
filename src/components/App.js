import React,{useEffect, useState} from "react";
import AppRouter from "./Router";
import {authService}from "../fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const[init, setInit] = useState(false);
  // 파이어베이스가 초기화되기를 기다려(처으엔 false) - 그다임 isLoggedIn이 바뀌기를 

  console.log(authService.currentUser);
  const [userObj,setUserobj] = useState(null);


  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //사용자의 상태가바뀌었는지 확인하는 파이어베이스 내장함수 ! !
      if (user) {
        setUserobj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
          }); //user가 누구인지 정하기

      if (user.displayName === null) { //user의 isplayName이 비어있으면 이메일 앞 아이디로 정하기
        const name = user.email.split("@")[0];
        user.displayName = name;
        }
      } else {
      setUserobj(null);
      }
      setInit(true);
      });

  },[]);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserobj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };


  return(
  <>
  {init ? <AppRouter 
   refreshUser={refreshUser}
   isLoggedIn={Boolean(userObj)} 
   userObj={userObj} /> 
   : "Initializing..." }
  {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
  </>)
}
 
export default App;
