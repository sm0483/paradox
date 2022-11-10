import profile from '../../../assets/pr.png'
import {db} from '../../../firebase/Firebase'
import {doc,serverTimestamp,updateDoc,setDoc,getDoc} from 'firebase/firestore'
import {useAuth} from '../../../context/AuthContext';
import { useError } from '../../../context/ErrorContext';
import { useState } from 'react';


const Result = ({result}) => {
    const {currentUser}=useAuth();
    const {getError} =useError();
    const [remove,setRemove]=useState(false);

    const createContact=async(reciverData)=>{
        let combId=undefined;
        const {name,photoURL,uid:reciverId}=reciverData;
        if(currentUser.uid>reciverId){
            combId=currentUser.uid+reciverId;
        }else{
            combId=reciverId+currentUser.uid
        }
        try{


            const chatRef=doc(db,"chat",combId);
            const res=await getDoc(chatRef);
            if(!res.exists()){
                await setDoc(chatRef,{message:[]});
            }

            await updateDoc(doc(db,"chatUser",currentUser.uid),{
                [combId+".userInfo"]:{
                    name,
                    uid:reciverId,
                    photoURL,
                },
                [combId+".date"]:serverTimestamp(),
                [combId+".lastMessage"]:""

            });
            await updateDoc(doc(db,"chatUser",reciverId),{
                [combId+".userInfo"]:{
                    name:currentUser.displayName,
                    uid:currentUser.uid,
                    photoURL:currentUser.photoURL,
                    lastMessage:""
                },
                [combId+".date"]:serverTimestamp(),
                [combId+".lastMessage"]:""

            });
            setRemove(!remove);
        }catch(err){
            console.log(err.message);
            getError(err.message);
        }
    }
    if(result.length!==0 && !remove){
        return(
            result.map((data)=>{
                const {name,photoURL,uid}=data;
                console.log(data);
                return ( 
                    <div className="single-contact" key={uid} onClick={()=>createContact(data)}>
                        <div className="image-conatiner">
                            <img src={photoURL ? photoURL :profile} alt="user face" />
                        </div>
                        <div className="text-detail">
                            <h3 className="name">
                                {name}
                            </h3>
                            <h4 className="last-message">
                                Search result
                            </h4>
                        </div>
                    </div>
                );
            })
        )
    }
}
 
export default Result;