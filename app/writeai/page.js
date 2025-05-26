"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { createEditor, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Dropdown from "../components/ui/Dropdown";
import Button from "../components/designsystem/button";
import Search from "../components/ui/Search";
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const CustomButton = ({ children, onClick }) => {
  const [isToggled, setIsToggled] = useState(false);
  return (
    <button
      onClick={() => {
        onClick();
        setIsToggled(!isToggled);
      }}
      className={`cursor-pointer ${isToggled ? "bg-blue-500" : "bg-gray-200"}`}
    >
      {children}
    </button>
  );
};

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState("Arial");
  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  useEffect(() => {
    focusEditor();
  }, []);

  const [editor] = useState(() => withReact(createEditor()));

  const toggleBold = useCallback(() => {
    const isBold = Editor.marks(editor)?.bold === true;
    if (isBold) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
    focusEditor();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    const isItalic = Editor.marks(editor)?.italic === true;
    if (isItalic) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
    focusEditor();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    const isUnderline = Editor.marks(editor)?.underline === true;
    if (isUnderline) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
    focusEditor();
  }, [editor]);

  const toggleStrikethrough = useCallback(() => {
    const isStrikethrough = Editor.marks(editor)?.strikethrough === true;
    if (isStrikethrough) {
      Editor.removeMark(editor, "strikethrough");
    } else {
      Editor.addMark(editor, "strikethrough", true);
    }
    focusEditor();
  }, [editor]);

  const changeFontSize = useCallback(
    (newSize) => {
      setFontSize(newSize);
      Editor.addMark(editor, "fontSize", newSize);
      focusEditor();
    },
    [editor]
  );

  const changeFontFamily = useCallback(
    (newFontFamily) => {
      setFontFamily(newFontFamily);
      Editor.addMark(editor, "fontFamily", newFontFamily);
      focusEditor();
    },
    [editor]
  );

  const changeAlign = useCallback(
    (newAlign) => {
      Editor.addMark(editor, "align", newAlign);
      focusEditor();
    },
    [editor]
  );

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
    if (leaf.strikethrough) {
      children = <del>{children}</del>;
    }
    if (leaf.fontSize) {
      children = (
        <span style={{ fontSize: `${leaf.fontSize}pt` }}>{children}</span>
      );
    }
    if (leaf.fontFamily) {
      children = (
        <span style={{ fontFamily: leaf.fontFamily }}>{children}</span>
      );
    }
    if (leaf.align) {
      children = <div style={{ textAlign: leaf.align }}>{children}</div>;
    }
    return <span {...attributes}>{children}</span>;
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="flex-1 flex pb-[24px] flex-col gap-[24px] justify-center items-center bg-white">
        <div className="sticky top-0 z-10 w-full flex flex-col  bg-white/50 backdrop-blur-sm">
          <div className="w-full flex items-center px-[48px]  justify-between py-[24px]">
            <div className="flex items-center gap-[12px]">
              <div className="w-[40px] h-[40px] rainbow-radial rounded-full"></div>
              <p className="text-[18px]">Untitled Document</p>
            </div>
            <Button variant="tertiary" size="medium" arrow={false}>
              Share +
            </Button>
          </div>
          <div className="w-full flex items-center ">
            <div className="text[14px] w-full border-t border-b flex gap-[16px] items-center border-black/10  p-[24px] px-[48px]">
              {/* <div className="w-[40px] h-[40px] bg-black/10 rounded-full"></div> */}
              <Button
                variant="primary"
                size="medium"
                arrow={false}
                className={`${isSidebarOpen ? "w-full" : "w-fit"}`}
              >
                {isSidebarOpen ? (
                  <i className="fa-solid fa-file-lines"></i>
                ) : (
                  "References"
                )}

                <i className="text-[12px] fa-solid fa-plus"></i>
              </Button>
              <i className=" fa-solid fa-print"></i>
              <i className="fa-solid fa-undo-alt"></i>
              <i className="fa-solid fa-redo-alt"></i>
              <Button variant="tertiary" size="medium" arrow={false}>
                Inter
              </Button>
              <Button
                variant="tertiary"
                size="medium"
                arrow={false}
                className="text-nowrap"
              >
                - 12 +
              </Button>
              <i className="fa-solid fa-bold"></i>
              <i className="fa-solid fa-italic"></i>
              <i className="fa-solid fa-underline"></i>
              <i className="fa-solid fa-strikethrough"></i>
              <p className="font-medium text-[18px] py-[0px] border-b-2 text-purple-500  border-purple-500">
                A
              </p>
              <div className="font-medium text-[18px] rainbow-radial text-black w-[20px] h-[20px] aspect-square flex items-center justify-center leading-none ">
                <p className="text-center">A</p>
              </div>
              <i className="fa-solid fa-link"></i>
              <i className="fa-solid fa-image"></i>
              <i className="fa-solid fa-align-left"></i>
              <i className="fa-solid fa-align-center"></i>
              <i className="fa-solid fa-align-right"></i>
              <i className="fa-solid fa-list-ul"></i>
              <i className="fa-solid fa-list-ol"></i>
              {!isSidebarOpen && (
                <Search
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex-1 py-[0px]  h-[42px]"
                  placeholder="Got a question?"
                />
              )}
              <div className="flex flex-col relative">
                <div className="absolute top-0 right-0 -translate-y-full bg-white text-black/50 text-[14px] p-2 border border-black/10 border-b-0 w-fit rounded-t-[12px]">
                  Autocomplete
                </div>
                <div className="w-[144px] relative  rounded-full rounded-tr-none border border-black/10 overflow-hidden flex">
                  <div className="absolute top-0 left-0 w-[50%] border-4 border-white rounded-full h-full bg-black"></div>
                  <div className="w-full h-full py-[12px] z-10 text-white flex items-center justify-center">
                    On
                  </div>
                  <div className="w-full h-full py-[12px] z-10  flex items-center justify-center">
                    Off
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex w-full gap-[24px]">
        <CustomButton onClick={toggleBold}>Bold</CustomButton>
        <CustomButton onClick={toggleItalic}>Italic</CustomButton>
        <CustomButton onClick={toggleUnderline}>Underline</CustomButton>
        <CustomButton onClick={toggleStrikethrough}>Strikethrough</CustomButton>
        <div className="flex items-center justify-center gap-2">
          <i
            onClick={() => changeFontSize(Math.max(8, fontSize - 1))}
            className="fa-solid fa-minus cursor-pointer"
          ></i>
          <p>{fontSize}pt</p>
          <i
            onClick={() => changeFontSize(Math.min(72, fontSize + 1))}
            className="fa-solid fa-plus cursor-pointer"
          ></i>
        </div>
        <Dropdown
          options={["Arial", "Times New Roman", "Courier New", "Georgia"]}
          onChange={(option) => changeFontFamily(option)}
        />
        <Dropdown
          options={["Left", "Center", "Right"]}
          onChange={(option) => changeAlign(option)}
        />
      </div> */}
        <div className="w-full flex justify-center border-b-[1px] border-black/10">
          <div className="relative w-[8.5in] h-[20px] flex justify-between items-end">
            {Array.from({ length: 69 }).map((_, i) => (
              <div
                key={i}
                className={`w-[1px] bg-gray-300 ${
                  i % 8 === 0 ? "h-[12px]" : i % 4 === 0 ? "h-[8px]" : "h-[4px]"
                }`}
                style={{
                  position: "absolute",
                  left: `${i * 12 + 0.5}px`, // 12px per 1/8 inch (96px/8)
                }}
              ></div>
            ))}
            {/* Add inch numbers */}
          </div>
        </div>
        <Slate editor={editor} initialValue={initialValue}>
          <Editable
            ref={editorRef}
            className="w-[8.5in] h-[11in] p-[1in] border border-black/10 focus:outline-none"
            renderLeaf={renderLeaf}
            placeholder="&#8984;/cmd L for options..."
            onKeyDown={(event) => {
              if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "b"
              ) {
                event.preventDefault();
                toggleBold();
              }
              if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "i"
              ) {
                event.preventDefault();
                toggleItalic();
              }
              if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "u"
              ) {
                event.preventDefault();
                toggleUnderline();
              }
              if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "s"
              ) {
                event.preventDefault();
                toggleStrikethrough();
              }
            }}
          />
        </Slate>
      </div>
      <div
        className={`${
          isSidebarOpen ? "w-[23%]" : "w-[0px]"
        } sticky top-0 h-[100vh] border-l  overflow-hidden flex border-black/10 transition-all duration-300`}
      >
        <div className="w-full p-[36px] h-[100vh] flex flex-col gap-[24px] inset-0">
          {/* <div className="w-full flex items-center justify-between">
            <p>Writely</p>
            <i
              className="fa-solid fa-xmark"
              onClick={() => setIsSidebarOpen(false)}
            ></i>
          </div> */}
          <div className="flex-1 border rounded-[12px] border-black/10"></div>
          <Search placeholder="Search..." />
        </div>
      </div>
    </div>
  );
};

export default Page;
