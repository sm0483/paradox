import Head from './components/Head';
import Search from './components/Search';
import { useState } from 'react';
import Result from './components/Result';
import Contact from './components/Contact';
import Chat from './components/Chats';
import Input from './components/Input';
import { ContactProvider } from '../../context/ContactContext';
import { ImageProvider } from '../../context/ImageContext';


const Main = () => {
    const [result,setResult]=useState([]);
    const [combId,setCombid]=useState(null);


    return ( 
        <ContactProvider>
            <ImageProvider>   
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
                                        {/* single-contact */}
                                        <Contact setCombid={setCombid}/>
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
                                {/* message-box */}
                                <Chat combId={combId}/>
                                {/* message-box */}

                                <div className="message-input-container">
                                    <Input/>
                                </div>
                            </div>
                        </div>
                        {/* chat-box */}
                    </div>
                </section>
            </ImageProvider>
        </ContactProvider>
    );
}

export default Main;
