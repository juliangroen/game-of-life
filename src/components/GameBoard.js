import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const GameBoard = () => {
    //const [height, setHeight] = useState(32);
    //const [width, setWidth] = useState(32);
    //const [cellHeight, setCellHeight] = useState(16);
    //const [cellWidth, setCellWidth] = useState(16);
    const height = 32;
    const width = 32;
    const cellHeight = 16;
    const cellWidth = 16;
    const [cellArray, setCellArray] = useState(createCellArray());
    const [isRunning, setIsRunning] = useState(false);

    function createCellArray() {
        const array = [];
        for (let i = 0; i < height; i++) {
            const row = [];
            for (let j = 0; j < width; j++) {
                row.push('0');
            }
            array.push(row);
        }
        return array;
    }

    function changeCellArray(row, cell) {
        const array = [...cellArray];
        if (cellArray[row][cell] === '1') {
            cellArray[row][cell] = '0';
        } else {
            cellArray[row][cell] = '1';
        }
        setCellArray(array);
    }

    function cellularAutomata() {
        //console.log('start', cellArray);
        const array = cellArray.map((row, rowIndex) => {
            return row.map((cell, cellIndex) => {
                const aliveNeighbours = findNeighbours(rowIndex, cellIndex).filter((n) => {
                    const row = n[0];
                    const cell = n[1];
                    return cellArray[row][cell] === '1' && n;
                });
                if (cell === '1') {
                    if (aliveNeighbours.length < 2 || aliveNeighbours.length > 3) {
                        return '0';
                    } else if (aliveNeighbours.length === 2 || aliveNeighbours.length === 3) {
                        return '1';
                    }
                } else {
                    if (aliveNeighbours.length === 3) {
                        return '1';
                    } else {
                        return '0';
                    }
                }
            });
        });
        //console.log('finish', array);
        return array;
    }

    function findNeighbours(row, cell) {
        const neighbours = [];
        if (row - 1 >= 0) {
            neighbours.push([row - 1, cell]);
            if (cell - 1 >= 0) {
                neighbours.push([row - 1, cell - 1]);
            }
            if (cell + 1 <= width - 1) {
                neighbours.push([row - 1, cell + 1]);
            }
        }
        if (row + 1 <= height - 1) {
            neighbours.push([row + 1, cell]);
            if (cell - 1 >= 0) {
                neighbours.push([row + 1, cell - 1]);
            }
            if (cell + 1 <= width - 1) {
                neighbours.push([row + 1, cell + 1]);
            }
        }
        if (cell + 1 <= width - 1) {
            neighbours.push([row, cell + 1]);
        }
        if (cell - 1 >= 0) {
            neighbours.push([row, cell - 1]);
        }
        return neighbours;
    }

    function randomizeCells() {
        const array = cellArray.map((row) => {
            return row.map((cell) => {
                const trigger = Math.floor(Math.random() * 2);
                if (trigger === 1) {
                    return '1';
                } else {
                    return '0';
                }
            });
        });
        return array;
    }

    function toggleGame() {
        setIsRunning(!isRunning);
    }

    useEffect(() => {
        if (isRunning) {
            const timer = setTimeout(() => {
                setCellArray(cellularAutomata());
            }, 200);
            return () => clearTimeout(timer);
        }
    });

    return (
        <div className="flex flex-col" id="game-board">
            <div className="flex flex-row" id="controls">
                <button className="flex-grow bg-green-200 text-2xl p-4" onClick={toggleGame}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
                {!isRunning && (
                    <button className="bg-indigo-200 text-2xl p-4" onClick={() => setCellArray(randomizeCells)}>
                        Randomize
                    </button>
                )}
                {!isRunning && (
                    <button className="bg-pink-200 text-2xl p-4" onClick={() => setCellArray(createCellArray())}>
                        Reset
                    </button>
                )}
            </div>
            <div className="flex flex-col" id="cells">
                {cellArray.map((row, rowIndex) => {
                    return (
                        <div className="row flex flex-row" key={rowIndex}>
                            {row.map((cell, cellIndex) => {
                                return (
                                    <Cell
                                        alive={cell}
                                        height={cellHeight}
                                        width={cellWidth}
                                        key={cellIndex}
                                        pos={[rowIndex, cellIndex]}
                                        onCellClick={changeCellArray}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GameBoard;
