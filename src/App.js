import logo from "./logo.svg";
import "./App.css";
import Auth from "./cmponents/auth/auth.components";
import { useEffect, useState } from "react";
import Home from "./cmponents/home/home.component";
import { useDispatch } from "react-redux";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firbase.utils";
import { setCurrentUser, setUserDocRef } from "./store/users/users.action";
function App() {
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      
      if (user) {
        
        setIsCurrentUser(true);
        if(user){
        const res = await createUserDocumentFromAuth(user);
        
        dispatch(setCurrentUser(user));
        if( res ){
          dispatch(setUserDocRef(res));
        }
        
        }
      } else {
        dispatch(setCurrentUser(user));
        setIsCurrentUser(false);
        dispatch(setUserDocRef(null));
      }
      
     
    });
    return () => unsubscribe();
  }, []);
  return <div>{isCurrentUser ? <Home /> : <Auth />}</div>;
}

export default App;
