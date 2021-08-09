import { combineReducers } from "redux";
import bundlesReducer from "./bundlesReducer";
import CellReducer from "./CellReducer";
const rootReducer = combineReducers({
  cellState: CellReducer,
  bundleState: bundlesReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
