import pr from '../../../assets/pr.png'
import {useAuth} from '../../../context/AuthContext'
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/Firebase';

const Head = () => {
    const {currentUser}=useAuth();
    const {displayName,photoURL,uid}=currentUser;

    return ( 
        <div className="chat-head">
        <div className="box-message">
            <h3>{displayName ? displayName:uid}</h3>
            {/* icon-box */}
            <div className="icon-box">
                <div className="img-box">
                    <img src={photoURL ? photoURL: pr} alt="profile"/>
                </div>
                {/* drop-down */}
                <div className="dropdown">
                    <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        &#10247;
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item"
                        onClick={()=>signOut(auth)}
                        >Logout</button></li>
                    </ul>
                </div>
              {/* drop-down */}
            </div>
            {/* icon-box */}
        </div>
    </div>
    );
}
 
export default Head;