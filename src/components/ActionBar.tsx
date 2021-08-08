import React from "react";
import { useDispatch } from "react-redux";
import { deleteCell, moveCell } from "../redux/action-creators";
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
interface ActionBarProps {
  id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div className="actionBar">
      <button
        className="button  is-primary is-small"
        onClick={() => dispatch(moveCell(id, "up"))}
      >
        <FaArrowUp />
      </button>
      <button
        className="button  is-primary is-small"
        onClick={() => dispatch(moveCell(id, "down"))}
      >
        <FaArrowDown />
      </button>
      <button
        className="button  is-primary is-small"
        onClick={() => dispatch(deleteCell(id))}
      >
        <FaTrash />
      </button>
    </div>
  );
};
