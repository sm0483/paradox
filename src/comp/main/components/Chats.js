import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { useChat } from '../../../context/ChatContext';
import { db } from '../../../firebase/Firebase';
import Reciver from './Reciver';
import Sender from './Sender';
import {useAuth} from '../../../context/AuthContext';
import ImageLoad from './ImageLoad';
import { useImage } from '../../../context/ImageContext';

const Chat = () => {
    const [chats,setChats]=useState(null);
    const {state}=useChat();
    const {currentUser}=useAuth();
    const {state:imageState}=useImage();

    useEffect(()=>{
        let unsub=()=>{}
        const getChat=()=>{
            unsub=onSnapshot(doc(db,"chat",state.combId),(doc)=>{
                // console.log(doc.data());
                setChats(doc.data());
            })

        }

        state && state.combId && getChat();

        return()=>{
            unsub();
        }
    },[state.combId])

    return ( 
        <div className="message-box">
            {
                chats && chats.message.map((chat)=>{
                    const {id,message,senderId,type}=chat;
                    if(senderId===currentUser.uid){
                        return(
                            <Sender message={message} type={type} key={id}/>
                        )
                    }else{
                        return(
                            <Reciver message={message} type={type} key={id}/>
                        )
                    }
                  
                })

            }
            {
                imageState.loading && <ImageLoad value={imageState.completed}/>

            }


        </div>
    );
}
 
export default Chat;