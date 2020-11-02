import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

function App() {
  const [mode, setMode] = React.useState("rxjs" as "rxjs" | "redux");
  return (
    <div>
      <select
        value={mode}
        onChange={e => {
          setMode(e.currentTarget.value as any);
        }}
      >
        <option value="rxjs">rxjs</option>
        <option value="redux">redux</option>
      </select>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}

function RxjsContainer(){

}

function ReduxContainer(){
  return <Provider>
    {
      
    }
  </Provider>
}

render(<App />, document.getElementById("root"));
