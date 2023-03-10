

import { useSelector } from "react-redux";
import { fetchReciverselector } from "../../store/chat/chat.selector";
import { userDocrefSelector } from "../../store/users/user.selector";
import Input from "./input.component";

import { useEffect, useState, useRef } from "react";
import { getChatCollection, lastMessage } from "../../utils/firbase.utils";
const ChatArea = () => {
  const [msgs, setmsgs] = useState([]);
  const reciverdata = useSelector(fetchReciverselector);
  const scrollRef = useRef();

  const userDoc = useSelector(userDocrefSelector);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);
  if (userDoc) {
    const sender = userDoc.uid;
    const reciver = reciverdata.uid;
    const combinedId =
      sender > reciver ? `${sender + reciver}` : `${reciver + sender}`;
    const unsubscribe = async () => {
      const res = await getChatCollection(combinedId);

      setmsgs([...res]);
    };

    unsubscribe();
  }

  return (
    <>
      <div className="col">
        <ul className="list-unstyled">
          <div className="chat-area-scroll">
            {msgs.map((chats) => {
              if (chats.from === reciverdata.uid) {
                return (
                  <div>
                    <li className="d-flex  mb-4 " ref={scrollRef}>
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                        width="60"
                      />

                      <div className="card">
                        <div className="card-header d-flex justify-content-between p-3 bg-color-fix">
                          <p className="fw-bold mb-0">
                            {reciverdata.displayName}
                          </p>
                          <p className="text-muted small mb-0">
                          <i class="far fa-clock"></i>
                            {chats.createdAt
                              .toDate()
                              .toLocaleTimeString("en-US")}
                          </p>
                        </div>
                        <div className="card-body">
                          <p className="mb-0" style={{ color: "grey" }}>
                            {chats.text}
                          </p>
                        </div>
                      </div>
                    </li>
                  </div>
                );
              } else {
                return (
                  <>
                    <li
                      class="d-flex justify-content-end mb-4 "
                      ref={scrollRef}
                    >
                      <div className="card">
                        <div className="card-header d-flex justify-content-between p-3">
                          <p class="fw-bold mb-0">You</p>
                          <p class="text-muted small mb-0">
                          <i class="far fa-clock"></i>
                            {chats.createdAt
                              .toDate()
                              .toLocaleTimeString("en-US")}
                          </p>
                        </div>
                        <div className="card-body">
                          <p className="mb-0" style={{ color: "grey" }}>
                            {chats.text}
                          </p>
                        </div>
                      </div>
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                        width="60"
                      />
                    </li>
                  </>
                );
              }
            })}
          </div>
          <Input />
        </ul>
      </div>
    </>
  );
};

export default ChatArea;

//  <li className="d-flex justify-content-between mb-4 ">
// <img
//   src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
//   alt="avatar"
//   className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
//   width="60"
// />
// <MDBCard>
//   <MDBCardHeader className="d-flex justify-content-between p-3">
//     <p className="fw-bold mb-0">Brad Pitt</p>
//     <p className="text-muted small mb-0">
//       <MDBIcon far icon="clock" /> 10 mins ago
//     </p>
//   </MDBCardHeader>
//   <MDBCardBody>
//     <p className="mb-0" style={{ color: "grey" }}>
//       how are you
//     </p>
//   </MDBCardBody>
// </MDBCard>
// </li>
