// "use client";

// import React, { useState, useEffect } from "react";
// import { createEditor } from "slate";
// import { Slate, Editable, withReact } from "slate-react";
// import { withHistory } from "slate-history";

// // Define a valid initial value for Slate
// const initialValue = [
//   {
//     type: "paragraph",
//     children: [{ text: "Hello World" }],
//   },
// ];

// const RichTextEditor = () => {
//   // Create editor
//   const [editor] = useState(() => withHistory(withReact(createEditor())));
//   const [ready, setReady] = useState(false);

//   // Wait until component mounts before rendering Slate
//   useEffect(() => {
//     setReady(true);
//   }, []);

//   if (!ready) {
//     return (
//       <div className="min-h-[400px] border mt-4 p-4">Loading editor...</div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex gap-2 mb-2">
//         <button>Bold</button>
//         <button>Italic</button>
//       </div>

//       <Slate editor={editor} value={initialValue} onChange={() => {}}>
//         <Editable className="min-h-[400px] border mt-4 p-4" />
//       </Slate>
//     </div>
//   );
// };

// export default RichTextEditor;
