import "./CodeEditor.css";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import React, { useRef } from "react";
interface CodeEditorProps {
  intialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, intialValue }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
  };
  const formatOnClick = () => {
    if (editorRef.current) {
      const editorValue = editorRef.current.getValue();
      const formatedCode = prettier
        .format(editorValue, {
          parser: "babel",
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, "");
      editorRef.current.setValue(formatedCode);
    }
  };
  return (
    <div className="editor">
      <button
        className="button formatButton is-primary is-small"
        onClick={formatOnClick}
      >
        format
      </button>
      <Editor
        onMount={onMount}
        value={intialValue}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
