// "use client";

// import React, {
//   useState,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
// } from "react";
// import { createEditor, Editor, Transforms, Text, Range } from "slate";
// import { Slate, Editable, withReact, useSlate } from "slate-react";

// // ---------------------------------------------------------------------------
// // Configuration Constants
// // ---------------------------------------------------------------------------

// // Available fonts with display name and CSS class
// const FONTS = [
//   { name: "Arial", value: "font-sans" },
//   { name: "Times New Roman", value: "font-serif" },
//   { name: "Courier New", value: "font-mono" },
//   { name: "Roboto", value: "font-[Roboto]" },
//   { name: "Open Sans", value: "font-[Open_Sans]" },
//   { name: "Lato", value: "font-[Lato]" },
//   { name: "Montserrat", value: "font-[Montserrat]" },
// ];

// // Available font sizes with display name and CSS class
// const FONT_SIZES = [
//   { name: "8", value: "text-xs" },
//   { name: "10", value: "text-sm" },
//   { name: "12", value: "text-base" },
//   { name: "14", value: "text-lg" },
//   { name: "18", value: "text-xl" },
//   { name: "24", value: "text-2xl" },
//   { name: "30", value: "text-3xl" },
//   { name: "36", value: "text-4xl" },
// ];

// // Common colors for text and background
// const COLORS = [
//   { name: "Black", value: "text-black", bgValue: "bg-black" },
//   { name: "Gray", value: "text-gray-500", bgValue: "bg-gray-500" },
//   { name: "Red", value: "text-red-500", bgValue: "bg-red-500" },
//   { name: "Orange", value: "text-orange-500", bgValue: "bg-orange-500" },
//   { name: "Yellow", value: "text-yellow-500", bgValue: "bg-yellow-500" },
//   { name: "Green", value: "text-green-500", bgValue: "bg-green-500" },
//   { name: "Blue", value: "text-blue-500", bgValue: "bg-blue-500" },
//   { name: "Purple", value: "text-purple-500", bgValue: "bg-purple-500" },
//   { name: "Pink", value: "text-pink-500", bgValue: "bg-pink-500" },
// ];

// // Available text alignments
// const ALIGNMENTS = [
//   { name: "Left", value: "text-left" },
//   { name: "Center", value: "text-center" },
//   { name: "Right", value: "text-right" },
//   { name: "Justify", value: "text-justify" },
// ];

// // SVG icons for formatting controls
// const ICONS = {
//   bold: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M15.6 11.8c1-.7 1.6-1.8 1.6-2.8a4 4 0 0 0-4-4H7v14h7.1a4 4 0 0 0 4-4c0-1.3-.8-2.4-2.1-3.1zM10 7.5h3c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-3v-3zm3.5 9h-3.5v-3h3.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" />
//     </svg>
//   ),
//   italic: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M10 5v3h2.2l-3.4 8H6v3h8v-3h-2.2l3.4-8H18V5h-8z" />
//     </svg>
//   ),
//   underline: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M12 17c3.3 0 6-2.7 6-6V3h-2.5v8c0 1.9-1.6 3.5-3.5 3.5S8.5 12.9 8.5 11V3H6v8c0 3.3 2.7 6 6 6zm-7 2v2h14v-2H5z" />
//     </svg>
//   ),
//   textColor: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M11 2l-5.5 14h3L9.8 13h4.4l1.3 3h3L13 2h-2zm.8 3.8l1.7 4.2H10l1.8-4.2z" />
//     </svg>
//   ),
//   bgColor: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M16.56 8.94L7.62 0L6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z" />
//       <path fillOpacity=".36" d="M0 20h24v4H0z" />
//     </svg>
//   ),
//   alignLeft: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M3 3h18v2H3V3zm0 8h18v2H3v-2zm0 8h18v2H3v-2zm0-4h12v2H3v-2zm0-8h12v2H3V7z" />
//     </svg>
//   ),
//   alignCenter: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M3 3h18v2H3V3zm4 8h10v2H7v-2zm4 8h2v2h-2v-2zM3 15h18v2H3v-2zm4-8h10v2H7V7z" />
//     </svg>
//   ),
//   alignRight: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M3 3h18v2H3V3zm6 8h12v2H9v-2zm8 8h4v2h-4v-2zM3 15h18v2H3v-2zm10-8h8v2h-8V7z" />
//     </svg>
//   ),
//   alignJustify: (
//     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M3 3h18v2H3V3zm0 8h18v2H3v-2zm0 8h18v2H3v-2zm0-4h18v2H3v-2zm0-8h18v2H3V7z" />
//     </svg>
//   ),
// };

