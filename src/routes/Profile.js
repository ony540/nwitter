import React, { useState} from "react";
import { signOut , updateProfile} from "firebase/auth";
import { authService } from "../fbase";
import { useNavigate } from "react-router-dom";


function Profile({ userObj,refreshUser }) {
    const navigate = useNavigate();
    const auth = authService;
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        signOut(auth);
        navigate("/", { replace: true }); 
        // 첫페이지로 이동
    };


    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
      event.preventDefault();
      if (userObj.displayName !== newDisplayName) {
        await updateProfile(authService.currentUser, { displayName: newDisplayName });
        refreshUser();
      }
    };
      
  return(
    <>
      <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type="text"
            placeholder="Display name"
            value={newDisplayName}
          />
          <input type="submit" value="Update Profile" />
        </form>
     <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
};

export default Profile;
