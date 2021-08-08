import { combineReducers } from "redux";
import CellReducer from "./CellReducer";
const rootReducer = combineReducers({
  CellState: CellReducer,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
