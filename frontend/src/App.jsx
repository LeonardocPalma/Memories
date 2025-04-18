import "./App.css";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <h1>Memories</h1>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
