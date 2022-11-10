import {FiSend} from 'react-icons/fi'
import {RiSendToBack} from 'react-icons/ri'
import {BsFillEmojiHeartEyesFill} from 'react-icons/bs'
import { useState } from 'react'
import { arrayUnion, doc, Timestamp, updateDoc ,serverTimestamp} from 'firebase/firestore'
import { db } from '../../../firebase/Firebase'
import {useAuth} from '../../../context/AuthContext'
import { useChat } from '../../../context/ChatContext'
import { v4 as uuidv4 } from 'uuid';
import { useContact } from '../../../context/ContactContext'


const Input = () => {
    const [text,setText]=useState("");
    const [image,setImage]=useState(null);
    const {currentUser}=useAuth()
    const {state}=useChat();
    const {state:contactState,value}=useContact();
    //create chat and union them

    const setupMessage=async(message,type)=>{
        return {
            message:arrayUnion({
                id:uuidv4(),
                message,
                senderId:currentUser.uid,
                type,
                time:Timestamp.now()
            })
        }
    }


    const updateMessage=async(contactState)=>{
        try{ 
            const response=await updateDoc(doc(db,"chatUser",contactState.sender),{
                [state.combId+".lastMessage"]:text,
                [state.combId+".date"]:serverTimestamp()
            })

            const res=await updateDoc(doc(db,"chatUser",contactState.reciver),{
                [state.combId+".lastMessage"]:text,
                [state.combId+".date"]:serverTimestamp()
            })
        }catch(err){
            console.log(err.message);
        }
    }



    const sendImage=async()=>{
        //save image
        //update link in message
    }

    const sendText=async(state,contactState)=>{
        //save text
        try{
            const messageStruct=await setupMessage(text,"text");
            console.log(messageStruct);
            console.log(state.combId);
            const response=await updateDoc(doc(db,"chat",state.combId),messageStruct);
            await updateMessage(contactState);
            setText("");
        }catch(err){
            console.log(err);
        }
    }

    const sendMessage=(type,state,contactState)=>{
        console.log(currentUser.uid,state,"cat fish");
        switch(type){
            case "text":
                sendText(state,contactState);
            case "image":
                sendImage();    
        }
    }

        return (
            <div className="message-input">
                <i className="message-emoji">
                    <BsFillEmojiHeartEyesFill/>
                </i>
                <div className="text-input">
                    <input type="text" id='message' placeholder='write you message'
                    value={text} 
                    onChange={(e)=>setText(e.target.value)}/>
                    <label>
                        <FiSend onClick={()=>sendMessage("text",state,contactState)}/>
                    </label>
                </div>
                <div className="image-input">
                    <label htmlFor="image">
                        <RiSendToBack onClick={()=>sendMessage("image",state,contactState)}/>
                    </label>
                    <input className='custom-input'  id='image' type="file" 
                    onChange={(e)=>setImage(e.target.files[0])} />
                </div>
            </div>
        );
}
 
export default Input;