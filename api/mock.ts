import {fromFetch} from "rxjs/fetch"
import {switchMap, map} from "rxjs/operators"

export interface IFilm {
  title: string,
  characters: string[]
}

export const api = {
  getFilms(){
    return fetch("https://swapi.dev/api/films/").then(x=>x.json())
    .then(x=>x.results as IFilm[])
  }
}

export const apiRx = {
  getFilms(){
    return fromFetch("https://swapi.dev/api/films/")
    .pipe(
      switchMap((x=>x.json() as Promise<{results: IFilm[]}>)),
      map(x=>x.results),
    )
  }
}