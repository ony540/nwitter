import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import {collection, getDocs, query, where, orderBy} from "firebase/firestore"
import { authService, dbService } from "../fbase";
import { useNavigate } from "react-router-dom";


function Profile({ userObj }) {
    const navigate = useNavigate();
    const auth = authService;
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        signOut(auth);
        navigate("/", { replace: true }); 
        // 첫페이지로 이동
    };

    const getMyNweets = async () => { //collection, getDocs, query, where, orderBy
      //3. 트윗 불러오기
      //3-1. dbService의 컬렉션 중 "nweets" Docs에서 userObj의 uid와 동일한 creatorID를 가진 모든 문서를 내림차순으로 가져오는 쿼리(요청) 생성
      const q = query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt", "desc")
      );
      
      //3-2. getDocs()메서드로 쿼리 결과 값 가져오기
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      });
    };
  
    useEffect(() => { //4. 내 nweets 얻는 function 호출
      getMyNweets();
    }, []);

  return(
    <>
    
     <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
};

export default Profile;
