import {useObservable} from "./hooks"
import {counter$} from "./model/rxjs/counter"
import * as React from "react"


export function RxjsViewLayer(){
  const counter = useObservable(counter$)

  return <div>
    
  </div>
}