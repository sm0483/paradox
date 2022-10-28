import detail from '../../assets/login.jpg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useError } from '../../context/ErrorContext';
import {doc, updateDoc} from 'firebase/firestore'
import {useAuth} from '../../context/AuthContext'
import { db } from '../../firebase/Firebase';

const Detail = () => {
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [image,setImage]=useState("");
    const {getError}=useError();
    const {currentUser}=useAuth();

    const handleSkip=()=>{
        navigate('/home');
    }

    const uploadData=async()=>{
        try{
            console.log(currentUser.uid);
            const response=await updateDoc(doc(db,"user",currentUser.uid),{
                uid:currentUser.uid,
                name,
                photoURL:"cat"
            });
            console.log(response);
        }catch(err){
            console.log(err.message)
            getError(err.message);
        }

    }

    const handleSave=async()=>{
        await uploadData();

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
                                    onChange={(e)=>setImage(e.target.value)}
                                    />
                                </div>

                                <div className=" mb-3 single-input img-progress">
                                        <progress value={20} max="100"></progress>
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