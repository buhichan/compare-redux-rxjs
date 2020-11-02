import {useObservable} from "./hooks"
import {addCounter, subCounter, counter$} from "./model/rxjs/counter"
import * as React from "react"
import { FilmService } from "./model/rxjs/films"

function FilmsView({filmService}:{filmService:FilmService}){
  
  const films = useObservable(filmService.loadFilms)

  return <div>
    <h3>starwar films are</h3>
    <ul>
      {
        films && films.map(x=><li key={x.title}>{x.title}</li>)
      }
    </ul>
  </div>
}

export function RxjsViewLayer(){
  const counter = useObservable(counter$)
  const [showFilms, setShowFilms] = React.useState(false)
  const filmService = React.useMemo(()=>new FilmService(),[])

  return <div>
    <h2>counter is {counter}</h2>
    <button onClick={()=>{
      addCounter(1)
    }}>add 1</button>
    <button onClick={()=>{
      subCounter(1)
    }}>sub 1</button>
    <button onClick={()=>{
      setShowFilms(true)
    }}>load Films</button>
    {
      showFilms && <FilmsView filmService={filmService} />
    }
  </div>
}