// // Initial editor content
// const INITIAL_VALUE = [
//   {
//     type: "paragraph",
//     children: [{ text: "", fontSize: "text-base", fontFamily: "font-sans" }],
//     align: "text-left",
//   },
// ];

// // Default format settings for new text
// const DEFAULT_FORMATS = {
//   fontSize: FONT_SIZES[2].value,
//   fontFamily: FONTS[0].value,
//   textColor: COLORS[0].value,
//   bgColor: null,
//   align: ALIGNMENTS[0].value,
//   bold: false,
//   italic: false,
//   underline: false,
// };

// // Common constants
// const MIXED_FORMAT = "mixed";
// const UPDATE_DELAY = 10;
// const UPDATE_RESET_DELAY = 50;

// // ---------------------------------------------------------------------------
// // Format Utility Functions
// // ---------------------------------------------------------------------------

// /**
//  * Get formatting from current selection or cursor position
//  * @param {Object} editor - Slate editor instance
//  * @param {String} format - Format property to check
//  * @returns {String|Boolean} - Format value or 'mixed' if selection has multiple values
//  */
// const getFormatFromSelection = (editor, format) => {
//   if (!editor.selection) return DEFAULT_FORMATS[format];

//   try {
//     if (Range.isCollapsed(editor.selection)) {
//       // For cursor position, get format at specific point
//       const { anchor } = editor.selection;
//       const [node] = Editor.node(editor, anchor.path);

//       // Return node's format or default
//       return node[format] !== undefined
//         ? node[format]
//         : DEFAULT_FORMATS[format];
//     } else {
//       // For selected text, check if all nodes have same format
//       const nodes = Array.from(
//         Editor.nodes(editor, {
//           match: Text.isText,
//           at: editor.selection,
//         })
//       );

//       if (nodes.length === 0) return DEFAULT_FORMATS[format];

//       // Collect unique format values
//       const uniqueFormats = new Set();

//       for (const [node] of nodes) {
//         uniqueFormats.add(node[format] !== undefined ? node[format] : null);
//       }

//       // If only one unique format, return it
//       if (uniqueFormats.size === 1) {
//         const formatValue = Array.from(uniqueFormats)[0];
//         return formatValue !== null ? formatValue : DEFAULT_FORMATS[format];
//       } else {
//         return MIXED_FORMAT;
//       }
//     }
//   } catch (error) {
//     return DEFAULT_FORMATS[format];
//   }
// };

// /**
//  * Toggle formatting like bold/italic/underline
//  * @param {Object} editor - Slate editor instance
//  * @param {String} format - Format to toggle
//  */
// const toggleFormat = (editor, format) => {
//   const isActive = isFormatActive(editor, format);

//   // Toggle format for future typing
//   DEFAULT_FORMATS[format] = !isActive;

//   // Apply to selection if text is selected
//   if (editor.selection && !Range.isCollapsed(editor.selection)) {
//     Transforms.setNodes(
//       editor,
//       { [format]: isActive ? null : true },
//       { match: Text.isText, split: true }
//     );
//   }
// };

// /**
//  * Check if format is active in current selection
//  * @param {Object} editor - Slate editor instance
//  * @param {String} format - Format to check
//  * @returns {Boolean} - Whether format is active
//  */
// const isFormatActive = (editor, format) => {
//   // Check selection if it exists and isn't collapsed
//   if (editor.selection && !Range.isCollapsed(editor.selection)) {
//     const [match] = Editor.nodes(editor, {
//       match: (n) => n[format] === true,
//       mode: "all",
//     });
//     return !!match;
//   }

