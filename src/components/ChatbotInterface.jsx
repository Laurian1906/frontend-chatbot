import React, {useState} from "react";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

function ChatbotInterface() {

    async function fetchData(){

        try{
            const getMessages = () => axios.get('http://127.0.0.1:8000/chat');
            const [messages] = await Promise.all([getMessages()]); 
            console.log(messages);
        }
        catch(error){
            console.error("Error fetching data: ", error);
        }

    }

    fetchData();   

    return (
        <div className="interface-container">
            <div className="textbox-container">
                <p className="placeholder-text">Just ask!</p>
                <div className="chatbox-container">
                    <span className="message-user"></span>
                    {/* <span className="message-ai">{model_response}</span> */}
                </div>
                <div className="input-container">
                <input className="insert-message" type="text" placeholder="Insert message here"></input>
                <IconButton color="primary">
                    <SendIcon style={{fill: '#ffffff'}}/>
                </IconButton>
            </div>
            </div>

        </div>
    );
}

export default ChatbotInterface;