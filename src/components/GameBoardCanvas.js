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
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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
        //function findSize(num = 16, endflag = false) {
        //    console.log('start', num, endflag);
        //    if (num === 32 && endflag === true) {
        //        throw Error;
        //    }
        //    if (num === 32) {
        //        findSize(8, true);
        //    } else if (height % num <= 4 && width % num <= 4) {
        //        //} else if (height / num && width % num <= 4) {
        //        console.log('success', num);
        //        return num;
        //    } else if (endflag === false) {
        //        findSize(num + 1);
        //    } else {
        //        findSize(num + 1, true);
        //    }
        //}
        //findSize();
        const cols = Math.floor(width / size);
        const rows = Math.floor(height / size);
        const array = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                if (j % 2 === 0) {
                    row.push('0');
                } else {
                    row.push('1');
                }
            }
            array.push(row);
        }
        console.log(array);
        return array;
    }

    //function createCellArray() {
    //    const array = [];
    //    for (let i = 0; i < height; i++) {
    //        const row = [];
    //        for (let j = 0; j < width; j++) {
    //            row.push('0');
    //        }
    //        array.push(row);
    //    }
    //    return array;
    //}

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        setCanvas();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return <canvas ref={canvasEl}></canvas>;
};

export default GameBoardCanvas;
