import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { CellTypes } from "../Cell";

export const deleteCell = (id: string): Action => {
  return {
    type: ActionTypes.DELETE_Cell,
    payload: id,
  };
};
export const updateCell = (id: string, content: string): Action => {
  return {
    type: ActionTypes.UPDATE_Cell,
    payload: {
      id,
      content,
    },
  };
};
export const moveCell = (id: string, direction: "up" | "down"): Action => {
  return {
    type: ActionTypes.MOVE_Cell,
    payload: { id, direction },
  };
};

export const insertCell = (type: CellTypes, content: string): Action => {
  return {
    type: ActionTypes.INSERT_Cell,
    payload: {
      type,
      content,
    },
  };
};
