import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { setDoc,doc, getDoc } from 'firebase/firestore';
import {FcGoogle} from 'react-icons/fc'
import {TfiTwitter} from 'react-icons/tfi'
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/Firebase';
import { useError } from '../../../context/ErrorContext';
import { auth } from '../../../firebase/Firebase';




const Oauth2 = () => {

    const navigate=useNavigate();
    const {dispatch,} =useError();

    const checkUserInChat=async(currentUser)=>{
        try{
            const response=await getDoc(doc(db,"chatUser",currentUser.uid))
            if(response.exists()){
                return true;
            }
            return false;
        }catch(err){
            dispatch({type:"UPDATE",message:err.message})
            console.log(err)
        }
    }

    const createContactList=async(currentUser)=>{
        try{
            const check=await checkUserInChat(currentUser);
            if(check){
                return;
            }
            console.log("gelly fish");
            await setDoc(doc(db,"chatUser",currentUser.uid),{});
        }catch(err){
            dispatch({type:"UPDATE",message:err.message})
            
        }

    }



    const checkTheUser=async(currentUser)=>{
        try{
            const response=await getDoc(doc(db,"user",currentUser.uid));
            if(response.exists()){
                return true;
            }
            return false;
        }catch(err){
            dispatch({type:"UPDATE",message:err.message})

        }
    }



    const saveUser=async(currentUser)=>{
        try{
            const check=await checkTheUser(currentUser);
            if(check) return;
            let photoURL=null;
            let displayName="unknown";
            if(currentUser.photoURL){
                photoURL=currentUser.photoURL;
            }

            if(currentUser.displayName){
                displayName=currentUser.displayName.toLowerCase();
            }
            await setDoc(doc(db,"user",currentUser.uid),{
                uid:currentUser.uid,
                email:currentUser.email,
                name:displayName,
                photoURL
            });
        }catch(err){
            console.log(err.message);
            dispatch({type:"UPDATE",message:err.message})

        }
    }


    const provider=new GoogleAuthProvider();
    const popupLogin=async()=>{
        try{
            const response=await signInWithPopup(auth,provider);
            await saveUser(response.user);
            console.log(response.user.uid);
            await createContactList(response.user);
            navigate('/home')
        }catch(err){
            console.log(err.message);
            dispatch({type:"UPDATE",message:err.message});

        }
    }

    return ( 
    <div className="input-head ">
        <h3>Sign in to Paradox</h3>
        <div className="button-container">
            <button className="btn btn-google"
            onClick={popupLogin}
            >
                <span className='btnIcon'><FcGoogle/></span>
                <span className='btnText'>Sign in with Google</span>
            </button>
            <button className=" btn btn-twitter">
                <TfiTwitter/>
            </button>
        </div>
    </div>
    );
}
 
export default Oauth2;