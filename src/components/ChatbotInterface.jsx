import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

function ChatbotInterface() {

    const [userMessage, setUserMessage] = useState([""]);
    const [modelResponse, setModelResponse] = useState([""]);
    const [chatHistory, setChatHistory] = useState([]);
    const [userMessageAPI, setUserMessageAPI] = useState([""]);
    const [selectedModel, setSelectedModel] = useState("");

    async function fetchData() {

        try {
            const getMessages = () => axios.get(`http://127.0.0.1:8000/${selectedModel}`, {
                params: { user_message: userMessageAPI }
            });
            const [messages] = await Promise.all([getMessages()]);

            setUserMessage(messages.data.user);
            setModelResponse(messages.data.model);

            setChatHistory((prevHistory) => [
                ...prevHistory,
                { role: "model", model_rsp: messages.data.model }
            ]);

        }
        catch (error) {
            console.error("Error fetching data: ", error);
        }

    }

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    }

    const handleSendMessage = () => {
        if (userMessageAPI.trim() !== "") {
            setUserMessage(userMessageAPI);
            setModelResponse("Loading message...");
            fetchData();
            setUserMessageAPI("");
        }

        setChatHistory((prevHistory) => [
            ...prevHistory,
            { role: "user", usr_msg: userMessageAPI }
        ]);


    };

    useEffect(() => {
        console.log("Chat history updated:", chatHistory);
    }, [chatHistory]);

    return (
        <div className="interface-container">
            <div className="selectModel">
                <label className="label" htmlFor="modelSelect"> Model: </label>
                <select
                    id="modelSelect"
                    value={selectedModel}
                    onChange={handleModelChange}>
                    <option value="gemini">Gemini</option>
                    <option value="openai">OpenAi</option>
                </select>
            </div>
            <div className="textbox-container">

                <p className="placeholder-text">{userMessage !== "" ? "Just ask!" : ''}</p>
                <div className="chatbox-container">
                    <span className="message-user">{userMessage}</span>
                    <span className="message-ai">{modelResponse}</span>
                </div>
                <div className="input-container">
                    <input
                        className="insert-message"
                        type="text"
                        placeholder="Insert message here"
                        value={userMessageAPI}
                        onChange={(e) => setUserMessageAPI(e.target.value)}></input>
                    <IconButton color="primary" onClick={handleSendMessage}>
                        <SendIcon style={{ fill: '#ffffff' }} />
                    </IconButton>
                </div>
            </div>

        </div>
    );
}

export default ChatbotInterface;