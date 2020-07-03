import React from 'react';
import './css/Message.css';
import Avatar from '../images/02.png';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
        ? (
            <div className="messageContainer">
                <div className="identifier">
                    <img className="avatar" src={Avatar} />
                    <p className="sentText">{user}</p>
                </div>
                <div className="messageBox">
                    <p className="messageText">{ ReactEmoji.emojify(text) }</p>
                </div>
            </div>
        )
        : (
            <div className="recievingMessageContainer">
                <div className="identifier">
                    <img className="avatar" src={Avatar} />
                    <p className="sentText">{user}</p>
                </div>
                <div className="messageBox">
                    <p className="messageText">{ ReactEmoji.emojify(text) }</p>
                </div>
            </div>
        )
    )
}

export default Message;