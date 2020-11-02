import { createStore } from "redux";
import { produce } from "immer";

type Action<P = unknown> = {
  type: ActionType;
  payload: P;
};

export enum ActionType {
  AddCounter = "addCounter",
  SubCounter = "subCounter",
  ResetCounter = "resetCounter"
}

const initialRootState = {
  counter: 1
};

type RootState = typeof initialRootState;

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
  }
};

for (const k in reducers) {
  reducers[k] = produce(reducers[k]);
}

export const store = createStore(function rootReducer(state, action) {
  return reducers[action.type](state, action);
}, initialRootState);
