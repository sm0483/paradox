import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import pr from '../../../assets/login.jpg'
import { useAuth } from '../../../context/AuthContext';
import { useChat } from '../../../context/ChatContext';
import { useContact } from '../../../context/ContactContext';
import { auth, db } from '../../../firebase/Firebase';

const Contact = ({setCombid}) => {
    const {currentUser}=useAuth();
    const [contactList,setContactList]=useState({});
    const {dispatch}=useChat();
    const [selectedId,setSelectedId]=useState(null);
    const {dispatch:conact,state}=useContact();
    useEffect(()=>{
        let unsub=()=>{};
        const getData=()=>{
            unsub=onSnapshot(doc(db,"chatUser",currentUser.uid),(doc)=>{
                setContactList(doc.data());
            })
        }

        currentUser.uid && getData();
        return ()=>{
            unsub();
        }
    },[currentUser.uid])

    const setupChatId=(combId,uid)=>{
        dispatch({type:"upload",combId:combId});
        setCombid(combId);
        setSelectedId(combId);
        conact({type:"change_user",sender:currentUser.uid,reciver:uid,combId:combId});
    }


    if(contactList &&  Object.keys(contactList)!==0){

        return (
            Object.entries(contactList).map(([key,value])=>{
                if(value && Object.keys(value).length!==0){
                    const {name,photoURL,uid,}=value.userInfo;
                    let timeString=undefined;
                    if(value.date){
                        timeString=value.date.toDate().toLocaleTimeString();
                    }
                    return(
                        <div className={`single-contact ${key===selectedId && "click"}`} key={key} onClick={()=>setupChatId(key,uid)}>
                        <div className="image-conatiner">
                            <img src={photoURL ? photoURL:pr} alt="user face" />
                        </div>
                        <div className="text-detail">
                            <h3 className="name">
                                {name}
                            </h3>
                            <h4 className="last-message">
                                { (value && value.lastMessage) ? value.lastMessage :"No Message"}
                            </h4>
                        </div>
                        <div className="date"> 
                            <h4>{ timeString && (timeString.substring(0,4)+" "+timeString.substring(8,10))}</h4>
                        </div>
                    </div>
                    )
                }
            })
          
        );
    }
}
 
export default Contact;