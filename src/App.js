import React from 'react';
import './App.css';
import Game from './Game'

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Lines game</h1>
      </header>
      <main>
        <Game />
      </main>
    </div>
  )
}

export default App;
