import { USER_ACTION_TYPE } from "./user.types";

export const createAction = (type, payload) => ({ type, payload });

export const setisLogin = (bool) => {
  return { type: USER_ACTION_TYPE.SET_AUTH_PAGE, payload: bool };
};
export const setCurrentUser =(user) =>{
  return {type:USER_ACTION_TYPE.SET_CURRENT_USER,payload:user}
}

export const setUserDocRef =(userdoc)=>{
  return createAction(USER_ACTION_TYPE.SET_USER_DOCREF, userdoc)
}
