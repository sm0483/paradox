import pr from '../../../assets/login.jpg'


{/* <div className="message-image">
<progress value={20} max={100} />
</div> */}

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
                        <img src={pr} alt="message" />
                        <img src={pr} alt="message" />
                    </div>

                }
           
            </div>
        );
}
 
export default Sender;