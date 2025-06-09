"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  Suspense,
} from "react";
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

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <DocumentContent />
    </Suspense>
  );
};

const DocumentContent = () => {
  const searchParams = useSearchParams();
  const fileId = searchParams.get("id");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [editor] = useState(() => withReact(createEditor()));
  const [value, setValue] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Saved to Writely");

  useEffect(() => {
    async function fetchFileContents() {
      if (!fileId) return;
      try {
        const res = await fetch(`/api/aws/file/file?id=${fileId}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setValue(data.file?.content || initialValue);
          setTitle(data.file?.name || "Untitled Document");
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

  async function saveDocument() {
    if (!value || !fileId) return;
    try {
      setStatus("Saving...");
      const res = await fetch(`/api/aws/file/file?id=${fileId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: value,
          title: title || "Untitled Document",
        }),
        credentials: "include",
      });
      setStatus("Saved to Writely");
      if (res.ok) {
        console.log("Document saved successfully");
      } else {
        console.error("Failed to save document");
      }
    } catch (err) {
      console.error("Error saving document:", err);
    }
  }

  const debounceTimer = useRef(null);

  async function handleChange(newValue) {
    setValue(newValue);
    if(newValue === value) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        setStatus("Saving...");
        const res = await fetch(`/api/aws/file/update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id: `DOC#${fileId}`,
            updates: {
              slate_json: newValue,
            },
          }),
        });
        if (res.ok) {
          setStatus("Saved to Writely");
          console.log("Document saved successfully");
        } else {
          console.error("Failed to save document");
          setStatus("Failed to save document");
        }
      } catch (err) {
        console.error("Error saving document:", err);
      }
    }, 1000); // 1 second debounce
  }

  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleReferencesClick = () => {
    setShowUploadMenu(true);
  };

  if (isLoading || !value)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading document...
      </div>
    );

  return (
    <div className="w-full h-full flex">
      <div className="flex-1 flex pb-[24px] flex-col gap-[24px] justify-center items-center bg-white">
        <div className="sticky top-0 z-10 w-full flex flex-col  bg-white/50 backdrop-blur-sm">
          <div className="w-full flex items-center px-[48px]  justify-between py-[24px]">
            <div className="flex items-center gap-[12px]">
              <div className="w-[40px] h-[40px] rainbow-radial rounded-full"></div>
              <p className="text-[18px]">{title}</p>
              <p>{status}</p>
            </div>
            <Button variant="tertiary" size="medium" arrow={false}>
              Share +
            </Button>
          </div>
          <div className="w-full flex items-center ">
            <div className="text[14px] w-full border-t border-b flex gap-[16px] items-center border-black/10  p-[24px] px-[48px]">
              <Button
                variant="primary"
                size="medium"
                arrow={false}
                className={`${isSidebarOpen ? "w-full" : "w-fit"}`}
                onClick={handleReferencesClick}
              >
                {isSidebarOpen ? (
                  <i className="fa-solid fa-file-lines"></i>
                ) : (
                  "References"
                )}

                <i className="text-[12px] fa-solid fa-plus"></i>
              </Button>
              {showUploadMenu && (
                <div
                  className="absolute left-0 mt-2 z-50 bg-white p-6 rounded shadow-lg flex flex-col items-center"
                  style={{ top: "100%" }}
                >
                  <h2 className="mb-4 text-lg font-semibold">Upload Reference File</h2>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    // onChange={handleFileChange}
                    className="mb-4"
                  />
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setShowUploadMenu(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
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
          </div>
        </div>
        <Slate editor={editor} initialValue={value} onChange={handleChange}>
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
          <div className="flex-1 border rounded-[12px] border-black/10"></div>
          <Search placeholder="Search..." />
        </div>
      </div>
    </div>
  );
};

export default Page;
