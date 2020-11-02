import { createStore, applyMiddleware } from "redux";
import { default as createSagaMiddleware, } from "redux-saga"
import { produce } from "immer";
import { takeLatest, put } from "redux-saga/effects"
import { api, IFilm } from "../../api/mock";

type Action<P = unknown> = {
  type: ActionType;
  payload: P;
};

export enum ActionType {
  AddCounter = "addCounter",
  SubCounter = "subCounter",
  ResetCounter = "resetCounter",
  SetFilms = "setFilms",
  LoadFilms = "loadFilms",
}

export const ActionCreators = {
  [ActionType.LoadFilms](){
    return {
      type: ActionType.LoadFilms,
    }
  },
  [ActionType.SetFilms](films: IFilm[]){
    return {
      type: ActionType.SetFilms,
      payload:{
        films,
      }
    }
  },
  [ActionType.AddCounter](right: number) {
    return {
      type: ActionType.AddCounter,
      payload: { right }
    };
  },
  [ActionType.SubCounter](right: number) {
    return {
      type: ActionType.SubCounter,
      payload: { right }
    };
  }
};

const initialRootState = {
  counter: 1,
  films: [] as IFilm[]
};

export type RootState = typeof initialRootState;

const reducers = {
  [ActionType.AddCounter](state: RootState, action: Action<{ right: number }>) {
    state.counter += action.payload.right;
  },
  [ActionType.SubCounter](state: RootState, action: Action<{ right: number }>) {
    state.counter -= action.payload.right;
  },
  [ActionType.ResetCounter](
    state: RootState,
    action: Action<{ right: number }>
  ) {
    state.counter = initialRootState.counter;
  },
  [ActionType.SetFilms](state: RootState, action: Action<{ films: IFilm[] }>) {
    state.films = action.payload.films
  },
};

for (const k in reducers) {
  reducers[k] = produce(reducers[k]);
}

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(function rootReducer(state, action) {
  if (action.type in reducers) {
    return reducers[action.type](state, action);
  } else {
    return state;
  }
}, initialRootState, applyMiddleware(
  sagaMiddleware
));

function* loadFilms(){
  const films = yield api.getFilms()
  yield put(ActionCreators[ActionType.SetFilms](films))
}

sagaMiddleware.run(function* sagaRoot(){
   yield takeLatest(ActionType.LoadFilms, loadFilms)
})