import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../fbase";
import { collection, addDoc, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";

function Home() {

  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  //컴포넌트가 마운트될때 getNweets 실행됨
  const getNweets = async() => {
    const q = query(collection(dbService, "nweets"));
    const querySnapshot = await getDocs(q); //dbService안의 콜랙션 nweets의 쿼리스냅샷의 Docs를 들고오기
    
    querySnapshot.forEach((doc) => { //doc의 각각의 데이터를
    const nweetObj = {
    ...doc.data(), // 이전의 데이터까지 다 들고오고(...), 가장최근의 독의 데이터까지 붙이기
    id: doc.id, //id도 가짐
    };
    setNweets(prev => [nweetObj, ...prev]);
    });
  };

  useEffect(()=>{
    getNweets();
  },[]);

  //이게 promise 를 리턴하기 때문에 async와  await하기
  const onSubmit =  async(event) => {
    event.preventDefault();
    await addDoc(collection(dbService,"nweets"),{ //dbService(데이터베이스)를 들고와서 nweets라는 컬랙션을 만들고
      nweet, //nweet이라는 키에 nweet이라는 벨류 넣기 !!
      createdAt: Date.now(), //createdAt(생성시기)라는 키에 Date.now()라는 벨류 넣기 !! 
    });
    setNweet(""); //subit 칸 비우기
  };

  
  const onChange = (event) => {
    const { target:{value},
  } = event;
  setNweet(value);
  };

  console.log(nweets);

  return(
    <>
    <form  onSubmit={onSubmit}>
      <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
      <input type="submit" value="Nweet"/>
    </form>
    <div>
      {nweets.reverse().map((nweet) => (
        <div key={nweet.id}>
          <h4>{nweet.nweet}</h4>
          </div>
      ))}
    </div>
    </>
  )
};

export default Home;
