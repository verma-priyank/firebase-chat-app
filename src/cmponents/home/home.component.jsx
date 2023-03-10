import React, { useEffect } from "react";

import "./home.styles.scss";
import SideBar from "./sidebar.component";
import ChatArea from "./chat-area.component";
import { Button } from "react-bootstrap";
import { onSignOut } from "../../utils/firbase.utils";

import { useDispatch, useSelector } from "react-redux";
import { userDocrefSelector } from "../../store/users/user.selector";
import { fetchReciverselector } from "../../store/chat/chat.selector";
import { setReciverdata } from "../../store/chat/chat.action";


export default function Home() {
const dispatch = useDispatch()
  const userDoc = useSelector(userDocrefSelector);
  const reciverdata = useSelector(fetchReciverselector);
 
  useEffect(()=>{
    dispatch(setReciverdata(null));
  },[])
  
 

  return (
    <div 
      fluid
      className="py main-box "
      style={{ backgroundColor: "white" }}
    >
      <div className="home-header">
        <h3>Meet Box</h3>
        {userDoc && <h3>hello {userDoc.displayName}</h3>}
        <Button onClick={() => onSignOut()}>Log Out</Button>
      </div>

      <div className="home-boxes">
      <SideBar />
      {reciverdata && <ChatArea />}
    
      </div>
    </div>
  );
}
// 
// 
        // 
