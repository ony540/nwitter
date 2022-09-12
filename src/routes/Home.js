import React, { useEffect,useState} from "react";
import { dbService } from "../fbase";
import { collection, query, onSnapshot, orderBy, } from "firebase/firestore";
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

function Home({userObj}) {
  const [nweets, setNweets] = useState([]);


  useEffect(() => { //실시간 트윗목록 보기
    const q = query(
    collection(dbService, "nweets"), //dbService안의 콜랙션 nweets의 쿼리스냅샷의 Docs를 
    orderBy("createdAt", "desc")  //생성시기 내림차순으로 들고오기
    );
 
    //쿼리가 아니라 스냅샷을 사용해서 실시간으로 볼 수 있음 ! ! 
    onSnapshot(q, (snapshot) => { //onSnapshot은 Snapshot을 얻는 거임  Snapshot은 우리가 가진 query와 같은것 
    const nweetArr = snapshot.docs.map((document) => ({ //snapshot은 docs를 가지고 있음
    id: document.id,
    ...document.data(),
    }));
    setNweets(nweetArr); //Nweets 목록 업데이트
    });
    }, []);



  return(
    <>
    <NweetFactory userObj={userObj} />
    <div>
      {nweets.map((nweet) => (
       <Nweet 
       key={nweet.id}
       nweetObj={nweet} 
       isOwner={nweet.creatorId === userObj.uid}
      />
      ))}
    </div>
    </>
  )
};

export default Home;
