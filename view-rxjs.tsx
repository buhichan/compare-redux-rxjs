import {useObservable} from "./hooks"
import {addCounter, subCounter, counter$} from "./model/rxjs/counter"
import * as React from "react"

export function RxjsViewLayer(){
  const counter = useObservable(counter$)

  return <div>
    <h2>counter is {counter}</h2>
    <button onClick={()=>{
      addCounter(1)
    }}>add 1</button>
    <button onClick={()=>{
      subCounter(1)
    }}>sub 1</button>
  </div>
}