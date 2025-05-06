// "use client";
// import { useState, useCallback, useRef, useEffect } from "react";
// import {
//   createEditor,
//   Transforms,
//   Element,
//   Editor,
//   Text,
//   Range,
//   Node,
// } from "slate";
// import { Slate, Editable, withReact } from "slate-react";

// const Leaf = ({ attributes, children, leaf }) => {
//   let style = {};

//   if (leaf.bold) {
//     children = <strong>{children}</strong>;
//   }
//   if (leaf.italic) {
//     children = <em>{children}</em>;
//   }
//   if (leaf.fontSize) {
//     style.fontSize = `${leaf.fontSize}px`;
//   }

//   return (
//     <span style={style} {...attributes}>
//       {children}
//     </span>
//   );
// };

// const CodeElement = (props) => {
//   return (
//     <pre {...props.attributes}>
//       <code>{props.children}</code>
//     </pre>
//   );
// };

// const DefaultElement = (props) => {
//   return <p {...props.attributes}>{props.children}</p>;
// };

// // Ruler component that resembles Google Docs
// const Ruler = ({ margins, updateMargin, handleButtonMouseDown }) => {
//   const rulerRef = useRef(null);
//   const leftMarkerRef = useRef(null);
//   const rightMarkerRef = useRef(null);

//   const [isDraggingLeft, setIsDraggingLeft] = useState(false);
//   const [isDraggingRight, setIsDraggingRight] = useState(false);

//   // Generate tick marks
//   const ticks = [];
//   for (let i = 0; i <= 8.5; i += 0.25) {
//     let height = "8px";
//     let width = "1px";

//     if (i % 1 === 0) {
//       // Whole inch - taller tick
//       height = "12px";
//       width = "1.5px";
//     } else if (i % 0.5 === 0) {
//       // Half inch - medium tick
//       height = "10px";
//     }

//     ticks.push({
//       position: i,
//       height,
//       width,
//       label: i % 1 === 0 ? i : null,
//     });
//   }

//   // Handle mouse events for dragging
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!rulerRef.current || (!isDraggingLeft && !isDraggingRight)) return;

//       const rulerRect = rulerRef.current.getBoundingClientRect();
//       const rulerWidth = rulerRect.width;

//       // Convert mouse position to inches (ruler is 8.5 inches)
//       let position = ((e.clientX - rulerRect.left) / rulerWidth) * 8.5;

//       // Constrain within valid range (0 to 8.5)
//       position = Math.max(0.25, Math.min(position, 8.25));

//       // Round to nearest 0.1
//       position = Math.round(position * 10) / 10;

//       if (isDraggingLeft) {
//         // Ensure left margin doesn't exceed right margin - 1 inch
//         position = Math.min(position, 8.5 - margins.right - 1);
//         updateMargin("left", position);
//       } else if (isDraggingRight) {
//         // Calculate right margin from right edge
//         const rightMargin = 8.5 - position;
//         // Ensure right margin doesn't exceed 8.5 - left margin - 1 inch
//         const constrainedRightMargin = Math.min(
//           rightMargin,
//           8.5 - margins.left - 1
//         );
//         updateMargin("right", constrainedRightMargin);
//       }
//     };

//     const handleMouseUp = () => {
//       setIsDraggingLeft(false);
//       setIsDraggingRight(false);
//       document.body.style.cursor = "default";
//     };

//     if (isDraggingLeft || isDraggingRight) {
//       document.addEventListener("mousemove", handleMouseMove);
//       document.addEventListener("mouseup", handleMouseUp);
//       document.body.style.cursor = "ew-resize";
//     }

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDraggingLeft, isDraggingRight, margins, updateMargin]);

//   const handleLeftMouseDown = (e) => {
//     e.preventDefault();
//     setIsDraggingLeft(true);
//   };

//   const handleRightMouseDown = (e) => {
//     e.preventDefault();
//     setIsDraggingRight(true);
//   };

