import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your content..."
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Clean the initial value to ensure LTR direction
  const cleanValue = value.replace(/dir=["']rtl["']/gi, 'dir="ltr"');

  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.style.direction = 'ltr';
      editorRef.current.style.textAlign = 'left';
      
      // Set initial content only once
      if (cleanValue) {
        editorRef.current.innerHTML = cleanValue;
      } else {
        // Set placeholder for empty content
        editorRef.current.innerHTML = `<div style="color: #9ca3af; pointer-events: none;">${placeholder}</div>`;
      }
      setIsInitialized(true);
    }
  }, [cleanValue, isInitialized, placeholder]);

  // Update content when value prop changes (but not during typing)
  useEffect(() => {
    if (editorRef.current && isInitialized && cleanValue !== editorRef.current.innerHTML) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      
      editorRef.current.innerHTML = cleanValue;
      
      // Restore cursor position if possible
      if (range && editorRef.current.contains(range.commonAncestorContainer)) {
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, [cleanValue, isInitialized]);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    // Trigger input handling after command
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const cleanHTML = html.replace(/dir=["']rtl["']/gi, 'dir="ltr"');
      onChange(cleanHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      let html = editorRef.current.innerHTML;
      
      // Remove placeholder if it exists
      if (html.includes(`<div style="color: #9ca3af; pointer-events: none;">${placeholder}</div>`)) {
        html = html.replace(`<div style="color: #9ca3af; pointer-events: none;">${placeholder}</div>`, '');
      }
      
      // Clean RTL attributes before passing to parent
      const cleanHTML = html.replace(/dir=["']rtl["']/gi, 'dir="ltr"');
      onChange(cleanHTML);
    }
  }, [onChange, placeholder]);

  const handleFocus = useCallback(() => {
    if (editorRef.current && editorRef.current.innerHTML.includes(`<div style="color: #9ca3af; pointer-events: none;">${placeholder}</div>`)) {
      editorRef.current.innerHTML = '';
    }
  }, [placeholder]);

  const handleBlur = useCallback(() => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = `<div style="color: #9ca3af; pointer-events: none;">${placeholder}</div>`;
    }
  }, [placeholder]);

  const insertLink = useCallback(() => {
    const url = prompt('Enter the URL:');
    if (url) {
      execCommand('createLink', url);
    }
  }, [execCommand]);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-slate-200 rounded transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-slate-200 rounded transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="p-2 hover:bg-slate-200 rounded transition-colors"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-slate-200 rounded transition-colors"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-slate-200 rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-slate-300 mx-1" />
        <button
          type="button"
          onClick={insertLink}
          className="p-2 hover:bg-slate-200 rounded transition-colors"
          title="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="min-h-[300px] p-4 focus:outline-none text-slate-700 leading-relaxed break-words overflow-wrap-anywhere whitespace-pre-wrap"
        data-placeholder={placeholder}
        style={{
          minHeight: '300px',
          wordWrap: 'break-word',
          overflowWrap: 'anywhere',
          whiteSpace: 'pre-wrap',
          direction: 'ltr',
          textAlign: 'left'
        }}
      />
    </div>
  );
};

export default RichTextEditor;