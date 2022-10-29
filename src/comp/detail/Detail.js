import detail from '../../assets/login.jpg'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useError } from '../../context/ErrorContext';
import {doc, updateDoc} from 'firebase/firestore'
import {useAuth} from '../../context/AuthContext'
import { auth, db } from '../../firebase/Firebase';
import { storage } from '../../firebase/Firebase';
import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import { useReducer } from 'react';
import { updateProfile } from 'firebase/auth';

const reducer=(state,action)=>{
    switch(action.type){
        case "upload":
            return {...state,
                message:"uploading..",
                progress:action.progress
            };
        case "error":
            return {
                ...state,
                message:action.message,
                err:true,
            };
        default:
            return state;        
    }
}

const Detail = () => {
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [image,setImage]=useState("");
    const {getError}=useError();
    const {currentUser}=useAuth();
    const [imageUrl,setImageUrl]=useState("");
    const imageState={
        progress:0,
        err:false,
        message:""
    }

    const [state,dispatch]=useReducer(reducer,imageState);


    const uploadDataDb=async()=>{
        try{
            console.log(currentUser.uid+"fish");
            await updateDoc(doc(db,"user",currentUser.uid),{
                name,
                photoURL:imageUrl
            });
        }catch(err){
            console.log(err.message)
            getError(err.message);
        }

    }

    const uploadDataAuth=async()=>{
        try{
            await updateProfile(auth.currentUser,{
                displayName:name,
                photoURL:imageUrl
            })
        }catch(err){
            console.log(err.message)
            getError(err.message);
        }
    }

    const handleSave=async(e)=>{
        e.preventDefault();
        try{         
            await uploadDataDb();
            await uploadDataAuth();
            navigate('/home');
        }catch(err){
            getError(err.message)
        }

    }

    const handleSkip=(e)=>{
        e.preventDefault();
        navigate('/home');
    }

    const removeImage=async(e)=>{
        e.preventDefault();
        setImage(null);
        setImageUrl(null);
        dispatch({type:"upload",progress:0})
    }

    


    const updateImage=async(e)=>{
        e.preventDefault();
        console.log(image.name);
        const imageRef=ref(storage,`images/${currentUser.uid+image.name}`);
        const uploadTask = uploadBytesResumable(imageRef,image);

        uploadTask.on('state_changed',
            (snapshot)=>{
                const value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                dispatch({type:"upload",progress:value,})
            },
            (error)=>{
                console.log(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);    
                });
            }
        )
    }



    return ( 
        <section className="detail container-fluid">
            <div className="detail-page row">
                <div className="img-container  bg-danger col-3">
                    <img  src={detail} alt="detail" className='img-fluid' />
                </div>
                <div className="detail-input col-7">
                    <div className="input-container">
                        <div className="input-head ">
                            <h3>Upload Details!</h3>
                        </div>
                        <div className="underline text-center"></div>
                        <div className="cred-container">
                            <form className='form-control'>
                           
                                <div className="mb-3 single-input">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name"
                                    value={name} onChange={(e)=>setName(e.target.value)} 
                                    />
                                </div>

                                <div className="mb-3 single-input">
                                    <label htmlFor="file" className="form-label">Image</label>
                                    <input type="file" className="form-control" id="file"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    onChange={(e)=>setImage(e.target.files[0])}
                                    />
                                </div>

                                <div className=" mb-3  img-progress ">
                                        <progress value={state.progress} max="100"></progress>
                                        <span>
                                            <button
                                            onClick={updateImage}
                                            >&#x2713;</button>
                                            <button
                                            onClick={removeImage}
                                            >&#x2717;</button>
                                        </span>
                                </div>
                                <div className="btn-container">
                                    <button className='btn btn-primary detail-button'
                                    onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button className='btn btn-primary detail-button'
                                    onClick={handleSkip}
                                    >
                                        Skip
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>   
     );
}
 
export default Detail;