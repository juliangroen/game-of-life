import React, { useState, useEffect, useRef } from 'react';

const GameBoardCanvas = () => {
    const canvasEl = useRef(null);
    const cellSize = 16;

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    const [grid, setGrid] = useState(createGrid(false, dimensions.height, dimensions.width, cellSize));
    const [gridShot, setGridShot] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    function handleResize() {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });
        setDimensions((dimState) => {
            setGrid(createGrid(false, dimState.height, dimState.width, cellSize));
            setGrid((gridState) => {
                setGrid(mergeGridShot(gridShot, gridState));
                return gridState;
            });
            return dimState;
        });
    }

    function createGrid(randomize, height, width, cSize) {
        const array = [];
        while ((array.length + 1) * cSize <= height) {
            const row = [];
            while ((row.length + 1) * cSize <= width) {
                if (randomize) {
                    const rand = Math.floor(Math.random() * 2);
                    if (rand === 0) {
                        row.push('0');
                    } else {
                        row.push('1');
                    }
                } else {
                    row.push('0');
                }
            }
            array.push(row);
        }
        return array;
    }

    function mergeGridShot(shot, grid) {
        const array = [...grid];
        shot.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (array[rowIndex][cellIndex]) {
                    array[rowIndex][cellIndex] = cell;
                }
            });
        });
        return array;
    }

    function drawGrid(array, canvas, cellSize) {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        array.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const x = cellIndex * cellSize;
                const y = rowIndex * cellSize;
                if (cell === '1') {
                    ctx.fillStyle = 'slateblue';
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
            });
        });
    }

    function cellularAutomata(cellArray) {
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
        return array;
    }

    function findNeighbors(row, cell, array) {
        const neighbors = [];
        if (row - 1 >= 0) {
            neighbors.push([row - 1, cell]);
            if (cell - 1 >= 0) {
                neighbors.push([row - 1, cell - 1]);
            }
            if (cell + 1 <= array[row].length - 1) {
                neighbors.push([row - 1, cell + 1]);
            }
        }
        if (row + 1 <= array.length - 1) {
            neighbors.push([row + 1, cell]);
            if (cell - 1 >= 0) {
                neighbors.push([row + 1, cell - 1]);
            }
            if (cell + 1 <= array[row].length - 1) {
                neighbors.push([row + 1, cell + 1]);
            }
        }
        if (cell + 1 <= array[row].length - 1) {
            neighbors.push([row, cell + 1]);
        }
        if (cell - 1 >= 0) {
            neighbors.push([row, cell - 1]);
        }
        return neighbors;
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        const timer = setTimeout(() => {
            isRunning && setGrid(cellularAutomata(grid));
            isRunning && setGridShot(grid);
        }, 200);

        drawGrid(grid, canvasEl, cellSize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    });

    return (
        <div className="bg-black relative">
            <button
                className="absolute top-0 left-0 text-indigo-400 bg-gray-800 p-4"
                onClick={() => setGrid(createGrid(true, dimensions.height, dimensions.width, cellSize))}
            >
                Width: {dimensions.width} | Grid: {grid.length} x {grid[0].length}
            </button>
            <button className="absolute top-0 right-0 text-indigo-400 bg-gray-800 p-4" onClick={() => setIsRunning(true)}>
                Automata
            </button>
            <canvas ref={canvasEl} width={dimensions.width} height={dimensions.height}></canvas>
        </div>
    );
};

export default GameBoardCanvas;
