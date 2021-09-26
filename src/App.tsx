import React from 'react';
import Sidebar from './components/Sidebar/Sidebar'
import Gallery  from './components/Gallery/Gallery'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Sidebar />
        <div className="vl"></div>
        <Gallery />
      </header>
    </div>
  );
}

export default App;
