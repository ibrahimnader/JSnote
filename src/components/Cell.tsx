import React from "react";
import { Cell as CellType } from "../redux/Cell";
import { ActionBar } from "./ActionBar";
import { TextEditor } from "./TextEditor";
import Window from "./Window";
interface CellProps extends CellType {}

const Cell: React.FC<CellProps> = (CellData) => {
  return (
    <div className="cell">
      <ActionBar id={CellData.id} />
      {CellData.type === "code" ? (
        <Window {...CellData} />
      ) : (
        <TextEditor {...CellData} />
      )}
    </div>
  );
};
export default Cell;
