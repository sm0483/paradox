import React, { useContext } from "react";
import { useState } from "react";
import { useReducer } from "react";

const ContactContext=React.createContext();

const reducer=(state,action)=>{
    switch(action.type){
        case "change_user":
            return{
                sender:action.sender,
                reciver:action.reciver,
                combId:action.combId
            }
        default:
            return state;    
    }
}

const ContactProvider=({children})=>{

    const [value,setValue]=useState("cat");

    const initPair={
        sender:"",
        reciver:"",
        combId:""
    }

    const [state,dispatch]=useReducer(reducer,initPair);

    return(
        <ContactContext.Provider
        value={{
            state,
            dispatch,
        }}
        >
            {children}
        </ContactContext.Provider>

    )
}


const useContact=()=>{
    return useContext(ContactContext);
}


export {useContact,ContactContext,ContactProvider};

