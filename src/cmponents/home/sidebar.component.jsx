
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setReciverdata } from "../../store/chat/chat.action";
import { fetchReciverselector } from "../../store/chat/chat.selector";
import {
  
  userDocrefSelector,
} from "../../store/users/user.selector";
import { getUsersCollection  , getLatestChat, lastMessage} from "../../utils/firbase.utils";

const SideBar = () => {

  const dispatch = useDispatch();
  const userDoc = useSelector(userDocrefSelector);
  
  const reciverdata = useSelector(fetchReciverselector);
  

  const [connection, setconnection] = useState();
  
  
  

  const users = async () => {
    if (userDoc) {
      
      const res = await getUsersCollection(userDoc);
      
      return setconnection(res);
    }
  };
 
  
  useEffect(() => {
    
    users();
    
  }, [userDoc  ]);

  const handleClick = (data) => {
    return dispatch(setReciverdata(data));
  };

  return (
    <>
      <div md="6" lg="5" xl="4" className="mb-4 mb-md-0 sidebar-scroll">
        <h5 className="font-weight-bold mb-3 text-center text-lg-start ms-2 ">
          Connections
        </h5>

        <div className="card">
          <div className="card-body">
            <div listUnStyled className="mb-0 list-unstyled">
              {connection &&
                connection.map((data) => {
                 console.log(data.uid)
                  return (
                    <div key={data.uid} onClick={() => handleClick(data)}>
                      <li
                        className="p-2 border-bottom"
                        style={{ backgroundColor: "white" }}
                      >
                        <a href="#!" className="d-flex justify-content-between">
                          <div className="d-flex flex-row">
                            <img
                              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">{data.displayName}</p>
                              
                             
                                 <p className="small text-muted">
                                  {}
                                </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">{data.createdAt.toDate().toLocaleTimeString('en-US')}</p>
                          </div>
                        </a>
                      </li>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;

// 