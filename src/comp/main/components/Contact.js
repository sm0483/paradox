import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import pr from '../../../assets/login.jpg'
import { useAuth } from '../../../context/AuthContext';
import { useChat } from '../../../context/ChatContext';
import { auth, db } from '../../../firebase/Firebase';

const Contact = ({setCombid}) => {
    const {currentUser}=useAuth();
    const [contactList,setContactList]=useState({});
    const {dispatch}=useChat();

    useEffect(()=>{
        let unsub=()=>{};
        const getData=()=>{
            console.log("cat ifhs");
            unsub=onSnapshot(doc(db,"chatUser",currentUser.uid),(doc)=>{
                console.log(doc.data());
                setContactList(doc.data());
            })
        }

        currentUser.uid && getData();
        return ()=>{
            unsub();
        }
    },[currentUser.uid])

    const setupChatId=(combId)=>{
        dispatch({type:"upload",combId:combId});
        setCombid(combId)
    }


    if(contactList &&  Object.keys(contactList)!==0){

        return (
            Object.entries(contactList).map(([key,value])=>{
                if(value && Object.keys(value).length!==0){
                    const {name,photoURL,uid}=value.userInfo;
                    return(
                        <div className="single-contact" key={key} onClick={()=>setupChatId(key)}>
                        <div className="image-conatiner">
                            <img src={photoURL ? photoURL:pr} alt="user face" />
                        </div>
                        <div className="text-detail">
                            <h3 className="name">
                                {name}
                            </h3>
                            <h4 className="last-message">
                                how are you?
                            </h4>
                        </div>
                    </div>
                    )
                }
            })
          
        );
    }
}
 
export default Contact;