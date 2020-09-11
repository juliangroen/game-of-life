import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const GameBoard = () => {
    const [height, setHeight] = useState(16);
    const [width, setWidth] = useState(16);
    const [cellHeight, setCellHeight] = useState(32);
    const [cellWidth, setCellWidth] = useState(32);
    const [cellArray, setCellArray] = useState(createCellArray());
    const [isRunning, setIsRunning] = useState(false);

    function createCellArray() {
        const array = [];
        for (let i = 0; i < height; i++) {
            const row = [];
            for (let j = 0; j < width; j++) {
                row.push(false);
            }
            array.push(row);
        }
        return array;
    }

    const randomizeCells = () => {
        const array = cellArray.map((row) => {
            return row.map((cell) => {
                const trigger = Math.floor(Math.random() * 2);
                if (trigger === 1) {
                    return true;
                } else {
                    return false;
                }
            });
        });
        return array;
        //setCellArray(array);
    };

    const toggleGame = () => {
        setIsRunning(!isRunning);
    };

    useEffect(() => {
        console.log(isRunning);
        if (isRunning) {
            const timer = setTimeout(() => {
                setCellArray(randomizeCells());
            }, 500);
            return () => clearTimeout(timer);
        }
    });

    return (
        <div id="game-board">
            <button className="bg-indigo-200 text-2xl p-4" onClick={toggleGame}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            {!isRunning && (
                <button className="bg-pink-200 text-2xl p-4" onClick={() => setCellArray(createCellArray())}>
                    Reset
                </button>
            )}
            {cellArray.map((row, index) => {
                return (
                    <div className="flex flex-row" key={index}>
                        {row.map((cell, index) => {
                            return <Cell alive={cell} height={cellHeight} width={cellWidth} key={index} />;
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default GameBoard;
