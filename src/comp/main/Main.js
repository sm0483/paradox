import pr from '../../assets/login.jpg'
import {BsFillEmojiHeartEyesFill} from 'react-icons/bs'
import {FiSend} from 'react-icons/fi'
import {RiSendToBack} from 'react-icons/ri'
import Head from './components/Head';
import Search from './components/Search';
import { useState } from 'react';
import Result from './components/Result';


const Main = () => {
    const [result,setResult]=useState([]);

    return ( 
        <section className="main">
            <div className="container-fluid main-box">
                {/* contact-box */}
                <div className="contact-box">
                    <div className="box-left">
                        {/* contact-head */}
                         <Search setResult={setResult}/>
                        {/* contact-head */}

                        <div className="contact-list">
                            <div className="contact-detail">
                                {/* Result-search */}
                                <Result result={result}/>
                                {/* Result-search */}
                                {/* single-contact */}
                                <div className="single-contact">
                                    <div className="image-conatiner">
                                        <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */}
                                {/* single-contact */}
                                <div className="single-contact">
                                    <div className="image-conatiner">
                                        <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */} 
                                {/* single-contact */}
                                <div className="single-contact">
                                    <div className="image-conatiner">
                                        <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */}
                                {/* single-contact */}
                                 <div className="single-contact">
                                    <div className="image-conatiner">
                                        <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */}   
                                {/* single-contact */}
                                <div className="single-contact">
                                    <div className="image-conatiner">
                                        <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */}
                                {/* single-contact */}
                                <div className="single-contact">
                                    <div className="image-conatiner">
                                    <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */}
                                {/* single-contact */}
                                <div className="single-contact">
                                    <div className="image-conatiner">
                                        <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */}
                                {/* single-contact */}
                                <div className="single-contact">
                                    <div className="image-conatiner">
                                        <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */}
                                {/* single-contact */}
                                <div className="single-contact">
                                    <div className="image-conatiner">
                                        <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */}
                                {/* single-contact */}
                                <div className="single-contact">
                                    <div className="image-conatiner">
                                        <img src={pr} alt="user face" />
                                    </div>
                                    <div className="text-detail">
                                        <h3 className="name">
                                            Ravi
                                        </h3>
                                        <h4 className="last-message">
                                            how are you?
                                        </h4>
                                    </div>
                                </div>
                                {/* single-contact */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* contact-box */}

                {/* chat-box */}
                <div className="chat-box ">
                    <div className="box-right">
                        {/* chat-head */}
                        <Head/>
                        {/* chat-head */}
                        <div className="message-box">
                            <div className="message sender">
                                <div className="text-container text-sender">
                                    <p>hello world how are you please contact me</p>
                                </div>
                                <div className="message-image sender">
                                    <img src={pr} alt="message" />
                                    <img src={pr} alt="message" />
                                </div>
                            </div>
                            <div className="message reciver">
                                <div className="text-container text-reciver">
                                    <p>hello world how are you please contact me cat fish jelly fish 
                                        crake fih chat pic
                                    </p>
                                </div>
                            </div>
                            <div className="message sender">
                                <div className="text-container text-sender">
                                    <p>hello world how are you please contact me</p>
                                </div>
                                <div className="message-image sender">
                                    <img src={pr} alt="message" />
                                </div>
                            </div>
                            <div className="message reciever">
                                <div className="text-container text-reciver">
                                    <p>hello world how are you please contact me</p>
                                </div>
                                <div className="message-image reciever">
                                    <img src={pr} alt="message" />
                                </div>
                            </div>
                            <div className="message sender">
                                <div className="message-image">
                                    <img src={pr} alt="message" />
                                </div>
                            </div>
                            <div className="message sender">
                                <div className="message-image">
                                    <img src={pr} alt="message" />
                                    <img src={pr} alt="message" />
                                </div>
                            </div>
                            <div className="message sender">
                                <div className="text-container text-sender">
                                    <p>hello world how are you please contact me</p>
                                </div>
                                <div className="message-image">
                                    <img src={pr} alt="message" />
                                    <img src={pr} alt="message" />
                                </div>
                            </div>
                        </div>
                        <div className="message-input-container">
                            <div className="message-input">
                                <i className="message-emoji">
                                    <BsFillEmojiHeartEyesFill/>
                                </i>
                                <div className="text-input">
                                    <input type="text" id='message' placeholder='write you message'/>
                                    <label htmlFor="message">
                                        <FiSend/>
                                    </label>
                                </div>
                                <div className="image-input">
                                    <label htmlFor="image">
                                        <RiSendToBack/>
                                    </label>
                                    <input className='custom-input'  id='image' type="file" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* chat-box */}
            </div>
        </section>
    );
}

export default Main;
