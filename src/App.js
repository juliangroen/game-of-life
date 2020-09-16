import React from 'react';
import GameBoardCanvas from './components/GameBoardCanvas';
import IntroModal from './components/IntroModal';

function App() {
    document.body.classList.add('bg-black');
    return (
        <div className="relative">
            <IntroModal />
            <GameBoardCanvas />
        </div>
    );
}

export default App;
