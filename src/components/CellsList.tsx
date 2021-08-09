import React from "react";
import { useTypedSelector } from "../hooks/typedSelector";
import Cell from "./Cell";
interface CellsListProps {}

export const CellsList: React.FC<CellsListProps> = ({}) => {
  const list = useTypedSelector((state) => state.cellState.data);
  const order = useTypedSelector((state) => state.cellState.order);
  return (
    <div className="">
      {order.map((id: string) => (
        <Cell key={id} {...list[id]} />
      ))}
    </div>
  );
};
