import { BehaviorSubject } from "rxjs";

const initialValue = 1;

const _counter$ = new BehaviorSubject(initialValue);

export function addCounter(right: number) {
  _counter$.next(_counter$.value + right);
}

export function subCounter(right: number) {
  _counter$.next(_counter$.value - right);
}

export function resetCounter() {
  _counter$.next(initialValue);
}

export const counter$ = _counter$.asObservable();
