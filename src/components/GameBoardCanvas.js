import React, { useState, useEffect, useRef } from 'react';

const GameBoardCanvas = () => {
    const canvasEl = useRef(null);
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

    function setCanvas() {
        const canvas = canvasEl.current;
        canvas.height = dimensions.width;
        canvas.width = dimensions.width;
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        setCanvas();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <div>
            {dimensions.width}
            <canvas ref={canvasEl}></canvas>
        </div>
    );
};

export default GameBoardCanvas;
