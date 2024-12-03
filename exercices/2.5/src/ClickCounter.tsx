import { useState } from 'react';

interface ClickCounterProps {
    title: string;
    message: string;
    hoverMessage: string;
}

function ClickCounter({ title, message, hoverMessage }: ClickCounterProps) {
    const [count, setCount] = useState(0);
    const [showHoverMessage, setShowHoverMessage] = useState(false);

    const handleMouseEnter = () => {
        setShowHoverMessage(true);
    };

    const handleMouseLeave = () => {
        setShowHoverMessage(false);
    };

    return (
        <div className="card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h2>{title}</h2>
            {showHoverMessage && <p>{hoverMessage}</p>}
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            {count >= 10 && <p>{message}</p>}
        </div>
    );
}

export default ClickCounter;