//   // Convert margins to positions on the ruler
//   const leftMarkerPosition = `${(margins.left / 8.5) * 100}%`;
//   const rightMarkerPosition = `${((8.5 - margins.right) / 8.5) * 100}%`;

//   return (
//     <div className="w-[8.5in] relative overflow-visible h-[18px] bg-gray-100 flex flex-col">
//       {/* Ruler */}
//       <div
//         ref={rulerRef}
//         className="relative w-full h-[28px] flex items-end"
//         onMouseDown={handleButtonMouseDown}
//       >
//         {/* Tick marks */}
//         {ticks.map((tick, i) => (
//           <div
//             key={i}
//             className="absolute bottom-0 bg-gray-500 flex flex-col items-center"
//             style={{
//               left: `${(tick.position / 8.5) * 100}%`,
//               height: tick.height,
//               width: tick.width,
//               transform: "translateX(-50%)",
//             }}
//           >
//             {tick.label !== null && (
//               <div className="absolute -top-4 text-[10px] text-gray-500 w-6 text-center">
//                 {tick.label}
//               </div>
//             )}
//           </div>
//         ))}

//         {/* Left margin marker (blue triangle) */}
//         <div
//           ref={leftMarkerRef}
//           className="absolute bottom-0 cursor-ew-resize"
//           style={{
//             left: leftMarkerPosition,
//             transform: "translateX(-50%)",
//           }}
//           onMouseDown={handleLeftMouseDown}
//         >
//           <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-blue-500"></div>
//           <div className="h-[20px] w-[1px] bg-blue-500 mx-auto"></div>
//         </div>

//         {/* Right margin marker (blue triangle) */}
//         <div
//           ref={rightMarkerRef}
//           className="absolute bottom-0 cursor-ew-resize"
//           style={{
//             left: rightMarkerPosition,
//             transform: "translateX(-50%)",
//           }}
//           onMouseDown={handleRightMouseDown}
//         >
//           <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-blue-500"></div>
//           <div className="h-[20px] w-[1px] bg-blue-500 mx-auto"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Page = () => {
//   const [value, setValue] = useState("");
//   const [input, setInput] = useState("");
//   const [fontSize, setFontSize] = useState("16");
//   const [margins, setMargins] = useState({
//     top: 1,
//     right: 1,
//     bottom: 1,
//     left: 1,
//   });
//   // Autocomplete state
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [suggestion, setSuggestion] = useState("");
//   const [showingSuggestion, setShowingSuggestion] = useState(false);
//   const [autoCompleteEnabled, setAutoCompleteEnabled] = useState(true);
//   const typingTimerRef = useRef(null);
//   const suggestionRef = useRef({
//     id: null,
//     text: "",
//     range: null,
//     active: false,

//   });

//   // API key for Groq
//   const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

//   const fontsizes = [10, 12, 14, 16, 18, 20];
//   const fontfamilies = [
//     "Inter",
//     "Arial",
//     "Times New Roman",
//     "Georgia",
//     "Verdana",
//     "Helvetica",
//   ];
//   const initialValue = [
//     {
//       type: "paragraph",
//       children: [{ text: "" }],
//     },
//   ];
//   const renderElement = useCallback((props) => {
//     switch (props.element.type) {
//       case "code":
//         return <CodeElement {...props} />;
//       default:
//         return <DefaultElement {...props} />;
//     }
//   }, []);
//   const renderLeaf = useCallback((props) => {
//     return <Leaf {...props} />;
//   }, []);

//   const [editor] = useState(() => withReact(createEditor()));
//   const editorRef = useRef(null);

//   // Function to focus the editor
//   const focusEditor = () => {
//     if (editorRef.current) {
//       editorRef.current.focus();
//     }
//   };

//   // Keep focus on the editor when the component mounts
//   useEffect(() => {
//     focusEditor();
//   }, []);

//   // Get text before cursor for context
//   const getTextBeforeCursor = useCallback(() => {
//     const { selection } = editor;
//     if (!selection) return "";

//     const start = {
//       path: [0, 0],
//       offset: 0,
//     };

