import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// Remove the direct import of Quill
// import Quill from "quill";

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const [quillLoaded, setQuillLoaded] = useState(false);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (quillLoaded) {
        ref.current?.enable(!readOnly);
      }
    }, [ref, readOnly, quillLoaded]);

    useEffect(() => {
      // Only run on client side
      if (typeof window === "undefined") return;

      let quill;
      let Quill;

      // Dynamically import Quill only on client side
      const loadQuill = async () => {
        const quillModule = await import("quill");
        Quill = quillModule.default;

        const container = containerRef.current;
        if (!container) return;

        // Clear any existing content to prevent duplicates
        container.innerHTML = "";

        // Create a container for the editor without toolbar
        const editorContainer = container.appendChild(
          container.ownerDocument.createElement("div")
        );

        quill = new Quill(editorContainer, {
          theme: "snow",
          modules: {
            toolbar: false, // Disable the default toolbar
          },
        });

        ref.current = quill;

        if (defaultValueRef.current) {
          quill.setContents(defaultValueRef.current);
        }

        quill.on(Quill.events.TEXT_CHANGE, (...args) => {
          onTextChangeRef.current?.(...args);
        });

        quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
          onSelectionChangeRef.current?.(...args);
        });

        setQuillLoaded(true);
      };

      loadQuill();

      return () => {
        ref.current = null;
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
      };
    }, [ref]);

    return <div className="editor-container" ref={containerRef}></div>;
  }
);

Editor.displayName = "Editor";

export default Editor;
