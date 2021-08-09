import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { insertCell } from "../redux/action-creators";
import "./AddCell.css";
interface AddCellProps {}

export const AddCell: React.FC<AddCellProps> = ({}) => {
  const [visible, setvisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="add-cell">
      <ul className={`add-cell-type ${visible ? "visible" : ""}`}>
        <li>
          <button
            className="button is-primary"
            onClick={() => {
              dispatch(insertCell("code", ""));
              setvisible(!visible);
            }}
          >
            Code
          </button>
        </li>
        <li>
          <button
            className="button is-primary"
            onClick={() => {
              dispatch(insertCell("text", "# click here to edit"));
              setvisible(!visible);
            }}
          >
            Text
          </button>
        </li>
      </ul>
      <button
        className="button is-primary add-cell-plus is-rounded is-block "
        onClick={() => setvisible(!visible)}
      >
        {visible ? <FaTimes /> : <FaPlus />}
      </button>
    </div>
  );
};