//   // Otherwise use default format state
//   return !!DEFAULT_FORMATS[format];
// };

// /**
//  * Apply font size to selection or set default
//  * @param {Object} editor - Slate editor instance
//  * @param {String} fontSize - Font size CSS class
//  */
// const applyFontSize = (editor, fontSize) => {
//   // Update default for future typing
//   DEFAULT_FORMATS.fontSize = fontSize;

//   // Apply to selection if text is selected
//   if (editor.selection && !Range.isCollapsed(editor.selection)) {
//     Transforms.setNodes(
//       editor,
//       { fontSize },
//       { match: Text.isText, split: true }
//     );
//   }
// };

// /**
//  * Apply font family to selection or set default
//  * @param {Object} editor - Slate editor instance
//  * @param {String} fontFamily - Font family CSS class
//  */
// const applyFontFamily = (editor, fontFamily) => {
//   // Update default for future typing
//   DEFAULT_FORMATS.fontFamily = fontFamily;

//   // Apply to selection if text is selected
//   if (editor.selection && !Range.isCollapsed(editor.selection)) {
//     Transforms.setNodes(
//       editor,
//       { fontFamily },
//       { match: Text.isText, split: true }
//     );
//   }
// };

// /**
//  * Apply text color to selection or set default
//  * @param {Object} editor - Slate editor instance
//  * @param {String} textColor - Text color CSS class
//  */
// const applyTextColor = (editor, textColor) => {
//   // Update default for future typing
//   DEFAULT_FORMATS.textColor = textColor;

//   // Apply to selection if text is selected
//   if (editor.selection && !Range.isCollapsed(editor.selection)) {
//     Transforms.setNodes(
//       editor,
//       { textColor },
//       { match: Text.isText, split: true }
//     );
//   }
// };

// /**
//  * Apply background color to selection or set default
//  * @param {Object} editor - Slate editor instance
//  * @param {String} bgColor - Background color CSS class
//  */
// const applyBgColor = (editor, bgColor) => {
//   // Update default for future typing
//   DEFAULT_FORMATS.bgColor = bgColor;

//   // Apply to selection if text is selected
//   if (editor.selection && !Range.isCollapsed(editor.selection)) {
//     Transforms.setNodes(
//       editor,
//       { bgColor },
//       { match: Text.isText, split: true }
//     );
//   }
// };

// /**
//  * Apply text alignment to block elements containing the selection
//  * @param {Object} editor - Slate editor instance
//  * @param {String} alignment - Alignment CSS class
//  */
// const applyAlignment = (editor, alignment) => {
//   // Update default for future blocks
//   DEFAULT_FORMATS.align = alignment;

//   // Apply to current blocks
//   Transforms.setNodes(
//     editor,
//     { align: alignment },
//     { match: (n) => Editor.isBlock(editor, n) }
//   );
// };

// /**
//  * Get current alignment from selected block
//  * @param {Object} editor - Slate editor instance
//  * @returns {String} - Current alignment or mixed
//  */
// const getCurrentAlignment = (editor) => {
//   if (!editor.selection) return DEFAULT_FORMATS.align;

//   // Get nodes at current selection
//   const nodes = Array.from(
//     Editor.nodes(editor, {
//       match: (n) => Editor.isBlock(editor, n),
//       at: editor.selection,
//     })
//   );

//   if (nodes.length === 0) return DEFAULT_FORMATS.align;

//   // Check if all nodes have the same alignment
//   const alignments = new Set(nodes.map(([node]) => node.align));

//   if (alignments.size === 1) {
//     // Fixed array destructuring to properly access the node
//     const firstNode = nodes[0][0];
//     return firstNode.align || DEFAULT_FORMATS.align;
//   }

//   return MIXED_FORMAT;
// };

// // ---------------------------------------------------------------------------
// // Custom Slate Editor Plugins
// // ---------------------------------------------------------------------------

