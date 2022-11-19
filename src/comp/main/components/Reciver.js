import Pop from "./Pop-up";
import { useState } from "react";


const Reciver = ({message,type}) => {

    const [pop,setPop]=useState(false);
    const popup=(message)=>{
        setPop(message);
    }

    return(
        <div className="message reciver">
            {
                type==="text" &&
                <div className="text-container text-reciver">
                    <p>{message}</p>
                </div>
            }
    
            {
                type==="image" &&
                <div className="message-image reciver">
                    <img src={message} alt={message} onClick={()=>popup(message)} />
                </div>
    
            }


            {   
                type==="image" && 
                <Pop message={message} pop={pop} setPop={setPop}/>
            
            }
       
        </div>
    );
                
   
}
 
export default Reciver;