//     // Get text from start of document to cursor
//     const range = { anchor: start, focus: selection.focus };
//     return Editor.string(editor, range);
//   }, [editor]);

//   // Get all text for full context
//   const getFullDocumentContext = useCallback(() => {
//     return Node.string(editor);
//   }, [editor]);

//   // Force clear any existing suggestions
//   const forceClearSuggestions = useCallback(() => {
//     if (!editor.selection) return;

//     if (suggestionRef.current.active && suggestionRef.current.range) {
//       try {
//         // Delete suggestion text
//         Transforms.delete(editor, { at: suggestionRef.current.range });

//         // Reset suggestion state
//         suggestionRef.current = {
//           id: null,
//           text: "",
//           range: null,
//           active: false,
//         };

//         setSuggestion("");
//         setShowingSuggestion(false);
//       } catch (error) {
//         console.error("Error clearing suggestion:", error);
//       }
//     }
//   }, [editor]);

//   // Accept the current suggestion
//   const acceptSuggestion = useCallback(() => {
//     if (!showingSuggestion || !suggestionRef.current.active) return;

//     try {
//       const currentRange = suggestionRef.current.range;

//       if (currentRange) {
//         // Remove suggestion formatting
//         Transforms.select(editor, currentRange);
//         Editor.removeMark(editor, "suggestion");

//         // Move cursor to end of accepted text
//         const endPoint = Editor.end(editor, currentRange);
//         Transforms.select(editor, endPoint);
//       }

//       // Reset suggestion state
//       setSuggestion("");
//       setShowingSuggestion(false);
//       suggestionRef.current = {
//         id: null,
//         text: "",
//         range: null,
//         active: false,
//       };
//     } catch (error) {
//       console.error("Error accepting suggestion:", error);
//     }
//   }, [editor, showingSuggestion]);

//   // Generate text completion
//   const generateCompletion = useCallback(async () => {
//     if (!groqApiKey) {
//       console.error(
//         "NEXT_PUBLIC_GROQ_API_KEY not set in environment variables"
//       );
//       return;
//     }

//     if (isGenerating || !autoCompleteEnabled) return;

//     // Clear any existing suggestions
//     if (showingSuggestion) {
//       forceClearSuggestions();
//     }

//     const context = getTextBeforeCursor();
//     const fullContext = getFullDocumentContext();

//     if (!context || context.length < 2) return;

//     setIsGenerating(true);

//     try {
//       // Create unique ID for this suggestion
//       const suggestionId = Date.now().toString();

//       // Call API
//       const response = await fetch(
//         "https://api.groq.com/openai/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${groqApiKey}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             model: "llama3-8b-8192",
//             messages: [
//               {
//                 role: "system",
//                 content:
//                   "You are a text autocompletor. Use context provided and adhere to proper grammar, finish the sentence, start a new one, or finish the word. Do not repeat any part of the original text.",
//               },
//               {
//                 role: "user",
//                 content: `Here is the full document for context: "${fullContext}". The user is currently at this position: "${context}". Complete the following text with ONLY ONE SENTENCE. Write ONLY the continuation after the current position, do not repeat any part of the original. Be concise and clear. DONT surround the answer in markdown or quotes or anything.`,
//               },
//             ],
//             temperature: 0.5,
//             max_tokens: 30,
//             top_p: 0.9,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           errorData.error?.message || "Failed to generate completion"
//         );
//       }

//       const data = await response.json();
//       let completion = data.choices[0]?.message?.content;

//       // Process completion to get just one sentence
//       if (completion) {
//         completion = completion.trim();

//         // Find first sentence terminator
//         const sentenceEndRegex = /[.!?](?:\s|$)/;
//         const match = sentenceEndRegex.exec(completion);

//         if (match) {
//           const endPos = match.index + 1;
//           completion = completion.substring(0, endPos);
//         } else if (completion.length > 50) {
//           completion = completion.substring(0, 50);
//         }
//       }

//       // Insert suggestion if we have valid completion and editor selection
//       if (completion && editor.selection) {
//         const { selection } = editor;