// /**
//  * Enhance Slate editor with default formatting capabilities
//  * @param {Object} editor - Base Slate editor
//  * @returns {Object} - Enhanced editor
//  */
// const withDefaultFormats = (editor) => {
//   const { insertText, insertBreak, deleteBackward, deleteForward } = editor;

//   // Apply current formatting when inserting text
//   editor.insertText = (text) => {
//     if (editor.selection && Range.isCollapsed(editor.selection)) {
//       const formattedText = {
//         text,
//         fontSize: DEFAULT_FORMATS.fontSize,
//         fontFamily: DEFAULT_FORMATS.fontFamily,
//         textColor: DEFAULT_FORMATS.textColor,
//         bgColor: DEFAULT_FORMATS.bgColor,
//         bold: !!DEFAULT_FORMATS.bold,
//         italic: !!DEFAULT_FORMATS.italic,
//         underline: !!DEFAULT_FORMATS.underline,
//       };

//       Transforms.insertNodes(editor, formattedText);
//     } else {
//       insertText(text);
//     }
//   };

//   // Maintain formatting on line breaks
//   editor.insertBreak = () => {
//     insertBreak();

//     if (editor.selection && Range.isCollapsed(editor.selection)) {
//       const currentFormatting = {
//         fontSize: DEFAULT_FORMATS.fontSize,
//         fontFamily: DEFAULT_FORMATS.fontFamily,
//         textColor: DEFAULT_FORMATS.textColor,
//         bgColor: DEFAULT_FORMATS.bgColor,
//         bold: !!DEFAULT_FORMATS.bold,
//         italic: !!DEFAULT_FORMATS.italic,
//         underline: !!DEFAULT_FORMATS.underline,
//       };

//       Transforms.setNodes(editor, currentFormatting, { match: Text.isText });
//     }
//   };

//   // Track formatting during delete operations
//   const trackAndResetFormat = (operation, unit) => {
//     if (editor.selection && Range.isCollapsed(editor.selection)) {
//       try {
//         const { anchor } = editor.selection;
//         const [node] = Editor.node(editor, anchor.path);

//         // Store active formats
//         if (node.bold) DEFAULT_FORMATS.bold = true;
//         if (node.italic) DEFAULT_FORMATS.italic = true;
//         if (node.underline) DEFAULT_FORMATS.underline = true;

//         // Update font and color properties
//         if (node.fontSize) DEFAULT_FORMATS.fontSize = node.fontSize;
//         if (node.fontFamily) DEFAULT_FORMATS.fontFamily = node.fontFamily;
//         if (node.textColor) DEFAULT_FORMATS.textColor = node.textColor;
//         if (node.bgColor) DEFAULT_FORMATS.bgColor = node.bgColor;
//       } catch (error) {
//         // Ignore errors getting node
//       }

//       operation(unit);
//     } else {
//       operation(unit);
//     }
//   };

//   // Override delete operations
//   editor.deleteBackward = (unit) => trackAndResetFormat(deleteBackward, unit);
//   editor.deleteForward = (unit) => trackAndResetFormat(deleteForward, unit);

//   return editor;
// };

// // ---------------------------------------------------------------------------
// // UI Components
// // ---------------------------------------------------------------------------

// // Dropdown base component to reduce duplication
// const FormatDropdown = ({
//   options,
//   currentValue,
//   isMixed,
//   onSelect,
//   valueKey = "name",
//   showOptionStyles = false,
// }) => {
//   return (
//     <div className="relative inline-block mr-2">
//       <select
//         className={`appearance-none px-2 py-0.5 pr-6 rounded text-sm outline-none cursor-pointer ${
//           isMixed ? "bg-gray-200 italic" : "bg-gray-100"
//         }`}
//         value={isMixed ? MIXED_FORMAT : currentValue}
//         onChange={(e) => {
//           if (e.target.value !== MIXED_FORMAT) {
//             onSelect(e.target.value);
//           }
//         }}
//       >
//         {isMixed && <option value={MIXED_FORMAT}>Mixed</option>}
//         {options.map((option) => (
//           <option
//             key={option[valueKey]}
//             value={option[valueKey]}
//             style={
//               showOptionStyles
//                 ? { fontFamily: option[valueKey].replace(/\s/g, "_") }
//                 : {}
//             }
//           >
//             {option[valueKey]}
//           </option>
//         ))}
//       </select>
//       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5">
//         <svg
//           className="h-4 w-4 text-gray-500"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// };

