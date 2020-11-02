import { publishReplay, refCount } from "rxjs/operators";
import { apiRx } from "../../api/mock";



export class FilmService {
  public loadFilms = apiRx.getFilms().pipe(
    publishReplay(1),
    refCount()
  )
}