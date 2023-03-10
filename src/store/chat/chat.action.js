

import { FETCH_USERS } from "./chat.types"
export const createAction = (type, payload) => ({ type, payload });

export const setReciverdata =(data) =>{
    
  return   createAction(FETCH_USERS.FETCH_RECIVER , data)
}