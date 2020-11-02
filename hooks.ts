import {BehaviorSubject, Observable} from "rxjs"
import {skip} from "rxjs/operators"
import * as React from 'react'

export function useObservable<T>(ob: Observable<T>): T | null
export function useObservable<T>(ob: BehaviorSubject<T>): T
export function useObservable<T>(ob: Observable<T>){
  const [value, setValue] = React.useState(()=>{
    return ob instanceof BehaviorSubject ? ob.value : null
  })

  React.useEffect(()=>{
    const sub = (ob instanceof BehaviorSubject ? skip(1)(ob): ob).subscribe(value=>{
      setValue(value)
    })
    return ()=>{
      sub.unsubscribe()
    }
  },[ob])

  return value

}