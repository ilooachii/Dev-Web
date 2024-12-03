import { useState } from 'react';

interface ClickCounterProps {
    title: string;
    message: string;
}

function ClickCounter({ title, message }: ClickCounterProps) {
    const [count, setCount] = useState(0);

    return (
        <div className="card">
            <h2>{title}</h2>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            {count >= 10 && <p>{message}</p>}
        </div>
    );
}

export default ClickCounter;