//         // Store suggestion data
//         const startPoint = selection.anchor;
//         const insertRange = {
//           anchor: startPoint,
//           focus: startPoint,
//         };

//         // Insert suggestion with special format
//         Transforms.insertText(editor, completion, { at: startPoint });

//         // Apply suggestion mark to the inserted text
//         const endPoint = {
//           path: startPoint.path,
//           offset: startPoint.offset + completion.length,
//         };

//         const suggestionRange = {
//           anchor: startPoint,
//           focus: endPoint,
//         };

//         Editor.addMark(editor, "suggestion", true);

//         // Update suggestion state
//         suggestionRef.current = {
//           id: suggestionId,
//           text: completion,
//           range: suggestionRange,
//           active: true,
//         };

//         setSuggestion(completion);
//         setShowingSuggestion(true);

//         // Restore cursor to original position
//         Transforms.select(editor, startPoint);
//       }
//     } catch (error) {
//       console.error("Autocomplete error:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [
//     autoCompleteEnabled,
//     editor,
//     forceClearSuggestions,
//     getFullDocumentContext,
//     getTextBeforeCursor,
//     groqApiKey,
//     isGenerating,
//     showingSuggestion,
//   ]);

//   // Check state integrity periodically
//   const verifySuggestionIntegrity = useCallback(() => {
//     if (!editor.selection) return;

//     if (suggestionRef.current.active && !showingSuggestion) {
//       forceClearSuggestions();
//     }

//     if (showingSuggestion && !suggestionRef.current.active) {
//       setShowingSuggestion(false);
//       setSuggestion("");
//     }
//   }, [editor.selection, forceClearSuggestions, showingSuggestion]);

//   // Run integrity check
//   useEffect(() => {
//     const intervalId = setInterval(verifySuggestionIntegrity, 2000);
//     return () => clearInterval(intervalId);
//   }, [verifySuggestionIntegrity]);

//   const toggleBold = () => {
//     const isBold = Editor.marks(editor)?.bold === true;
//     if (isBold) {
//       Editor.removeMark(editor, "bold");
//     } else {
//       Editor.addMark(editor, "bold", true);
//     }
//     focusEditor();
//   };

//   const toggleItalic = () => {
//     const isItalic = Editor.marks(editor)?.italic === true;
//     if (isItalic) {
//       Editor.removeMark(editor, "italic");
//     } else {
//       Editor.addMark(editor, "italic", true);
//     }
//     focusEditor();
//   };

//   const changeFontSize = (size) => {
//     Editor.addMark(editor, "fontSize", size);
//     setFontSize(size.toString());
//     focusEditor();
//   };

//   const handleButtonMouseDown = (e) => {
//     // Prevent default to avoid losing focus
//     e.preventDefault();
//   };

//   const updateMargin = (side, value) => {
//     setMargins((prev) => ({
//       ...prev,
//       [side]: value,
//     }));
//   };

//   const toggleAutoComplete = () => {
//     setAutoCompleteEnabled((prev) => !prev);
//   };

