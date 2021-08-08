import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../Cell";
import { produce } from "immer";

interface CellType {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}
const initialState: CellType = {
  loading: false,
  error: null,
  order: [],
  data: {},
};
const CellReducer = produce((state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.DELETE_Cell:
      // let newData = Object.keys(state.data).reduce(
      //   (object: any, key: string) => {
      //     if (key !== action.payload.id) {
      //       object[key] = newData[key];
      //     }
      //     return object;
      //   },
      //   {}
      // );
      delete state.data[action.payload];
      state.order = state.order.filter((id: string) => id !== action.payload);
      return state;

    case ActionTypes.INSERT_Cell:
      const newCell = {
        id: randomId(),
        type: action.payload.type,
        content: action.payload.content,
      };
      state.data[newCell.id] = newCell;
      const index = state.order.findIndex(
        (id: string) => id === action.payload.id
      );
      if (index < 0) {
        state.order.push(newCell.id);
      } else {
        state.order.splice(index, 0, newCell.id);
      }
      return state;

    case ActionTypes.MOVE_Cell:
      const idx = state.order.findIndex(
        (id: string) => id === action.payload.id
      );
      const newIdx = action.payload.direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx > state.order.lenght - 1) {
        return state;
      }
      state.order[idx] = state.order[newIdx];
      state.order[newIdx] = action.payload.id;
      return state;

    case ActionTypes.UPDATE_Cell:
      state.data[action.payload.id].content = action.payload.content;

      return state;

    default:
      return state;
  }
});
const randomId = () => Math.random().toString().substr(2, 5);
export default CellReducer;
