import React, { useState } from "react";
import Message from "./Message";
import '../styles/ChatbotInterface.css';

import IconButton from '@mui/material/IconButton';
// import FileInput from "./FileInput";
import SendIcon from '@mui/icons-material/Send';

import axios from "axios";


function ChatbotInterface() {

    const [userMessage, setUserMessage] = useState([""]);
    // const [modelResponse, setModelResponse] = useState([""]);
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedModel, setSelectedModel] = useState("openai");
    

    async function fetchData() {
        try {
            const getMessages = () => axios.get(`http://127.0.0.1:8000/${selectedModel}`, {
                params: { user_message: userMessage }
            });
            
            const [messages] = await Promise.all([getMessages()]);
            
            // if(messages.status != 200){
                
            // }

            setChatHistory((prevHistory) => [
                ...prevHistory,
                { role: "model", model_rsp: messages.data.model || "There was a system error, please try again later!" }
            ]);

        }
        catch (error) {
            console.error("Error fetching data: ", error);
        }

    }

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && userMessage.trim() !== "") {
            handleSendMessage();
            event.preventDefault();
        }
    }

    const handleSendMessage = () => {

        if (userMessage.trim() !== "") {
            fetchData();
            setUserMessage("");
        }else{
            console.log("Type a message bro!");
        }

        setChatHistory((prevHistory) => [
            ...prevHistory,
            { role: "user", usr_msg: userMessage }
        ]);
    };

    return (
        <div className="interface-container">
            <div className="navbar">
                <div className="selectModel">
                    <label className="label" htmlFor="modelSelect"> Model: </label>
                    <select
                        id="modelSelect"
                        value={selectedModel}
                        onChange={handleModelChange}>
                        <option value="openai">OpenAi</option>
                        <option value="gemini">Gemini</option>
                    </select>
                </div>
                {/* <div className="uploadDocument">
                    <FileInput/>
                </div> */}
            </div>
            <div className="textbox-container">

                <p className="placeholder-text"></p>
                <div className="chatbox-container">
                    <Message message={chatHistory}/>
                </div>
                <div className="input-container">
                    <input
                        className="insert-message"
                        type="text"
                        placeholder="Insert message here"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)} 
                        onKeyDown={handleKeyDown}></input>
                    <IconButton color="primary" onClick={handleSendMessage} disabled={userMessage === ""}>
                        <SendIcon style={{ fill: '#ffffff' }} />
                    </IconButton>
                </div>
            </div>

        </div>
    );
}

export default ChatbotInterface;