// /**
//  * Format button component for bold/italic/underline
//  */
// const FormatButton = ({ format }) => {
//   const editor = useSlate();
//   const isActive = isFormatActive(editor, format);

//   return (
//     <button
//       className={`px-2 py-0.5 border-none rounded ${
//         isActive ? "bg-gray-300" : "bg-gray-100"
//       }`}
//       onMouseDown={(event) => {
//         event.preventDefault();
//         toggleFormat(editor, format);
//       }}
//     >
//       {ICONS[format]}
//     </button>
//   );
// };

// /**
//  * Font Family dropdown selector
//  */
// const FontFamilyDropdown = () => {
//   const editor = useSlate();
//   const [currentFont, setCurrentFont] = useState(
//     FONTS.find((f) => f.value === DEFAULT_FORMATS.fontFamily) || FONTS[0]
//   );
//   const [isMixed, setIsMixed] = useState(false);
//   const [dropdownValue, setDropdownValue] = useState(currentFont.name);
//   const isUpdatingRef = useRef(false);

//   // Update based on editor selection changes
//   useEffect(() => {
//     if (isUpdatingRef.current) return;

//     const timeout = setTimeout(() => {
//       updateFontFamily();
//     }, UPDATE_DELAY);

//     return () => clearTimeout(timeout);
//   }, [editor.selection, editor.operations]);

//   // Update font family state based on current selection
//   const updateFontFamily = () => {
//     if (!editor.selection || isUpdatingRef.current) return;

//     isUpdatingRef.current = true;

//     try {
//       const fontFamily = getFormatFromSelection(editor, "fontFamily");

//       if (fontFamily === MIXED_FORMAT) {
//         setIsMixed(true);
//         setDropdownValue(MIXED_FORMAT);
//       } else {
//         // Get the actual font from the CSS class value
//         const font = FONTS.find((f) => f.value === fontFamily);
//         if (font) {
//           setIsMixed(false);
//           setCurrentFont(font);
//           setDropdownValue(font.name);
//         } else {
//           // Use default if not found
//           const defaultFont =
//             FONTS.find((f) => f.value === DEFAULT_FORMATS.fontFamily) ||
//             FONTS[0];
//           setIsMixed(false);
//           setCurrentFont(defaultFont);
//           setDropdownValue(defaultFont.name);
//         }
//       }
//     } finally {
//       setTimeout(() => {
//         isUpdatingRef.current = false;
//       }, UPDATE_RESET_DELAY);
//     }
//   };

//   // Load Google Fonts
//   useEffect(() => {
//     const link = document.createElement("link");
//     link.href =
//       "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);

//     return () => {
//       try {
//         document.head.removeChild(link);
//       } catch (e) {
//         // Ignore errors if link was already removed
//       }
//     };
//   }, []);

//   // Handle font selection
//   const handleFontSelect = (fontName) => {
//     isUpdatingRef.current = true;
//     const selected = FONTS.find((font) => font.name === fontName);

//     if (selected) {
//       setCurrentFont(selected);
//       setIsMixed(false);
//       setDropdownValue(fontName);
//       applyFontFamily(editor, selected.value);

//       setTimeout(() => {
//         isUpdatingRef.current = false;
//       }, UPDATE_RESET_DELAY);
//     }
//   };

//   return (
//     <FormatDropdown
//       options={FONTS}
//       currentValue={currentFont.name}
//       isMixed={isMixed}
//       onSelect={handleFontSelect}
//       showOptionStyles={true}
//     />
//   );
// };

