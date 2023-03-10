import { combineReducers } from "redux";
import { chatReducer } from "./chat/chat.reducer";
import { userReducer } from "./users/users.reducer"


export const rootReducers =combineReducers({
    user : userReducer,
    connections:chatReducer
})