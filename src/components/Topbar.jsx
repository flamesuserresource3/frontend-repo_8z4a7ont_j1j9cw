import { Share2, Star, MoreVertical } from 'lucide-react';

export default function Topbar({ title, onTitleChange }) {
  return (
    <header className="h-14 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 flex items-center justify-between px-4">
      <input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Untitled"
        className="text-base md:text-lg font-semibold bg-transparent outline-none px-2 py-1 rounded focus:ring-2 focus:ring-blue-200"
      />
      <div className="flex items-center gap-1">
        <button className="hidden sm:inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50">
          <Share2 size={16} /> Share
        </button>
        <button className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50">
          <Star size={16} />
        </button>
        <button className="inline-flex items-center gap-2 text-sm px-2 py-1.5 rounded-md hover:bg-gray-50">
          <MoreVertical size={18} />
        </button>
      </div>
    </header>
  );
}