// /**
//  * Font Size dropdown selector
//  */
// const FontSizeDropdown = () => {
//   const editor = useSlate();
//   const [currentSize, setCurrentSize] = useState(
//     FONT_SIZES.find((s) => s.value === DEFAULT_FORMATS.fontSize) ||
//       FONT_SIZES[2]
//   );
//   const [isMixed, setIsMixed] = useState(false);
//   const [dropdownValue, setDropdownValue] = useState(currentSize.name);
//   const isUpdatingRef = useRef(false);

//   // Update based on editor selection changes
//   useEffect(() => {
//     if (isUpdatingRef.current) return;

//     const timeout = setTimeout(() => {
//       updateFontSize();
//     }, UPDATE_DELAY);

//     return () => clearTimeout(timeout);
//   }, [editor.selection, editor.operations]);

//   // Update font size state based on current selection
//   const updateFontSize = () => {
//     if (!editor.selection || isUpdatingRef.current) return;

//     isUpdatingRef.current = true;

//     try {
//       const fontSize = getFormatFromSelection(editor, "fontSize");

//       if (fontSize === MIXED_FORMAT) {
//         setIsMixed(true);
//         setDropdownValue(MIXED_FORMAT);
//       } else {
//         // Get the actual size from the CSS class value
//         const size = FONT_SIZES.find((s) => s.value === fontSize);
//         if (size) {
//           setIsMixed(false);
//           setCurrentSize(size);
//           setDropdownValue(size.name);
//         } else {
//           // Use default if not found
//           const defaultSize =
//             FONT_SIZES.find((s) => s.value === DEFAULT_FORMATS.fontSize) ||
//             FONT_SIZES[2];
//           setIsMixed(false);
//           setCurrentSize(defaultSize);
//           setDropdownValue(defaultSize.name);
//         }
//       }
//     } finally {
//       setTimeout(() => {
//         isUpdatingRef.current = false;
//       }, UPDATE_RESET_DELAY);
//     }
//   };

//   // Handle font size selection
//   const handleSizeSelect = (sizeName) => {
//     isUpdatingRef.current = true;
//     const selected = FONT_SIZES.find((size) => size.name === sizeName);

//     if (selected) {
//       setCurrentSize(selected);
//       setIsMixed(false);
//       setDropdownValue(sizeName);
//       applyFontSize(editor, selected.value);

//       setTimeout(() => {
//         isUpdatingRef.current = false;
//       }, UPDATE_RESET_DELAY);
//     }
//   };

//   return (
//     <FormatDropdown
//       options={FONT_SIZES}
//       currentValue={currentSize.name}
//       isMixed={isMixed}
//       onSelect={handleSizeSelect}
//     />
//   );
// };

// /**
//  * Color picker dropdown for text or background color
//  */
// const ColorPickerDropdown = ({ isBackground = false }) => {
//   const editor = useSlate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const formatType = isBackground ? "bgColor" : "textColor";
//   const defaultColor = isBackground ? null : COLORS[0].value;

//   // Track current color
//   const [currentColor, setCurrentColor] = useState(
//     DEFAULT_FORMATS[formatType] || defaultColor
//   );

//   // Update color display when selection or cursor position changes
//   useEffect(() => {
//     if (!editor.selection) return;

//     const timeout = setTimeout(() => {
//       updateCurrentColor();
//     }, UPDATE_DELAY);

//     return () => clearTimeout(timeout);
//   }, [editor.selection, editor.operations]);

//   // Update current color based on selection or cursor position
//   const updateCurrentColor = () => {
//     if (!editor.selection) return;

//     const color = getFormatFromSelection(editor, formatType);

//     if (color === MIXED_FORMAT) {
//       // If mixed, keep the current color for display
//       return;
//     }

//     setCurrentColor(color || defaultColor);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Apply selected color
//   const handleColorSelect = (colorValue) => {
//     if (isBackground) {
//       applyBgColor(editor, colorValue);
//     } else {
//       applyTextColor(editor, colorValue);
//     }
//     setCurrentColor(colorValue || defaultColor);
//     setDropdownOpen(false);
//   };

