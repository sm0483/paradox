import {FiSend} from 'react-icons/fi'
import {RiSendToBack} from 'react-icons/ri'
import {AiOutlineUpload} from 'react-icons/ai'
import { useState } from 'react'
import { arrayUnion, doc, Timestamp, updateDoc ,serverTimestamp} from 'firebase/firestore'
import { db } from '../../../firebase/Firebase'
import {useAuth} from '../../../context/AuthContext'
import { useChat } from '../../../context/ChatContext'
import { v4 as uuidv4 } from 'uuid';
import { useContact } from '../../../context/ContactContext'
import { useImage } from '../../../context/ImageContext'
import { ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {storage} from '../../../firebase/Firebase';


const Input = () => {
    const [text,setText]=useState("");
    const [image,setImage]=useState(null);
    const {currentUser}=useAuth()
    const {state}=useChat();
    const {state:contactState,value}=useContact();
    const {dispatch}=useImage();
    const [imageUrl,setImageUrl]=useState(null);

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

    const updateImage=()=>{
        const imageRef=ref(storage,`images/${Date.now()}`);
        const uploadTask = uploadBytesResumable(imageRef,image);

        uploadTask.on('state_changed',
            (snapshot)=>{
                const value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                dispatch({type:"upload",value})
            },
            (error)=>{
                console.log(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                    const saveMessage=async()=>{
                        const messageStruct=await setupMessage(downloadURL,"image");
                        const response=await updateDoc(doc(db,"chat",state.combId),messageStruct);
                    }
                    saveMessage()
                    .then(()=>{
                        dispatch({type:"done"});
                    })
                    .catch((err)=>{
                        console.log(err.message);
                        dispatch({type:"error"})
                    })  
                });
            }
        )

    }



    const sendImage=async()=>{
        try{
            updateImage();
                   
        }catch(err){
            console.log(err);
        }

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

    const sendMessage=(type,state,contactState,e)=>{
        console.log(currentUser.uid,state,"cat fish");
        switch(type){
            case "text":
                sendText(state,contactState);
            case "image":
                sendImage(state,contactState);    
        }
    }

        return (
            <div className="message-input">
                <div className="image-input">
                    <label htmlFor="image">
                        <AiOutlineUpload/>
                    </label>
                    <label >
                        <RiSendToBack onClick={(e)=>sendMessage("image",state,contactState,e)}/>
                    </label>
                    <input className='custom-input'  id='image' type="file" 
                    onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="text-input">
                    <input type="text" id='message' placeholder='write you message'
                    value={text} 
                    onChange={(e)=>setText(e.target.value)}/>
                    <label>
                        <FiSend onClick={(e)=>sendMessage("text",state,contactState,e)}/>
                    </label>
                </div>
                
            </div>
        );
}
 
export default Input;