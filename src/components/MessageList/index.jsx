import React from 'react';
import Sentiment from 'sentiment'; // Import sentiment analysis library
import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';
import './styles.css';

function MessageList({ roomId }) {
    const containerRef = React.useRef(null);
    const { user } = useAuth();
    const messages = useMessages(roomId);
    const sentiment = new Sentiment(); // Create a sentiment analyzer instance

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    });

    return (
        <div className="message-list-container" ref={containerRef}>
            <ul className="message-list">
                {messages.map((x) => (
                    <Message
                        key={x.id}
                        message={x}
                        isOwnMessage={x.uid === user.uid}
                    />
                ))}
            </ul>
        </div>
    );
}
function Message({ message, isOwnMessage }) {
    const { displayName, text } = message;
    const sentimentEmoji = analyzeSentiment(text); // Get sentiment emoji for the message text

    return (
        <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
            <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
            <div>{text}</div>
            <div className='mood'>mood: {sentimentEmoji}</div>
         {/* Display sentiment emoji */}
        </li>
    );
}

// Function to analyze sentiment of a text and return corresponding emoji
function analyzeSentiment(text) {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
    console.log(sentiment)
    // Map sentiment scores to corresponding emojis
    if (result.score > 0) {
        return '😊'; // Positive sentiment
    } else if (result.score < 0) {
        return '😔'; // Negative sentiment
    } else {
        return '😐'; // Neutral sentiment
    }
}


export { MessageList };
