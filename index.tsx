import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import {Provider} from "react-redux"
import { RxjsViewLayer } from "./view-rxjs";
import { ReduxViewLayer } from "./view-redux";

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
      {
        mode === 'rxjs' ? <RxjsViewLayer /> : <ReduxViewLayer />
      }
    </div>
  );
}


render(<App />, document.getElementById("root"));
