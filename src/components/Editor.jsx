import { useEffect, useRef } from 'react';
import { Bold, Italic, Underline, List, Heading1, Heading2, Quote, Code } from 'lucide-react';

export default function Editor({ value, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  };

  const onInput = () => {
    if (ref.current) onChange(ref.current.innerHTML);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-auto">
      <div className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="flex items-center gap-1 p-2">
          <ToolbarButton onClick={() => exec('bold')} icon={<Bold size={16} />} label="Bold" />
          <ToolbarButton onClick={() => exec('italic')} icon={<Italic size={16} />} label="Italic" />
          <ToolbarButton onClick={() => exec('underline')} icon={<Underline size={16} />} label="Underline" />
          <span className="w-px h-5 bg-gray-200 mx-1" />
          <ToolbarButton onClick={() => exec('formatBlock', '<h1>')} icon={<Heading1 size={16} />} label="H1" />
          <ToolbarButton onClick={() => exec('formatBlock', '<h2>')} icon={<Heading2 size={16} />} label="H2" />
          <ToolbarButton onClick={() => exec('insertUnorderedList')} icon={<List size={16} />} label="Bulleted list" />
          <ToolbarButton onClick={() => exec('formatBlock', '<blockquote>')} icon={<Quote size={16} />} label="Quote" />
          <ToolbarButton onClick={() => exec('formatBlock', '<pre>')} icon={<Code size={16} />} label="Code" />
        </div>
      </div>

      <div
        ref={ref}
        contentEditable
        onInput={onInput}
        className="prose prose-gray max-w-3xl mx-auto px-6 md:px-10 py-8 outline-none focus:outline-none min-h-[60vh]"
        suppressContentEditableWarning
        spellCheck={false}
      />
    </div>
  );
}

function ToolbarButton({ onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="inline-flex items-center justify-center gap-1 text-sm px-2 py-1.5 rounded-md border hover:bg-gray-50"
    >
      {icon}
    </button>
  );
}
