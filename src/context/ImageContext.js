import React, { useContext } from "react";
import { useReducer } from "react";


const ImageContext=React.createContext();

const reducer=(state,action)=>{
    switch(action.type){
        case "error":
            return{
                ...state,
                error:true
            }
        case "upload":
            return{
                ...state,
                completed:action.value,
                loading:true
            }
        case "done":
            return {
                ...state,
                loading:false
            };     
        default:
            return state;
    }
}



const ImageProvider=({children})=>{

    const initStage={
        loading:false,
        error:false,
        completed:0,
    }


    const [state,dispatch]=useReducer(reducer,initStage);

    return(
        <ImageContext.Provider
        value={{
            state,
            dispatch
        }}
        >
            {children}
        </ImageContext.Provider>
    )
}


const useImage=()=>{
    return useContext(ImageContext);
}


export {useImage,ImageProvider,ImageContext}