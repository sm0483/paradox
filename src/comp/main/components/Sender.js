import pr from '../../../assets/login.jpg'




const Sender = ({message,type}) => {
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
                    <div className="message-image sender">
                        <img src={message} alt="sender" />
                    </div>

                }
           
            </div>
        );
}
 
export default Sender;