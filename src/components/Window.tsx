import "bulmaswatch/superhero/bulmaswatch.min.css";

import { useEffect, useState } from "react";
import "./window.css";
import CodeEditor from "../components/CodeEditor";
import { Preview } from "../components/Preview";
import bundle from "../bundler";
import { Resizable } from "./Resizable";
import { useDispatch } from "react-redux";
import { updateCell } from "../redux/action-creators";
interface WindowProps {
  id: string;
  type: "code" | "text";
  content: string;
}
const Window: React.FC<WindowProps> = ({ id, content, type }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await bundle(content);
      setCode(result.code);
      setError(result.error);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [content]);
  const dispatch = useDispatch();
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
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};
export default Window;
