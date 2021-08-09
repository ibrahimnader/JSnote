import { Middleware } from "redux";
import bundle from "../../bundler";
import { bundleCreated } from "../action-creators";
import { ActionTypes } from "../action-types";
import { RootState } from "../reducers";
let timer: any;
export const bundlesMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: any) => {
    // Do something in here, when each action is dispatched
    if (action.type !== ActionTypes.UPDATE_Cell) {
      return next(action);
    }
    const cell = store.getState().cellState.data[action.payload.id];
    if (cell.type === "text") {
      return next(action);
    }
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const result = await bundle(cell.content);
      store.dispatch(bundleCreated(action.payload.id, result));
    }, 750);
    return next(action);
  };
