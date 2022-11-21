import React  from "react";
import { useReducer } from "react";
import { useContext } from "react";

const ErrorContext=React.createContext();

const reducer=(state,action)=>{
    switch(action.type){
        case "UPDATE":
            return {
                message:action.message,
                error:true,
                refresh:!state.refresh
            }
        case "RESET":
            return {
                message:"",
                error:false
            }
        default:
            return state;    
    }

}


const ErrorProvider=({children})=>{

    const initState={
        message:"",
        error:false,
        refresh:false
    }

    const [state,dispatch]=useReducer(reducer,initState);

 

    return (
        <ErrorContext.Provider
        value={{
            dispatch,
            state
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