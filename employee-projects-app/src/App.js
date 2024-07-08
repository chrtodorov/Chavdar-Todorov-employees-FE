import React from 'react';
import EmployeeProjects from './components/EmployeeProjects';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <h1 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>Employee Projects App</h1>
            <EmployeeProjects />
        </header>
    </div>
);
}

export default App;