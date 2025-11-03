import { Plus, FileText, Trash2 } from 'lucide-react';

export default function Sidebar({ pages, activePageId, onSelectPage, onAddPage, onDeletePage }) {
  return (
    <aside className="h-full w-72 border-r bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 flex flex-col">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="font-semibold tracking-tight">Workspace</div>
        <button
          onClick={onAddPage}
          className="inline-flex items-center gap-1 text-sm bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800"
        >
          <Plus size={16} /> New
        </button>
      </div>

      <div className="px-3 py-2 text-xs uppercase tracking-wider text-gray-500">Pages</div>
      <nav className="flex-1 overflow-auto px-2 pb-4">
        {pages.length === 0 && (
          <div className="text-sm text-gray-500 px-2">No pages yet. Create your first one.</div>
        )}
        <ul className="space-y-1">
          {pages.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => onSelectPage(p.id)}
                className={`group w-full flex items-center justify-between gap-2 px-2 py-2 rounded-md text-left hover:bg-gray-100 ${
                  p.id === activePageId ? 'bg-gray-100' : ''
                }`}
              >
                <span className="inline-flex items-center gap-2 overflow-hidden">
                  <FileText size={16} className="shrink-0 text-gray-500" />
                  <span className="truncate text-sm text-gray-800">{p.title || 'Untitled'}</span>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePage(p.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-600 p-1 rounded"
                  aria-label={`Delete ${p.title}`}
                >
                  <Trash2 size={16} />
                </button>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t text-xs text-gray-500">
        Tip: Click “New” to add a page. Titles and content save automatically.
      </div>
    </aside>
  );
}
