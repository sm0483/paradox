import React from "react";
import { useContext } from "react";
import { useReducer } from "react";

const ChatContext=React.createContext();

const initUser={
    error:false,
    loading:false,
    combId:""
}

const reducer=(state,action)=>{
    switch(action.type){
        case "upload":
            return{
                ...state,
                combId:action.combId
            }
        case "error":
            return {
                ...state,
                error:true,
            }
        case "loading":
            return {
                ...state,
                error:false,
                loading:true
            }

        default:
            return state;    
    }

}

const ChatProvider=({children})=>{

    const [state,dispatch]=useReducer(reducer,initUser);

    return (
        <ChatContext.Provider
        value={{
            state,
            dispatch
        }}
        >
            {children}
        </ChatContext.Provider>
    )
}

const useChat=()=>{
    return useContext(ChatContext)
}


export {useChat,ChatContext,ChatProvider}