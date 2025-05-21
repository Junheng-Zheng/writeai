"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { createEditor, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Dropdown from "../components/ui/Dropdown";
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
    <div className="w-full flex p-[48px] flex-col gap-[12px] justify-center items-center bg-white">
      <div className="flex w-full gap-[24px]">
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
      </div>
      <div className="w-full flex justify-center border-b-[1px] border-gray-300">
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
          className="w-[8.5in] h-[11in] p-[1in] border border-gray-200 focus:outline-none"
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
  );
};

export default Page;
