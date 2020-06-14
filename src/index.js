import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Random Quote Machine</p>
            </header>
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
