import { useEffect, useState } from 'react';
import {useError} from '../../context/ErrorContext'

import "./ErrorMessage.css"




// "alert-container"




const ErrorMessage = () => {
    const {state,dispatch}=useError();

    const [warn,setWarn]=useState(null);
    const [hide,setHide]=useState(true);

    useEffect(()=>{
        setWarn(state.message);
        setHide(false);

        return()=>{
            setWarn(null);
        }

    },[state.refresh])


    const closePopup=()=>{
        setHide(true);
        dispatch({type:"UPDATE",message:""});
    }


    if(state.message){
    return(
        <div className={`${hide && "hide"} alert-container`}>
            <div className="alert alert-success alert-dismissible fade show">
                <strong>Success!</strong> {warn}
                <button type="button" className="btn-close" 
                        onClick={()=>closePopup()}
                ></button>
            </div> 

        </div>
    )}
}
 
export default ErrorMessage;