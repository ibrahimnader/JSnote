import "bulmaswatch/superhero/bulmaswatch.min.css";
import { RootState } from "../redux";
import { useEffect, useState } from "react";
import "./window.css";
import CodeEditor from "../components/CodeEditor";
import { Preview } from "../components/Preview";
import bundle from "../bundler";
import { Resizable } from "./Resizable";
import { useDispatch } from "react-redux";
import { updateCell } from "../redux/action-creators";
import { useTypedSelector } from "../hooks/typedSelector";
interface WindowProps {
  id: string;
  type: "code" | "text";
  content: string;
}
const Window: React.FC<WindowProps> = ({ id, content, type }) => {
  const dispatch = useDispatch();
  const bundleData = useTypedSelector((state) => state.bundleState.data[id]);
  const bundle = bundleData ? bundleData : { code: "", error: "" };
  return (
    <Resizable direction="v">
      <div className="windowWrapper">
        <Resizable direction="h">
          <CodeEditor
            intialValue={content}
            onChange={(input) => {
              dispatch(updateCell(id, input));
            }}
          />
        </Resizable>
        <Preview code={bundle.code || ""} error={bundle.error} />
      </div>
    </Resizable>
  );
};
export default Window;
