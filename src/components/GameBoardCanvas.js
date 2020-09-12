import React, { useState, useEffect, useRef } from 'react';

const GameBoardCanvas = () => {
    const canvasEl = useRef(null);
    const cellSize = 16;

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    function handleResize() {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    }

    function createGrid(height, width, cellSize) {
        const array = [];
        while ((array.length + 1) * cellSize <= height) {
            const row = [];
            while ((row.length + 1) * cellSize <= width) {
                row.push('0');
            }
            array.push(row);
        }
        return array;
    }

    function cellularAutomata(cellArray) {
        //console.log('start', cellArray);
        const array = cellArray.map((row, rowIndex) => {
            return row.map((cell, cellIndex) => {
                const aliveNeighbors = findNeighbors(rowIndex, cellIndex, cellArray).filter((n) => {
                    const row = n[0];
                    const cell = n[1];
                    return cellArray[row][cell] === '1' && n;
                });
                if (cell === '1') {
                    if (aliveNeighbors.length < 2 || aliveNeighbors.length > 3) {
                        return '0';
                    } else if (aliveNeighbors.length === 2 || aliveNeighbors.length === 3) {
                        return '1';
                    }
                } else if (aliveNeighbors.length === 3) {
                    return '1';
                }
                return '0';
            });
        });
        //console.log('finish', array);
        return array;
    }

    function findNeighbors(row, cell, array) {
        const neighbors = [];
        if (row - 1 >= 0) {
            neighbors.push([row - 1, cell]);
            if (cell - 1 >= 0) {
                neighbors.push([row - 1, cell - 1]);
            }
            if (cell + 1 <= array[0].length) {
                neighbors.push([row - 1, cell + 1]);
            }
        }
        if (row + 1 <= array.length) {
            neighbors.push([row + 1, cell]);
            if (cell - 1 >= 0) {
                neighbors.push([row + 1, cell - 1]);
            }
            if (cell + 1 <= array[0].length) {
                neighbors.push([row + 1, cell + 1]);
            }
        }
        if (cell + 1 <= array.length) {
            neighbors.push([row, cell + 1]);
        }
        if (cell - 1 >= 0) {
            neighbors.push([row, cell - 1]);
        }
        return neighbors;
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <div className="bg-black relative">
            {createGrid(dimensions.height, dimensions.width, cellSize).map((row, index) => {
                return row.map((cell, index) => {
                    return <div className="bg-indigo-800 text-gray-200 p-4 m-4">{cell}</div>;
                });
            })}
            <button className="absolute text-2xl text-indigo-400 bg-gray-800 p-4">Width: {dimensions.width}</button>
            <canvas ref={canvasEl} width={dimensions.width} height={dimensions.height}></canvas>
        </div>
    );
};

export default GameBoardCanvas;
