import React from "react";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable";
import HeaderSearch from "./components/HeaderSearch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="mainHeaderWrapper">
          <div className="appTitleWrapper">
            <span className="appTitle">My Employees Records !</span>
          </div>
          <div className="headerSearchWrapper">
            <HeaderSearch />
          </div>
        </div>
      </header>
      <EmployeeTable />
    </div>
  );
}

export default App;
