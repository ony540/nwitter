import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import firebase from "./fbase";

console.log(firebase);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

/*
strictmode는 side effect를 줄이기 위해 일부러 두번씩 실행시킨다고 하네요. 
그래서 dev환경에서만 두번씩 호출되고 production에서는 무시된다고 합니다. */


