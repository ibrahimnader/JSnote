import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { bundlesMiddleware } from "./middlewares/bundlesMiddleware";
import rootReducer from "./reducers";
export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(bundlesMiddleware, thunk)
);
