import React, { useState, useEffect, useRef } from 'react';

const GameBoardCanvas = () => {
    const canvasEl = useRef(null);
    const cellSize = 16;
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    const [cellArray, setCellArray] = useState(createGrid(dimensions.height, dimensions.width, cellSize));

    function handleResize() {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });
        setCellArray(createGrid(dimensions.height, dimensions.width, cellSize));
    }

    function setCanvas() {
        const canvas = canvasEl.current;
        const ctx = canvas.getContext('2d');
        canvas.height = dimensions.height;
        canvas.width = dimensions.width;
        //ctx.fillStyle = 'black';
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        //setCellArray(createGrid(canvas.height, canvas.width));
        cellArray.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const x = cellIndex * cellSize;
                const y = rowIndex * cellSize;
                if (cell === '1') {
                    ctx.fillStyle = 'slateblue';
                } else {
                    ctx.fillStyle = 'black';
                }
                ctx.fillRect(x, y, cellSize, cellSize);
            });
        });
    }

    // create a grid that fits the viewport
    function createGrid(height, width, size) {
        const cols = Math.floor(width / size);
        const rows = Math.floor(height / size);
        const array = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                if (Math.floor(Math.random() * 2) === 0) {
                    row.push('0');
                } else {
                    row.push('1');
                }
            }
            array.push(row);
        }
        return array;
    }

    function cellularAutomata() {
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
                } else {
                    if (aliveNeighbors.length === 3) {
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
        setCanvas();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <div className="relative">
            <button
                className="absolute text-2xl text-indigo-400 bg-gray-800 p-4"
                //onClick={() => setCellArray(createGrid(dimensions.height, dimensions.width, cellSize))}
                onClick={() => setCellArray(cellularAutomata())}
            >
                Test
            </button>
            <canvas ref={canvasEl}></canvas>
        </div>
    );
};

export default GameBoardCanvas;
