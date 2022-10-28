import React, { useState }  from "react";
import { useContext } from "react";

const ErrorContext=React.createContext();
const ErrorProvider=({children})=>{
    const [message,setMessage]=useState("");

    const getError=(err)=>{
        setMessage(err)
    }

    return (
        <ErrorContext.Provider
        value={{
            getError,
            message
        }}
        >
            {children}
        </ErrorContext.Provider>
    )
}


const useError=()=>{
    return useContext(ErrorContext);
}

export {ErrorContext,ErrorProvider,useError};