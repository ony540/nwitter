import React, { useEffect,useState,useRef } from "react";
import { dbService,storageService } from "../fbase";
import { collection, addDoc, query, onSnapshot, orderBy, } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Nweet from "../components/Nweet";
import { v4 as uuidv4 } from 'uuid';
//uuid는 기본적으로 어떤 식별자를 랜덤으로 생성해줌

function Home({userObj}) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();

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


  //이게 promise 를 리턴하기 때문에 async와  await하기
  const onSubmit =  async(event) => { //트윗 업로드
    event.preventDefault();
    try {
      let attachmentUrl = "";
      if (attachment !== "") { //이미지 파일이 있을때
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);  //storage 참조 경로로 파일 업로드 하기
        const response = await uploadString(attachmentRef, attachment, "data_url");
        //storage 참조 경로에 있는 파일의 URL을 다운로드해서 attachmentUrl 변수에 넣어서 업데이트
        attachmentUrl = await getDownloadURL(response.ref);
      }
      const nweetObj = { //트윗 오브젝트
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
     };
     await addDoc(collection(dbService, "nweets"), nweetObj); 
     //트윗하기 누르면 nweetObj 형태로 새로운 document 생성하여 nweets 콜렉션에 넣기
     
    } catch (e) {
    console.error("Error adding document: ", e);
  }
    setNweet(""); //subit 칸 비우기
    setAttachment(""); //어테치 이미지 비우기
  };

  const onChange = (event) => { //트윗 내용 바뀌는거 
    const { target:{value},
  } = event;
  setNweet(value);
  };

  const onFileChange = (event) => { //사진업로드
    const {
      target: { files },
    } = event;
    const theFile = files[0]; //파일은 한개라서 그 파일 가져오기
    const reader = new FileReader(); //fileReader API를 reader라는 이름으로 들고 오고 - 1실행

    reader.onloadend = (finishedEvent) => { //- 3 finishedEvent를 받아와서 이거 실행
      //console.log(finishedEvent); //콘솔에서 확인
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);

    };
    reader.readAsDataURL(theFile); // readAsDataURL을 사용해서 파일 읽기 - 2(이게) 끝나면
  };
  //[FileReader API] https://developer.mozilla.org/ko/docs/Web/API/FileReader
  const onClearAttachment = () => {
    setAttachment("");
    //사진 첨부 없이 텍스트만 트윗하고 싶을 때도 있으므로 기본 값을 ""로 해야한다.
    fileInput.current.value = "";
  };

  return(
    <>
    <form  onSubmit={onSubmit}>
      <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
      <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
      <input type="submit" value="Nweet"/>
      {attachment && (
          <div>
            <img src={attachment} alt="preview" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
    </form>
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
