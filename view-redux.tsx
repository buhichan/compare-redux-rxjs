import * as React from 'react';
import {Provider, useDispatch, useSelector} from "react-redux"
import {store, RootState, ActionType, ActionCreators} from "./model/redux/store"
import {IFilm} from "./api/mock"

function FilmsView(){
  const films = useSelector<RootState,IFilm[]>(x=>x.films)
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(ActionCreators[ActionType.LoadFilms]())
  },[dispatch])
  return <div>
    <h3>starwar films are</h3>
    <ul>
      {
        films.map(x=><li key={x.title}>{x.title}</li>)
      }
    </ul>
  </div>
}

function ReduxChild(){
  const counter = useSelector<RootState,number>(x=>x.counter)
  const dispatch = useDispatch()
  const [showFilms, setShowFilms] = React.useState(false)
  return <div>
    <h2>counter is {counter}</h2>
    <button onClick={()=>{
      dispatch(ActionCreators[ActionType.AddCounter](1))
    }}>add 1</button>
    <button onClick={()=>{
      dispatch(ActionCreators[ActionType.SubCounter](1))
    }}>sub 1</button>
    <button onClick={()=>{
      setShowFilms(true)
    }}>load Films</button>
    {
      showFilms && <FilmsView />
    }
  </div>
}

export function ReduxViewLayer(){
    return <Provider store={store}>
      <ReduxChild />
    </Provider>
}