//   return (
//     <div>
//       {/* Toolbar */}
//       <div className="bg-white flex flex-col gap-5 p-10 px-20">
//         <div className="flex justify-between">
//           <div className="flex flex-row gap-5 items-center">
//             <div className="flex gap-2 items-center">
//               <img
//                 src="/assets/icon.png"
//                 alt="logo"
//                 className="w-[30px] h-[30px]"
//               />
//               <p className="font-semibold">WriteAI</p>
//             </div>
//             <p>File</p>
//             <p>Edit</p>
//             <p>View</p>
//             <p>Format</p>
//             <p>Tools</p>
//             <p>Help</p>
//             <p>Settings</p>
//             <p>About</p>
//           </div>
//           <div className="flex flex-row gap-5 items-center">
//             <img
//               src="https://media.licdn.com/dms/image/v2/D4E03AQEQA8VChkxQuw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722657596274?e=1751500800&v=beta&t=mN9feXsua7yqWd5X6FTBXHwL5Bp4PjXXtws8lqdM10k"
//               alt="user"
//               className="w-[50px] h-[50px] rounded-full"
//             />
//           </div>
//         </div>
//         <div className="flex items-center flex-row gap-5 bg-gray-100 p-5 rounded-full">
//           <button
//             className="border-blue-600 w-full border-1 bg-white rounded-full blue p-2"
//             onMouseDown={handleButtonMouseDown}
//           >
//             + Reference
//           </button>
//           <i className="fa-solid fa-magnifying-glass"></i>
//           <i className="fa-solid fa-undo-alt"></i>
//           <i className="fa-solid fa-redo-alt"></i>
//           <i className="fa-solid fa-print"></i>
//           <div className="flex flex-row gap-2">
//             <div className="flex items-center rounded-full bg-white px-[20px] py-[10px] gap-[10px]">
//               <p>{fontfamilies[0]}</p>
//               <i className="fa-solid fa-chevron-down"></i>
//             </div>
//             <div className="flex items-center rounded-full bg-white px-[20px] py-[10px] gap-[10px]">
//               <button
//                 onMouseDown={handleButtonMouseDown}
//                 onClick={() => {
//                   const currentSize = parseInt(fontSize);
//                   const newSize = currentSize - 2;
//                   changeFontSize(newSize);
//                 }}
//                 className="cursor-pointer rounded-full"
//               >
//                 <i className="fa-solid fa-minus"></i>
//               </button>
//               <input
//                 type="text"
//                 value={fontSize}
//                 onMouseDown={handleButtonMouseDown}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === "" || /^\d+$/.test(value)) {
//                     if (parseInt(value) > 400) {
//                       changeFontSize(400);
//                     } else if (value !== "") {
//                       changeFontSize(parseInt(value));
//                     } else {
//                       setFontSize("");
//                     }
//                   }
//                 }}
//                 onBlur={focusEditor}
//                 className="outline-none w-[50px] text-center"
//               />
//               <button
//                 onMouseDown={handleButtonMouseDown}
//                 onClick={() => {
//                   const currentSize = parseInt(fontSize);
//                   const newSize = currentSize + 2;
//                   changeFontSize(newSize);
//                 }}
//                 className="cursor-pointer rounded-full"
//               >
//                 <i className="fa-solid fa-plus"></i>
//               </button>
//             </div>
//           </div>
//           <i
//             className="fa-solid fa-bold cursor-pointer"
//             onMouseDown={handleButtonMouseDown}
//             onClick={toggleBold}
//           ></i>
//           <i
//             className="fa-solid fa-italic cursor-pointer"
//             onMouseDown={handleButtonMouseDown}
//             onClick={toggleItalic}
//           ></i>
//           <i className="fa-solid fa-strikethrough"></i>
//           <p className="font-semibold text-[18px] py-[0px] border-b-3 blue border-blue-600">
//             A
//           </p>
//           <div className="font-semibold text-[18px] blue-bg text-white w-[20px] h-[20px] aspect-square flex items-center justify-center leading-none ">
//             <p className="text-center">A</p>
//           </div>
//           <i className="fa-solid fa-link"></i>
//           <i className="fa-solid fa-image"></i>
//           <i className="fa-solid fa-align-left"></i>
//           <i className="fa-solid fa-align-center"></i>
//           <i className="fa-solid fa-align-right"></i>
//           <i className="fa-solid fa-align-justify"></i>
//           <i className="fa-solid fa-list-ul"></i>
//           <i className="fa-solid fa-list-ol"></i>
//           <button
//             className={`border-blue-600 border-1 w-full justify-center flex flex-row gap-2 ${
//               autoCompleteEnabled ? "bg-blue-50" : "bg-white"
//             } rounded-full blue p-2`}
//             onMouseDown={handleButtonMouseDown}
//             onClick={toggleAutoComplete}
//           >
//             <p>Auto-complete</p>
//             {autoCompleteEnabled && <i className="fa-solid fa-check"></i>}
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-row justify-center w-full border-b border-gray-300">
//         <Ruler
//           margins={margins}
//           updateMargin={updateMargin}
//           handleButtonMouseDown={handleButtonMouseDown}
//         />
//       </div>
//       <div className="flex flex-col box-border items-center bg-gray-100 justify-center p-10">
//         <div className="flex flex-col items-center">
//           {/* Horizontal ruler with margin controls */}

