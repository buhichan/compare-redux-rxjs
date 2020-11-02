import * as React from 'react';
import {Provider, useDispatch, useSelector} from "react-redux"
import {store, RootState, ActionType, ActionCreators} from "./model/redux/store"

function ReduxChild(){
  const counter = useSelector<RootState,number>(x=>x.counter)
  const dispatch = useDispatch()
  return <div>
    <h2>counter is {counter}</h2>
    <button onClick={()=>{
      dispatch(ActionCreators[ActionType.AddCounter](1))
    }}>add 1</button>
    <button onClick={()=>{
      dispatch(ActionCreators[ActionType.SubCounter](1))
    }}>sub 1</button>
  </div>
}

export function ReduxViewLayer(){
    return <Provider store={store}>
      <ReduxChild />
    </Provider>
}
