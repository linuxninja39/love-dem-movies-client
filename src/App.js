import React from 'react';
import './App.css';
import Main from "./Main";
import Header from "./Header";

function App() {
  return (
    <div className="App">
        <Header />
        <Main value={'hi'}/>
    </div>
  );
}

export default App;
