import { useState } from 'react';
import Pop from './Pop-up';




const Sender = ({message,type}) => {
    const [pop,setPop]=useState(false);
    const popup=(message)=>{
        setPop(message);
    }

        return(
            <div className="message sender">
                {
                    type==="text" &&
                    <div className="text-container text-sender">
                        <p>{message}</p>
                    </div>
                }

                {
                    type==="image" &&
                    <div className="message-image sender" >
                        <img src={message} alt="sender"  onClick={()=>popup(message)}/>
                    </div>

                }

                {   
                    type==="image" && 
                    <Pop message={message} pop={pop} setPop={setPop}/>
                
                }
            </div>
        );
}
 
export default Sender;