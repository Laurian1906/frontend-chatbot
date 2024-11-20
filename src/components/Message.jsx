import React, { useEffect, useRef } from 'react';
import '../styles/Message.css';

function Message({ message }) {
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]);

    let messageHistory = [];
    for (let j = 0; j < message.length; j++) {
        const isLastMessage =
            (j === message.length - 1 && (message[j].role === "model" || message[j].role === "user"));

        messageHistory.push(
            <div
                key={j}
                ref={isLastMessage ? lastMessageRef : null}
                className={message[j].role === "user" ? "message-user" : "message-ai"}
                dangerouslySetInnerHTML={message[j].role === "model" ? {__html:message[j].model_rsp} :{__html:message[j].usr_msg}}
            >
                {/* {message[j].role === "user" ? message[j].usr_msg : message[j].model_rsp} */}

            </div>
        );
    }

    return (
        <>
            {messageHistory.length > 0 ? messageHistory : <div style={{textAlign:"center"}}>Ask anything you want!</div>}
        </>
    );
}

export default Message;
