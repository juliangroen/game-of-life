import React, { useState, useEffect } from 'react';
import GameBoardCanvas from './components/GameBoardCanvas';

function App() {
    useEffect(() => {
        document.body.classList.add('bg-gray-800');
    });

    return (
        <div className="relative">
            <GameBoardCanvas />
        </div>
    );
}

export default App;
