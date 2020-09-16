import React, { useState } from 'react';

const IntroModal = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={`absolute inset-0 z-40 ${isOpen ? '' : 'pointer-events-none'}`}>
            {isOpen && (
                <div className="absolute inset-0 md:inset-x-0 md:inset-y-auto overflow-auto z-50 bg-gray-800 rounded-lg shadow-lg sm:w-2/3 lg:w-1/2 xl:w-1/3 px-4 pt-12 pb-6 m-8 sm:mx-auto">
                    <div
                        className="absolute top-0 right-0 cursor-pointer bg-gray-900 opacity-75 rounded-full text-2xl text-gray-400 hover:text-indigo-400 font-mono leading-tight px-2 m-3"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        ×
                    </div>
                    <h1 className="text-3xl text-indigo-400 text-center mb-4">Conway's Game of Life</h1>
                    <p className="bg-gray-700 text-gray-400 rounded p-4 mb-4">
                        Draw a pattern of cells on the screen, or generate a random pattern by clicking the "Randomize"
                        button.
                    </p>
                    <div className="bg-gray-700 text-gray-400 rounded p-4 mb-4">
                        Start the game and watch the cells die and repopulate based on the following rules:
                        <ul className="text-gray-500 text-sm list-disc mt-2 ml-4">
                            <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                            <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                            <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                            <li>
                                Any dead cell with exactly three live neighbours becomes a live cell, as if by
                                reproduction.
                            </li>
                        </ul>
                    </div>
                    <button
                        className="bg-indigo-600 hover:bg-indigo-500 text-gray-900 rounded text-xl text-center w-full p-2"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        Close this window to begin.
                    </button>
                </div>
            )}
            {isOpen && (
                <div
                    className="absolute inset-0 bg-gray-900 opacity-75"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                ></div>
            )}
        </div>
    );
};

export default IntroModal;