//   // Get color display value
//   const getColorSample = (colorValue) => {
//     if (!colorValue && isBackground) return "transparent";

//     // Extract color from Tailwind class
//     const colorMatch = colorValue
//       ? colorValue.match(/(?:text|bg)-([a-z]+-[0-9]+|black|white)/)
//       : null;
//     if (colorMatch) {
//       const colorName = colorMatch[1];
//       if (colorName === "black") return "#000";
//       if (colorName === "white") return "#fff";

//       // For simplicity, using a basic mapping for common colors
//       const colorMap = {
//         "red-500": "#ef4444",
//         "blue-500": "#3b82f6",
//         "green-500": "#22c55e",
//         "yellow-500": "#eab308",
//         "orange-500": "#f97316",
//         "purple-500": "#a855f7",
//         "pink-500": "#ec4899",
//         "gray-500": "#6b7280",
//       };

//       return colorMap[colorName] || "#000";
//     }

//     return "#000";
//   };

//   // Get active color name for tooltip
//   const getActiveColorName = () => {
//     if (!currentColor && isBackground) return "No Color";

//     const matchingColor = COLORS.find(
//       (color) => color[isBackground ? "bgValue" : "value"] === currentColor
//     );

//     return matchingColor ? matchingColor.name : "Custom";
//   };

//   return (
//     <div className="relative inline-block mr-2" ref={dropdownRef}>
//       <button
//         className="flex items-center px-2 py-0.5 bg-gray-100 rounded hover:bg-gray-200"
//         onClick={() => setDropdownOpen(!dropdownOpen)}
//         title={`${
//           isBackground ? "Background" : "Text"
//         } color: ${getActiveColorName()}`}
//       >
//         {ICONS[isBackground ? "bgColor" : "textColor"]}
//         <div
//           className="ml-1 w-3 h-3 rounded border border-gray-400"
//           style={{
//             backgroundColor: getColorSample(currentColor),
//             borderColor: isBackground && !currentColor ? "#ccc" : "transparent",
//           }}
//         />
//       </button>

//       {dropdownOpen && (
//         <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-200 rounded shadow-lg z-10 grid grid-cols-5 gap-1 w-[150px]">
//           {isBackground && (
//             <button
//               onClick={() => handleColorSelect(null)}
//               className={`w-6 h-6 rounded border ${
//                 currentColor === null
//                   ? "border-blue-500 border-2"
//                   : "border-gray-300"
//               } flex items-center justify-center`}
//               title="No Color"
//             >
//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
//               </svg>
//             </button>
//           )}

//           {COLORS.map((color) => {
//             const colorValue = isBackground ? color.bgValue : color.value;
//             const isActive = colorValue === currentColor;

//             return (
//               <button
//                 key={color.name}
//                 onClick={() => handleColorSelect(colorValue)}
//                 className={`w-6 h-6 rounded ${
//                   isActive
//                     ? "border-blue-500 border-2"
//                     : "border-gray-300 border"
//                 }`}
//                 style={{
//                   backgroundColor: getColorSample(colorValue),
//                 }}
//                 title={color.name}
//               />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// /**
//  * Alignment button component
//  */
// const AlignmentButton = ({ alignment }) => {
//   const editor = useSlate();
//   const currentAlignment = getCurrentAlignment(editor);
//   const isActive = currentAlignment === alignment;

//   // Map alignment value to icon key
//   const getIconKey = (align) => {
//     const map = {
//       "text-left": "alignLeft",
//       "text-center": "alignCenter",
//       "text-right": "alignRight",
//       "text-justify": "alignJustify",
//     };
//     return map[align] || "alignLeft";
//   };

//   // Get alignment name for title
//   const getAlignmentName = (align) => {
//     return ALIGNMENTS.find((a) => a.value === align)?.name || "Align Left";
//   };

