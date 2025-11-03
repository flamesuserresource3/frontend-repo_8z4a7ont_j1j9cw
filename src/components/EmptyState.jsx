import { FileText, Plus } from 'lucide-react';

export default function EmptyState({ onCreate }) {
  return (
    <div className="flex-1 grid place-items-center">
      <div className="text-center max-w-md px-6 py-12">
        <div className="mx-auto w-14 h-14 rounded-xl bg-gray-100 text-gray-600 grid place-items-center mb-4">
          <FileText size={24} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Create your first page</h2>
        <p className="text-gray-600 mb-6">Start capturing notes, docs, and ideas in a clean, flexible workspace.</p>
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          <Plus size={18} /> New Page
        </button>
      </div>
    </div>
  );
}
