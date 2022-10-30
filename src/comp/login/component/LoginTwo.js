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
    const {getError} =useError();

    const checkUserInChat=async(currentUser)=>{
        try{
            const response=await getDoc(doc(db,"chatUser",currentUser.uid))
            if(response.exists()){
                return true;
            }
            return false;
        }catch(err){
            getError(err.message);
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
            getError(err.message);
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
            getError(err.message);
            navigate('/error');
        }
    }



    const saveUser=async(currentUser)=>{
        try{
            const check=await checkTheUser(currentUser);
            if(check) return;
            console.log(currentUser.uid+"cat fish");
            await setDoc(doc(db,"user",currentUser.uid),{
                uid:currentUser.uid,
                email:currentUser.email,
                name:currentUser.displayName,
                photoURL:currentUser.photoURL
            });
        }catch(err){
            console.log(err.message);
            getError(err.message);
            navigate('/error');
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
            getError(err.message);
            navigate('/error');
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