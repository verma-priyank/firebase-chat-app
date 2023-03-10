import { MDBTextArea, MDBBtn } from "mdb-react-ui-kit";
import {  useState } from "react";
import { useSelector } from "react-redux";
import { userDocrefSelector } from "../../store/users/user.selector";

import { fetchReciverselector } from "../../store/chat/chat.selector";
import { createChatData, createlatestchat } from "../../utils/firbase.utils";

const Input = () => {

  const [text , settext] = useState("");
  const reciverdata = useSelector(fetchReciverselector);
  const userDoc = useSelector(userDocrefSelector);
  
  const handleChange =(e)=>{
    settext(e.target.value)
    
  }
  
 const handleSubmit= async (e)=>{
  e.preventDefault()
  const sender = userDoc.uid;
  const reciver = reciverdata.uid;
  const reciverName = reciverdata.displayName;
  const combinedId = sender>reciver?`${sender+reciver}`:`${reciver+sender}`
  
  try{
    
    await createChatData(sender , reciver , text, combinedId )
    
    // await createlatestchat(sender , reciver , text , combinedId)
    settext("")
  }
  catch(error){
    console.log(error)
  }
 
  
}
 
  
  

  
  


  return (
    <>
      <li className="bg-white mb-4 input-container">
        <div className="form-outline">
          <textarea
            className="form-control input-textarea pr-4"
            id="textAreaExample"
            rows="3"
            onChange={handleChange}
            value={text}
          ></textarea>
          <label className="form-label" for="textAreaExample">
            Message
          </label>
          <div className="form-notch">
            <div className="form-notch-leading"></div>
            <div className="form-notch-middle"></div>
            <div className="form-notch-trailing"></div>
          </div>
        </div>
        <button className="ripple ripple-surface btn btn-info btn-rounded float-end input-button" onClick={handleSubmit}>
          Send
        </button>
      </li>
    </>
  );
};
export default Input;

// <li className="bg-white mb-4 input-container">

// <MDBTextArea label="Message" id="textAreaExample" rows={3} className="input-textarea"/>
// <MDBBtn color="info" rounded className="float-end input-button">
//         Send
//       </MDBBtn>
//       </li>
