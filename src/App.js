import React, { useEffect } from 'react';
import GameBoardCanvas from './components/GameBoardCanvas';
import GameControls from './components/GameControls';

function App() {
    useEffect(() => {
        document.body.classList.add('bg-gray-800');
    });

    return (
        <div>
            <GameBoardCanvas />
            <GameControls />
        </div>
    );
}

export default App;
