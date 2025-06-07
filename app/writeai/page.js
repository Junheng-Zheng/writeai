"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { createEditor, Editor } from "slate";
import { useSearchParams } from "next/navigation";
import { Slate, Editable, withReact } from "slate-react";
import Dropdown from "../components/ui/Dropdown";
import Button from "../components/designsystem/button";
import Search from "../components/ui/Search";
import AutocompleteToggle from "../components/designsystem/autocompleteToggle";
import Counter from "../components/designsystem/counter";
import FontFamilyDropdown from "../components/designsystem/fontFamilyDropdown";
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

  const searchParams = useSearchParams();
  const fileId = searchParams.get("id");

  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFileContents() {
      if (!fileId) return;
      try {
        const res = await fetch(`/api/aws/file?id=${fileId}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setValue(data.file?.content || initialValue);
        } else {
          setValue(initialValue);
        }
      } catch (err) {
        console.error("Failed to fetch file:", err);
        setValue(initialValue);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFileContents();
  }, [fileId]);

  useEffect(() => {
    if (!isLoading) focusEditor();
  }, [isLoading]);

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  useEffect(() => {
    focusEditor();
  }, []);


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

  console.log("Editor Value:", value);
  if (isLoading || !value) return <div className="flex justify-center items-center h-screen">Loading document...</div>;

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
              <FontFamilyDropdown />

              <Counter />
              <button
                onClick={toggleBold}
                className="fa-solid fa-bold hover:text-purple-500"
              ></button>
              <button
                onClick={toggleItalic}
                className="fa-solid fa-italic hover:text-purple-500"
              ></button>
              <button
                onClick={toggleUnderline}
                className="fa-solid fa-underline hover:text-purple-500"
              ></button>
              <button
                onClick={toggleStrikethrough}
                className="fa-solid fa-strikethrough hover:text-purple-500"
              ></button>
              <p className="font-medium text-[18px] py-[0px] border-b-2 text-purple-500  border-purple-500">
                A
              </p>
              <div className="font-medium text-[18px] rainbow-radial text-black w-[20px] h-[20px] aspect-square flex items-center justify-center leading-none ">
                <p className="text-center">A</p>
              </div>
              <i className="fa-solid fa-link"></i>
              <i className="fa-solid fa-image"></i>
              <button
                onClick={() => changeAlign("left")}
                className="fa-solid fa-align-left hover:text-purple-500"
              ></button>
              <button
                onClick={() => changeAlign("center")}
                className="fa-solid fa-align-center hover:text-purple-500"
              ></button>
              <button
                onClick={() => changeAlign("right")}
                className="fa-solid fa-align-right hover:text-purple-500"
              ></button>
              <i className="fa-solid fa-list-ul"></i>
              <i className="fa-solid fa-list-ol"></i>
              {!isSidebarOpen && (
                <Search
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex-1 py-[0px]  h-[42px]"
                  placeholder="Got a question?"
                />
              )}
              <AutocompleteToggle />
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
        <Slate editor={editor} initialValue={value} onChange={(newValue) => setValue(newValue)}>
          <Editable
            ref={editorRef}
            className="w-[8.5in] h-[11in] p-[1in] border border-black/10 focus:outline-none"
            renderLeaf={renderLeaf}
            placeholder=""
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
