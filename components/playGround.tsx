"use client";

import React, { useState } from "react";
import Split from "react-split";
import CodeEditorNav from "./codeEditorNav";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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

  // <Editor
  //             height={showResizableDiv ? "70vh" : "85vh"}
  //             width="100%"
  //             language="javascript"
  //             value={value}
  //             theme="vs-dark"
  //             defaultValue="// some comment"
  //             onChange={handleEditorChange}
  //           />
  const [chips, setChips] = useState(
    Array(3)
      .fill(true)
      .map((_, index) => `Div ${index + 1}`)
  );
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState<string | null>(null);

  const addNewChip = () => {
    setChips((prevChips) => [...prevChips, `Div ${prevChips.length + 1}`]);
  };

  const deleteChip = (index: number) => {
    setChips((prevChips) => prevChips.filter((_, i) => i !== index));
    if (selectedChip === index) {
      setSelectedChip(null);
      setDisplayText(null);
    }
  };

  const handleChipClick = (index: number, label: string) => {
    setSelectedChip(index);
    updateTextField(label);
  };

  const updateTextField = (value: string) => {
    setDisplayText(value);
  };

  return (
    <div className="flex flex-col bg-dark-layer-1 relative">
      <CodeEditorNav />

      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            extensions={[javascript()]}
            value={value}
            theme={xcodeDark}
            onChange={handleEditorChange}
            style={{ fontSize: 16 }}
          />
        </div>

        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-14 rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            <div className="mr-2 items-start mt-4 text-white">
              <div className="flex flex-wrap items-center gap-y-5">
                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                  Case 1
                </div>
              </div>
            </div>

            <div className="mr-2 items-start mt-4 text-white">
              <div className="flex flex-wrap items-center gap-y-5">
                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                  Case 2
                </div>
              </div>
            </div>

            <div className="mr-2 items-start mt-4 text-white">
              <div className="flex flex-wrap items-center gap-y-5">
                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
                  Case 3
                </div>
              </div>
            </div>
          </div>

          {/* <div className="font-semibold">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
              <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                nums: [2,7,11,15] , target: 9
              </div>
           
              <p className="text-sm font-medium mt-4 text-white">Output:</p>
              <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                [0,1]
              </div>
          </div> */}

          <div className="flex flex-wrap" style={{ maxWidth: "600px" }}>
            {chips.map((label, index) => (
              <Chip
                key={index}
                label={label}
                className={`m-2 cursor-pointer ${
                  selectedChip === index ? "border border-blue-500" : ""
                }`}
                onClick={() => handleChipClick(index, label)}
                onDelete={() => deleteChip(index)}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              className="p-4 m-2"
              onClick={addNewChip}
            >
              +
            </Button>
            <div className="mt-4">
              <TextField
                label="Display Text"
                variant="outlined"
                fullWidth
                value={displayText || ""}
                className="bg-gray-100"
              />
            </div>
          </div>
        </div>
      </Split>
    </div>
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
