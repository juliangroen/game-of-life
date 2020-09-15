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
    const [isDrawing, setIsDrawing] = useState(false);

    function handleResize(event) {
        //console.log(event.type);
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        });
        setDimensions((dimState) => {
            console.log(dimState);
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
                    const rand = Math.floor(Math.random() * 4);
                    if (rand < 3) {
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
                if (array[rowIndex]) {
                    if (array[rowIndex][cellIndex]) {
                        array[rowIndex][cellIndex] = cell;
                    }
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

    function toggleTargetCell(x, y, bool) {
        if (x >= 0 && x <= dimensions.width && y >= 0 && y <= dimensions.height) {
            const row = Math.floor(y / cellSize);
            const col = Math.floor(x / cellSize);
            setGrid(changeGridCell(row, col, bool));
        }
    }

    function handleMouseEvent(event) {
        const touch = event.touches ? event.touches[0] : false;
        const clientX = touch ? touch.clientX : event.clientX;
        const clientY = touch ? touch.clientY : event.clientY;
        if (event.type === 'click') {
            toggleTargetCell(clientX, clientY, true);
        } else if (event.type === 'mousemove' || event.type === 'touchmove') {
            if (isDrawing) {
                toggleTargetCell(clientX, clientY, true);
            }
        } else if (event.type === 'mousedown' || event.type === 'touchstart') {
            setIsDrawing(true);
        } else if (event.type === 'mouseup' || event.type === 'touchend') {
            setIsDrawing(false);
        }
    }

    function changeGridCell(rowIndex, cellIndex, bool) {
        const array = [...grid];
        if (bool) {
            array[rowIndex][cellIndex] = '1';
        } else {
            array[rowIndex][cellIndex] = '0';
        }
        return array;
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
            setGridShot(grid);
        }, 200);
        drawGrid(grid, canvasEl, cellSize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    });

    return (
        <div className="bg-black relative">
            <div className="absolute bottom-0 left-0 right-0 flex flex-row mx-auto w-full md:w-4/6 lg:w-3/6 xl:w-2/5 p-4">
                <button
                    className={`flex-grow bg-black border-2 ${
                        isRunning ? 'border-pink-400 text-pink-400' : 'border-indigo-400 text-indigo-400'
                    } rounded text-xl font-bold p-4 mr-4`}
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? 'Stop' : 'Start'}
                </button>
                {!isRunning && (
                    <button
                        className="bg-black border-2 border-gray-600 rounded text-xl text-gray-600 font-bold p-4 mr-4"
                        onClick={() => setGrid(createGrid(true, dimensions.height, dimensions.width, cellSize))}
                    >
                        Randomize
                    </button>
                )}
                {!isRunning && (
                    <button
                        className="bg-black border-2 border-indigo-600 rounded text-xl text-indigo-600 font-bold p-4"
                        onClick={() => setGrid(createGrid(false, dimensions.height, dimensions.width, cellSize))}
                    >
                        Clear
                    </button>
                )}
            </div>
            <canvas
                ref={canvasEl}
                width={dimensions.width}
                height={dimensions.height}
                onMouseDown={handleMouseEvent}
                onMouseUp={handleMouseEvent}
                onMouseMove={handleMouseEvent}
                //onTouchStart={handleMouseEvent}
                //onTouchEnd={handleMouseEvent}
                //onTouchMove={handleMouseEvent}
                onClick={handleMouseEvent}
            ></canvas>
        </div>
    );
};

export default GameBoardCanvas;
