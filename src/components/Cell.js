import React from 'react';
import { useState, useEffect } from 'react';

const Cell = ({ alive, height, width, pos, onCellClick }) => {
    const [isAlive, setIsAlive] = useState(alive);
    //const randomColor = () => {
    //    const colors = ['blue', 'teal', 'indigo', 'pink', 'green'];
    //    return colors[Math.floor(Math.random() * colors.length)];
    //};

    function handleClick() {
        const [row, cell] = pos;
        onCellClick(row, cell);
    }

    function handleDrag(e) {
        if (e.buttons === 1) {
            handleClick();
        }
    }

    useEffect(() => {
        setIsAlive(alive);
    }, [alive]);

    return (
        <div
            //className={`${isAlive === '1' ? `bg-${randomColor()}-400` : 'bg-black'} ${
            className={`${isAlive === '1' ? `bg-indigo-400` : 'bg-black'} ${
                isAlive === '0' ? 'hover:bg-indigo-200' : 'test'
            }`}
            style={{ height: height, width: width }}
            onClick={handleClick}
            onMouseOver={(e) => handleDrag(e)}
        ></div>
    );
};

export default Cell;
