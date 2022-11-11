import pr from '../../../assets/login.jpg'



const Reciver = ({message,type}) => {

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
                    <img src={message} alt={message} />
                </div>
    
            }
       
        </div>
    );
    
   
}
 
export default Reciver;