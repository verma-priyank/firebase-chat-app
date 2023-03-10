
import { USER_ACTION_TYPE } from "./user.types";

const INITIAL_STATE={
    currentUser:{},
    isLoginSetup:true,
    userDoc:{}
}
export const userReducer =(state=INITIAL_STATE, action) =>{

    const {type , payload} = action;
    switch(type){
        case USER_ACTION_TYPE.SET_CURRENT_USER :
            return ({
                ...state,
                currentUser:payload
            })
            case USER_ACTION_TYPE.SET_AUTH_PAGE:
                return ({
                   ...state ,
                   isLoginSetup :payload
                })
            case USER_ACTION_TYPE.SET_USER_DOCREF:
                return ({
                    ...state,
                    userDoc:payload
                })    
         default :
         return state ;   
    }

}