//           <div
//             className="w-[8.5in] aspect-[8.5/11] bg-white shadow-lg relative"
//             onClick={focusEditor}
//           >
//             <div
//               className="absolute inset-0"
//               style={{
//                 padding: `${margins.top}in ${margins.right}in ${margins.bottom}in ${margins.left}in`,
//               }}
//             >
//               <Slate
//                 editor={editor}
//                 initialValue={initialValue}
//                 onChange={(value) => {
//                   const isAstChange = editor.operations.some(
//                     (op) => "set_selection" !== op.type
//                   );
//                   if (isAstChange) {
//                     // Save the value to Local Storage.
//                     const content = JSON.stringify(value);
//                     localStorage.setItem("content", content);

//                     // If user typed something, clear suggestions and schedule new ones
//                     if (showingSuggestion) {
//                       forceClearSuggestions();
//                     }

//                     // Check if there was an actual text change (not just formatting)
//                     const hasTextChange = editor.operations.some(
//                       (op) =>
//                         op.type === "insert_text" || op.type === "remove_text"
//                     );

//                     if (hasTextChange && autoCompleteEnabled) {
//                       // Cancel any pending suggestion timer
//                       if (typingTimerRef.current) {
//                         clearTimeout(typingTimerRef.current);
//                       }

//                       // Analyze if this might be end of sentence or phrase
//                       const lastOp =
//                         editor.operations[editor.operations.length - 1];
//                       const isEndOfPhrase =
//                         lastOp?.type === "insert_text" &&
//                         [" ", ".", ",", "!", "?", ":"].includes(lastOp.text);

//                       if (isEndOfPhrase) {
//                         // Generate suggestion quickly after end of phrase
//                         typingTimerRef.current = setTimeout(() => {
//                           generateCompletion();
//                         }, 300);
//                       } else {
//                         // Otherwise wait a bit longer
//                         typingTimerRef.current = setTimeout(() => {
//                           generateCompletion();
//                         }, 1000);
//                       }
//                     }
//                   }
//                 }}
//               >
//                 <Editable
//                   ref={editorRef}
//                   renderLeaf={renderLeaf}
//                   className="outline-none w-full h-full min-h-[9in]"
//                   renderElement={renderElement}
//                   onKeyDown={(event) => {
//                     if (
//                       (event.ctrlKey || event.metaKey) &&
//                       event.key.toLowerCase() === "b"
//                     ) {
//                       event.preventDefault();
//                       toggleBold();
//                     }

//                     if (
//                       (event.ctrlKey || event.metaKey) &&
//                       event.key.toLowerCase() === "i"
//                     ) {
//                       event.preventDefault();
//                       toggleItalic();
//                     }

//                     // Accept suggestion with Tab key
//                     if (event.key === "Tab" && showingSuggestion) {
//                       event.preventDefault();
//                       acceptSuggestion();
//                     }

//                     // Clear suggestion on any key except Tab
//                     if (showingSuggestion && event.key !== "Tab") {
//                       forceClearSuggestions();
//                     }
//                   }}
//                 />
//               </Slate>
//             </div>

//             {/* Visual margin indicators */}
//             <div
//               className="absolute top-0 left-0 bottom-0 border-r border-dashed border-gray-300"
//               style={{ width: `${margins.left}in` }}
//             ></div>
//             <div
//               className="absolute top-0 right-0 bottom-0 border-l border-dashed border-gray-300"
//               style={{ width: `${margins.right}in` }}
//             ></div>

//             {/* Autocomplete tip */}
//             <div className="absolute bottom-3 left-0 right-0 flex justify-center">
//               <div className="text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full shadow-sm">
//                 Press Tab to accept suggestions
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
