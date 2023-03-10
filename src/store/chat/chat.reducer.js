import { FETCH_USERS } from "./chat.types";


const INITIAL_STATE ={
    reciverData : {}
}

export const chatReducer =(state=INITIAL_STATE , action)=>{
    const {type , payload} = action;
    console.log("payload" ,payload)
    switch(type){
        case FETCH_USERS.FETCH_RECIVER :
            return {
                ...state,
                reciverData:payload
            }
        
        default :
        return state ;   
    }
}