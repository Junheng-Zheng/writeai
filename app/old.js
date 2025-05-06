"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

/**
 * Quill text editor with AI-powered autocomplete
 * Features:
 * - Contextual text completion using Groq's LLaMA API
 * - Tab to accept suggestions
 * - Suggestions clear instantly when user types any key
 * - Responsive WYSIWYG editor
 */
export default function Home() {
  // Refs
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const quillInitializedRef = useRef(false);
  const typingTimerRef = useRef(null);
  const suggestionRef = useRef({
    id: null, // Unique ID for the current suggestion
    text: "", // Text content of the suggestion
    position: null, // Position where suggestion was inserted
    length: 0, // Length of the suggestion
    active: false, // Whether a suggestion is currently active
  });

  // API key
  const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  // State
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [showingSuggestion, setShowingSuggestion] = useState(false);

  /**
   * Get all text from the editor as context
   */
  const getFullDocumentContext = useCallback(() => {
    if (!quillRef.current) return "";

    // Get the full text from the editor
    const fullText = quillRef.current.getText();
    return fullText.trim();
  }, []);

  /**
   * Get recent text before cursor for context
   */
  const getTextBeforeCursor = useCallback(() => {
    if (!quillRef.current) return "";

    const selection = quillRef.current.getSelection();
    if (!selection) return "";

    const cursorPos = selection.index;
    const fullText = quillRef.current.getText();

    // Use entire document up to cursor, not just the last few characters
    return fullText.substring(0, cursorPos).trim();
  }, []);

  /**
   * Force clear any existing suggestions in the editor
   * This is a more reliable method that ignores state flags
   */
  const forceClearSuggestions = useCallback(() => {
    if (!quillRef.current) return;

    // Get current selection
    const selection = quillRef.current.getSelection();
    if (!selection) return;

    const currentSuggestion = suggestionRef.current;

    // If we have a tracked active suggestion, remove it precisely
    if (
      currentSuggestion.active &&
      currentSuggestion.position !== null &&
      currentSuggestion.length > 0
    ) {
      // Make sure the position is still valid
      const editorLength = quillRef.current.getLength();
      if (currentSuggestion.position < editorLength) {
        quillRef.current.deleteText(
          currentSuggestion.position,
          Math.min(
            currentSuggestion.length,
            editorLength - currentSuggestion.position
          )
        );
      }

      // Reset suggestion tracking
      suggestionRef.current = {
        id: null,
        text: "",
        position: null,
        length: 0,
        active: false,
      };
    } else {
      // Fallback: Check for suggestion formatting at and after cursor position
      const format = quillRef.current.getFormat(selection.index);

      if (format.suggestion) {
        // Find the end of the suggestion by checking each character
        let length = 0;
        const fullText = quillRef.current.getText();

        // Look ahead character by character until we find text without suggestion formatting
        for (let i = selection.index; i < fullText.length; i++) {
          const charFormat = quillRef.current.getFormat(i, 1);
          if (!charFormat.suggestion) break;
          length++;
        }

        // Delete the suggestion text if found
        if (length > 0) {
          quillRef.current.deleteText(selection.index, length);
        }
      }
    }

    // Reset states regardless of whether text was deleted
    setSuggestion("");
    setShowingSuggestion(false);

    // Maintain cursor position
    if (selection) {
      quillRef.current.setSelection(selection.index);
    }
  }, []);

  /**
   * Accept the suggestion when tab is pressed
   */
  const acceptSuggestion = useCallback(() => {
    if (!quillRef.current || !suggestionRef.current.active) return;

    const selection = quillRef.current.getSelection();
    if (!selection) return;

    const currentSuggestion = suggestionRef.current;

    // Check if suggestion is still at expected position
    if (currentSuggestion.position !== null && currentSuggestion.length > 0) {
      // Format text to normal styling
      quillRef.current.formatText(
        currentSuggestion.position,
        currentSuggestion.length,
        {
          suggestion: false,
          color: "#000000",
          italic: false,
        }
      );

      // Move cursor to end of accepted text
      quillRef.current.setSelection(
        currentSuggestion.position + currentSuggestion.length
      );
    } else {
      // Fallback to old method using current cursor position
      const currentPos = selection.index;
      quillRef.current.formatText(currentPos, suggestion.length, {
        suggestion: false,
        color: "#000000",
        italic: false,
      });

      // Move cursor to end of accepted text
      quillRef.current.setSelection(currentPos + suggestion.length);
    }

    // Reset suggestion state
    setSuggestion("");
    setShowingSuggestion(false);

    // Reset suggestion tracking
    suggestionRef.current = {
      id: null,
      text: "",
      position: null,
      length: 0,
      active: false,
    };
  }, [suggestion]);

  /**
   * Generate text completion using LLaMA API via Groq
   */
  const generateCompletion = useCallback(async () => {
    if (!groqApiKey) {
      setError(
        "NEXT_PUBLIC_GROQ_API_KEY not set. Please add it to your .env.local file."
      );
      return;
    }

    if (isGenerating) return;

    // Check if there's already an active suggestion
    if (suggestionRef.current.active) {
      // Force clear any existing suggestions before making a new query
      forceClearSuggestions();

      // Return early if clearing failed
      if (suggestionRef.current.active) {
        console.warn(
          "Failed to clear existing suggestion before generating new one"
        );
        return;
      }
    }

    // Extra check - if somehow we still have suggestions showing, return
    if (showingSuggestion) {
      forceClearSuggestions();
      return;
    }

    const context = getTextBeforeCursor();
    const fullDocumentContext = getFullDocumentContext();

    if (!context || context.length < 2) return; // Skip very short contexts

    // Remove check for partial word completely
    const hasPartialWord = false;

    // Set state to prevent multiple requests
    setIsGenerating(true);

    try {
      // Create a new unique ID for this suggestion
      const suggestionId = Date.now().toString();

      // Start API request
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${groqApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
              {
                role: "system",
                content:
                  "You are a text autocompletor like Google's autocomplete. Use context provided and adhere to proper grammar, finish the sentence, start a new one, or finish the word. Do not repeat any part of the original text.",
              },
              {
                role: "user",
                content: `Here is the full document for context: "${fullDocumentContext}". The user is currently at this position: "${context}". Complete the following text with ONLY ONE SENTENCE. Write ONLY the continuation after the current position, do not repeat any part of the original. Be concise and clear. DONT surround the answer in markdown or quotes or anything.`,
              },
            ],
            temperature: 0.5, // Reduced for more predictable results
            max_tokens: 30, // Reduced for faster generation
            top_p: 0.9, // Add top_p for better text continuations
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to generate completion"
        );
      }

      const data = await response.json();
      let completion = data.choices[0]?.message?.content;

      // Ensure we only show one sentence by trimming to the first sentence terminator
      if (completion) {
        // First, trim any leading/trailing whitespace
        completion = completion.trim();

        // More robust sentence detection with regex
        // This looks for periods, question marks, or exclamation marks followed by a space or end of string
        const sentenceEndRegex = /[.!?](?:\s|$)/;
        const match = sentenceEndRegex.exec(completion);

        if (match) {
          // Get position of the sentence terminator (including the terminator itself)
          const endPos = match.index + 1;
          completion = completion.substring(0, endPos);
        } else {
          // If no sentence terminator is found but the completion is long,
          // cap it at a reasonable length (e.g., 50 characters)
          if (completion.length > 50) {
            completion = completion.substring(0, 50);
          }
        }

        // Extra check: if there are multiple sentences (indicated by multiple terminators)
        // ensure we're only taking the first one
        const terminators = [".", "!", "?"];
        let counts = 0;
        for (const char of completion) {
          if (terminators.includes(char)) counts++;
          if (counts > 1) {
            // Find the position of the first terminator
            for (const terminator of terminators) {
              const pos = completion.indexOf(terminator);
              if (pos !== -1) {
                completion = completion.substring(0, pos + 1);
                break;
              }
            }
            break;
          }
        }
      }

      // Check if we still have the editor and a completion to show
      if (completion && quillRef.current) {
        const selection = quillRef.current.getSelection();
        if (!selection) return;

        // Verify there's no active suggestion before inserting a new one
        if (suggestionRef.current.active) {
          console.warn(
            "Active suggestion found before inserting new one - clearing"
          );
          forceClearSuggestions();
        }

        // Make sure the user hasn't moved the cursor too far since we started the request
        const currentContext = getTextBeforeCursor();
        // Skip if context has significantly changed (user typed a lot)
        if (Math.abs(currentContext.length - context.length) > 10) {
          return;
        }

        // Store suggestion information in our ref
        suggestionRef.current = {
          id: suggestionId,
          text: completion,
          position: selection.index,
          length: completion.length,
          active: true,
        };

        // Insert suggestion with gray formatting
        quillRef.current.insertText(selection.index, completion, {
          suggestion: true,
          color: "#8c8c8c",
          italic: true,
        });

        // Keep cursor at original position
        quillRef.current.setSelection(selection.index);

        // Update state
        setSuggestion(completion);
        setShowingSuggestion(true);
      }
    } catch (error) {
      // Silent failure for autocomplete - don't show errors to user
      console.error("Autocomplete error:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [
    getTextBeforeCursor,
    getFullDocumentContext,
    groqApiKey,
    isGenerating,
    showingSuggestion,
    forceClearSuggestions,
  ]);

  // Add this function to periodically verify suggestion state integrity
  const verifySuggestionIntegrity = useCallback(() => {
    if (!quillRef.current) return;

    // If we have an active suggestion reference but no showingSuggestion state, fix it
    if (suggestionRef.current.active && !showingSuggestion) {
      console.warn("Suggestion integrity check: Fixed inconsistent state");
      forceClearSuggestions();
    }

    // If we have showingSuggestion state but no active reference, fix it
    if (showingSuggestion && !suggestionRef.current.active) {
      console.warn("Suggestion integrity check: Fixed inconsistent state 2");
      setShowingSuggestion(false);
      setSuggestion("");
    }
  }, [showingSuggestion, forceClearSuggestions]);

  // Run integrity check periodically
  useEffect(() => {
    const intervalId = setInterval(verifySuggestionIntegrity, 2000);
    return () => clearInterval(intervalId);
  }, [verifySuggestionIntegrity]);

  /**
   * Handle tab key to accept suggestions
   */
  const handleTabKey = useCallback(
    (e) => {
      if (e.key === "Tab") {
        e.preventDefault();

        if (showingSuggestion && suggestion) {
          acceptSuggestion();
        } else if (quillRef.current) {
          const selection = quillRef.current.getSelection();
          if (selection) {
            quillRef.current.insertText(selection.index, "\t");
            quillRef.current.setSelection(selection.index + 1);
          }
        }
      }
    },
    [acceptSuggestion, showingSuggestion, suggestion]
  );

  /**
   * Set up keyboard event handlers
   */
  useEffect(() => {
    const editorElement = editorRef.current;
    if (!editorElement) return;

    // Handle tab key for accepting suggestions
    editorElement.addEventListener("keydown", handleTabKey, { capture: true });

    // Handle any keypress to clear suggestions immediately
    const handleAnyKey = (e) => {
      if (showingSuggestion && e.key !== "Tab") {
        forceClearSuggestions();
      }
    };

    editorElement.addEventListener("keydown", handleAnyKey, { capture: true });

    return () => {
      editorElement.removeEventListener("keydown", handleTabKey, {
        capture: true,
      });
      editorElement.removeEventListener("keydown", handleAnyKey, {
        capture: true,
      });
    };
  }, [handleTabKey, showingSuggestion, forceClearSuggestions]);

  /**
   * Set up Quill event handlers
   */
  const setupQuillHandlers = useCallback(
    (quill) => {
      // Set up text-change handler
      quill.on("text-change", function (delta, oldDelta, source) {
        if (source === "user") {
          // Immediately set suggestion to empty string when user types
          setSuggestion("");
          setShowingSuggestion(false);

          // Mark suggestion as inactive
          suggestionRef.current.active = false;

          // Always force clear suggestions when user types anything
          forceClearSuggestions();

          // Start immediate request for new suggestion if user types significant content
          const hasInsert = delta.ops.some(
            (op) =>
              op.insert &&
              typeof op.insert === "string" &&
              op.insert.trim().length > 0
          );

          // If user typed something substantial (not just whitespace or formatting changes)
          if (hasInsert && !isGenerating) {
            // Check if this might be end of a word/phrase or new word addition
            const mightEndPhrase = delta.ops.some(
              (op) =>
                op.insert &&
                typeof op.insert === "string" &&
                [".", ",", ";", ":", "?", "!", " "].includes(op.insert)
            );

            // Check if user might be adding a new word (added a character not following a space)
            const mightBeNewWord = delta.ops.some(
              (op) =>
                op.insert &&
                typeof op.insert === "string" &&
                op.insert.trim().length > 0 &&
                ![".", ",", ";", ":", "?", "!", " "].includes(op.insert)
            );

            if (mightEndPhrase) {
              // Cancel pending timer if any
              if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
              }
              // Generate suggestion immediately after punctuation or space
              setTimeout(() => {
                generateCompletion();
              }, 10); // Small delay to ensure UI is updated
              return;
            }

            // For new words, wait a bit longer before suggesting to avoid distracting
            // the user while they're typing the new word
            if (mightBeNewWord) {
              // Cancel pending timer if any
              if (typingTimerRef.current) {
                clearTimeout(typingTimerRef.current);
              }

              typingTimerRef.current = setTimeout(() => {
                generateCompletion();
              }, 500); // Slightly longer delay for new words
              return;
            }
          }

          // Schedule next suggestion attempt with standard delay
          if (typingTimerRef.current) {
            clearTimeout(typingTimerRef.current);
          }

          typingTimerRef.current = setTimeout(() => {
            generateCompletion();
          }, 300); // Reduced from 1000ms to 300ms for faster suggestions
        }
      });
    },
    [forceClearSuggestions, generateCompletion, isGenerating]
  );

  /**
   * Initialize Quill editor
   */
  useEffect(() => {
    if (!editorRef.current || quillInitializedRef.current) return;
    quillInitializedRef.current = true;

    // Use dynamic import for client-side only library
    const initQuill = async () => {
      try {
        const Quill = await import("quill");

        // Add Quill stylesheet
        if (!document.querySelector('link[href*="quill.snow.css"]')) {
          const link = document.createElement("link");
          link.href = "//cdn.quilljs.com/1.3.6/quill.snow.css";
          link.rel = "stylesheet";
          document.head.appendChild(link);
        }

        // Add custom styles for the editor and suggestions
        if (!document.querySelector('style[data-custom="quill-style"]')) {
          const style = document.createElement("style");
          style.setAttribute("data-custom", "quill-style");
          style.textContent = `
            .ql-container.ql-snow {
              border: none;
              background: #f8f9fa;
              padding: 20px;
            }
            .ql-editor {
              width: 8.5in;
              min-height: 11in;
              padding: 1in;
              margin: 0 auto;
              background: white;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
              border-radius: 2px;
            }
            .suggestion {
              color: #8c8c8c !important;
              font-style: italic !important;
            }
          `;
          document.head.appendChild(style);
        }

        // Register suggestion format
        const Inline = Quill.default.import("blots/inline");
        class SuggestionBlot extends Inline {}
        SuggestionBlot.blotName = "suggestion";
        SuggestionBlot.tagName = "span";
        SuggestionBlot.className = "suggestion";
        Quill.default.register(SuggestionBlot);

        // Initialize Quill editor
        quillRef.current = new Quill.default(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              ["link", "image"],
              ["clean"],
            ],
          },
        });

        // Set up event handlers
        setupQuillHandlers(quillRef.current);
      } catch (error) {
        console.error("Failed to initialize Quill:", error);
        setError("Failed to load editor. Please refresh the page.");
      }
    };

    initQuill();

    // Clean up
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, [setupQuillHandlers]);

  return (
    <main className="p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Quill Editor with Autocomplete</h1>
        {isGenerating && (
          <div className="text-sm text-blue-600">Generating suggestion...</div>
        )}
      </div>
      <div ref={editorRef} className="flex-1 relative"></div>
      <div className="mt-2 text-sm text-gray-500">
        Press Tab to accept autocomplete suggestions.
      </div>
    </main>
  );
}
