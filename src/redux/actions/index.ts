import { ActionTypes } from "../action-types";
import { CellTypes } from "../Cell";

interface MOVE_Cell {
  type: ActionTypes.MOVE_Cell;
  payload: {
    id: string;
    direction: "up" | "down";
  };
}

interface DELETE_Cell {
  type: ActionTypes.DELETE_Cell;
  payload: string;
}

interface UPDATE_Cell {
  type: ActionTypes.UPDATE_Cell;
  payload: {
    id: string;
    content: string;
  };
}

interface INSERT_Cell {
  type: ActionTypes.INSERT_Cell;
  payload: {
    id: string;
    type: CellTypes;
    content: string;
  };
}
export type Action = INSERT_Cell | UPDATE_Cell | MOVE_Cell | DELETE_Cell;
