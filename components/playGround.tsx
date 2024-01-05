"use client";

import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import Split from "react-split";

interface PlaygroundProps {
  onChange: (key: string, value: string) => void;
  code: string;
}

const Playground: React.FC<PlaygroundProps> = ({ onChange, code }) => {
  const [value, setValue] = useState(code || "");
  const [showResizableDiv, setShowResizableDiv] = useState(false);

  const handleEditorChange = (value: any) => {
    setValue(value);
    onChange("code", value);
  };

  const toggleResizableDiv = () => {
    setShowResizableDiv(!showResizableDiv);
  };

  return (
    <Split direction="horizontal" className="h-screen">
      {[
        <Split
          key={1}
          className="flex h-screen"
          sizes={[20, 50, 30]}
          minSize={[350, 400, 300]}
        >
          <div className="bg-blue-500 flex items-center justify-center">
            <div>Problem Statement</div>
          </div>
          <div className="bg-green-600 flex flex-col">
            <div className="flex items-center justify-center">
              <div>Code Editor</div>
              <button onClick={toggleResizableDiv} className="ml-2">
                Toggle Resizable Div
              </button>
            </div>
            <Editor
              height={showResizableDiv ? "70vh" : "85vh"}
              width="100%"
              language="javascript"
              value={value}
              theme="vs-dark"
              defaultValue="// some comment"
              onChange={handleEditorChange}
            />
          </div>
        </Split>,
      ]}
    </Split>
  );

  // return (
  //   <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
  //     <Editor
  //       height="85vh"
  //       width={`100%`}
  //       language={"javascript"}
  //       value={value}
  //       theme="vs-dark"
  //       defaultValue="// some comment"
  //       onChange={handleEditorChange}
  //     />
  //   </div>
  // );

};
export default Playground;
