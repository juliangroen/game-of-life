import React from 'react';
import { useState, useEffect } from 'react';

const Cell = ({ alive, height, width }) => {
    const [isAlive, setIsAlive] = useState(false);
    const randomColor = () => {
        const colors = ['blue', 'teal', 'indigo', 'pink', 'green'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        setIsAlive(alive);
    }, [alive]);

    return (
        <div
            className={`${isAlive === true ? `bg-${randomColor()}-400` : 'bg-white'} ${
                isAlive === false ? 'hover:bg-indigo-200' : 'test'
            }`}
            style={{ height: height, width: width }}
            onClick={() => setIsAlive(!isAlive)}
        ></div>
    );
};

export default Cell;
