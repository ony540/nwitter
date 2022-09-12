import React, { useState } from "react";
import { dbService,storageService } from "../fbase";
import {deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

function Nweet({nweetObj, isOwner}) {
    const [editing,setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);

    const desertRef = ref(storageService, nweetObj.attachmentUrl); //삭제하려는 이미지 파일 가리키는 ref

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this tweet?")
        console.log(ok);
        if(ok) {
          try {
              await deleteDoc(NweetTextRef); //해당하는 트윗 파이어스토어에서 삭제
            
            if (nweetObj.attachmentUrl !== "") {
              await deleteObject(desertRef); //삭제하려는 트윗에 이미지 파일이 있는 경우 이미지 파일 스토리지에서 삭제
            }
            } catch (error) {
            window.alert("트윗을 삭제하는 데 실패했습니다!");
            }  
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async(event) => {
        event.preventDefault();
        await updateDoc(NweetTextRef, {
            text: newNweet,
            });
        setEditing(false);
      };

    const onChange = (event) => {
        const {target: {value}
        } = event;
        setNewNweet(value);
    };
  return(
    <div>
   
    { editing ? ( 
        <>
        <form onSubmit={onSubmit}>
            <input 
            type="text"
            placeholder="Edit your nweet"
            value={newNweet} 
            required
            onChange={onChange}
             />
            <input type="submit" value="Update Nweet" />
        </form>
        <button onClick={toggleEditing}>Cancel</button>
        </>

        ) : (
            <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} alt="img" width="50px" height="50px" />
          )}
            {/* {new Date(nweetObj.createdAt).toLocaleString()} <br></br> */}
            {isOwner &&
            <>
            <button onClick={onDeleteClick}>Delete Nweet</button>
            <button onClick={toggleEditing}>Edit Nweet</button>
            </>}
            </>
             )
    }
 
    </div>
  )
};

export default Nweet;