//   return (
//     <button
//       className={`px-2 py-0.5 border-none rounded ${
//         isActive ? "bg-gray-300" : "bg-gray-100"
//       }`}
//       onMouseDown={(event) => {
//         event.preventDefault();
//         applyAlignment(editor, alignment);
//       }}
//       title={getAlignmentName(alignment)}
//     >
//       {ICONS[getIconKey(alignment)]}
//     </button>
//   );
// };

// // ---------------------------------------------------------------------------
// // Toolbar Component
// // ---------------------------------------------------------------------------

// /**
//  * Editor toolbar with formatting controls
//  */
// const Toolbar = () => {
//   return (
//     <div className="flex mb-2 gap-1 p-1 border-b border-gray-200 items-center flex-wrap">
//       <FontFamilyDropdown />
//       <FontSizeDropdown />
//       <div className="h-4 w-px bg-gray-300 mx-1"></div>
//       <FormatButton format="bold" />
//       <FormatButton format="italic" />
//       <FormatButton format="underline" />
//       <div className="h-4 w-px bg-gray-300 mx-1"></div>
//       <ColorPickerDropdown isBackground={false} />
//       <ColorPickerDropdown isBackground={true} />
//       <div className="h-4 w-px bg-gray-300 mx-1"></div>
//       <AlignmentButton alignment="text-left" />
//       <AlignmentButton alignment="text-center" />
//       <AlignmentButton alignment="text-right" />
//       <AlignmentButton alignment="text-justify" />
//     </div>
//   );
// };

// // ---------------------------------------------------------------------------
// // Main Component
// // ---------------------------------------------------------------------------

// /**
//  * Main Slate editor component
//  */
// const SlatePage = () => {
//   const [editor] = useState(() =>
//     withDefaultFormats(withReact(createEditor()))
//   );
//   const [value, setValue] = useState(INITIAL_VALUE);

//   // Rendering functions for elements
//   const renderElement = useCallback((props) => {
//     const alignment = props.element.align || DEFAULT_FORMATS.align;

//     switch (props.element.type) {
//       case "heading-one":
//         return (
//           <h1 {...props.attributes} className={alignment}>
//             {props.children}
//           </h1>
//         );
//       case "heading-two":
//         return (
//           <h2 {...props.attributes} className={alignment}>
//             {props.children}
//           </h2>
//         );
//       default:
//         return (
//           <p {...props.attributes} className={alignment}>
//             {props.children}
//           </p>
//         );
//     }
//   }, []);

//   // Rendering function for text with formatting
//   const renderLeaf = useCallback((props) => {
//     let className = "";
//     if (props.leaf.bold) className += "font-bold ";
//     if (props.leaf.italic) className += "italic ";
//     if (props.leaf.underline) className += "underline ";
//     if (props.leaf.fontSize) className += props.leaf.fontSize + " ";
//     if (props.leaf.fontFamily) className += props.leaf.fontFamily + " ";
//     if (props.leaf.textColor) className += props.leaf.textColor + " ";
//     if (props.leaf.bgColor) className += props.leaf.bgColor + " ";

//     return (
//       <span {...props.attributes} className={className}>
//         {props.children}
//       </span>
//     );
//   }, []);

//   // Handle content changes
//   const handleEditorChange = useCallback((newValue) => {
//     setValue(newValue);
//   }, []);

//   // Memoized toolbar to prevent unnecessary re-renders
//   const memoizedToolbar = useMemo(() => <Toolbar />, []);

//   return (
//     <div className="max-w-[8.5in] mx-auto my-8 p-4 shadow-md rounded bg-white min-h-[11in]">
//       <Slate
//         editor={editor}
//         initialValue={INITIAL_VALUE}
//         onChange={handleEditorChange}
//       >
//         {memoizedToolbar}
//         <Editable
//           renderElement={renderElement}
//           renderLeaf={renderLeaf}
//           className="min-h-[10in] outline-none font-sans leading-relaxed slate-editable"
//           placeholder="Type something..."
//         />
//       </Slate>
//     </div>
//   );
// };

// export default SlatePage;
