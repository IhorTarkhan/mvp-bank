import React from "react";

function App() {
  console.log(process.env);

  return (
    <div>
      <header>
        <img src={"image/logo.svg"} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
