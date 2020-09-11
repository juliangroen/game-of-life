import React, { useEffect } from 'react';
import GameBoard from './components/GameBoard';

function App() {
    useEffect(() => {
        document.body.classList.add('flex', 'flex-col', 'bg-gray-800');
    });

    return (
        <div className="flex flex-col flex-wrap items-center mx-auto">
            <header className="text-center w-full p-4">
                <h1 className="text-4xl text-gray-200 font-bold">Conway's Game of Life</h1>
                <p className="text-gray-400 mb-4">
                    Draw a pattern on the board or click Randomize to create a pattern.
                </p>
            </header>
            <GameBoard />
        </div>
    );
}

export default App;
