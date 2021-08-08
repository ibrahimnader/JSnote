import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCell } from "../redux/action-creators";
import "./texteditor.css";

interface TextEditorProps {
  id: string;
  type: string;
  content: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  id,
  content,
  type,
}) => {
  const [editing, setediting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
        setediting(false);
      }
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);
  const dispatch = useDispatch();

  return editing ? (
    <div className="text-editor" ref={ref}>
      <MDEditor
        value={content}
        onChange={(value) => {
          if (value) dispatch(updateCell(id, value));
        }}
      />
    </div>
  ) : (
    <div
      onClick={() => {
        setediting(true);
      }}
    >
      <MDEditor.Markdown source={content} />
    </div>
  );
};
