import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from "../firebase/Firebase";

const AuthContext=new React.createContext();

const AuthProvider=({children})=>{

    const [currentUser,setCurrentUser]=useState({});

    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,(user)=>{
            console.log(user);
            setCurrentUser(user);
        })

        return ()=>{
            unsub();
        }
    },[])



    return (

        <AuthContext.Provider
        value={{
            currentUser,
        }}
        >
            {children}
        </AuthContext.Provider>
        
        )
}


const useAuth=()=>{
    return useContext(AuthContext);
}


export {AuthProvider,AuthContext,useAuth}