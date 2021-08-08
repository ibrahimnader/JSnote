import React from "react";
import { useTypedSelector } from "../hooks/typedSelector";
import Cell from "./Cell";
interface CellsListProps {}

export const CellsList: React.FC<CellsListProps> = ({}) => {
  const list = useTypedSelector((state) => state.CellState.data);
  const order = useTypedSelector((state) => state.CellState.order);
  console.log(list);
  return (
    <div className="">
      {order.map((id: string) => (
        <Cell key={id} {...list[id]} />
      ))}
    </div>
  );
};
