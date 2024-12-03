import { useState } from 'react';
import './Box.css';

const ColorBox = () => {
    const colors = ['red', 'green', 'blue', 'yellow', 'violet'];
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    const changeColor = () => {
        setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    };

    const currentColor = colors[currentColorIndex];

    return (
        <div className="container">
            <div className="box" style={{ backgroundColor: currentColor }}>
                <button onClick={changeColor}>{colors[(currentColorIndex + 1) % colors.length]}</button>
                <p>{currentColor}</p>
            </div>
        </div>
    );
};

export default ColorBox;
