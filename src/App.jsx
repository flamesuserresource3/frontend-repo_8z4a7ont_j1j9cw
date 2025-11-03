import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Editor from './components/Editor.jsx';
import EmptyState from './components/EmptyState.jsx';

function App() {
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem('notionish.pages');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: crypto.randomUUID(),
        title: 'Welcome to Your Workspace',
        content: `<h1>Welcome</h1><p>This is a lightweight Notion-like editor. Use the toolbar to format text, add lists, and more.</p><ul><li>Create pages from the sidebar</li><li>Rename the page from the top</li><li>Your content is saved automatically</li></ul>`
      }
    ];
  });

  const [activeId, setActiveId] = useState(() => pages[0]?.id || null);

  useEffect(() => {
    localStorage.setItem('notionish.pages', JSON.stringify(pages));
  }, [pages]);

  const activePage = useMemo(() => pages.find(p => p.id === activeId) || null, [pages, activeId]);

  const addPage = () => {
    const newPage = { id: crypto.randomUUID(), title: 'Untitled', content: '' };
    setPages(prev => [newPage, ...prev]);
    setActiveId(newPage.id);
  };

  const deletePage = (id) => {
    setPages(prev => prev.filter(p => p.id !== id));
    if (id === activeId) {
      const next = pages.find(p => p.id !== id);
      setActiveId(next ? next.id : null);
    }
  };

  const updateTitle = (title) => {
    setPages(prev => prev.map(p => (p.id === activeId ? { ...p, title } : p)));
  };

  const updateContent = (content) => {
    setPages(prev => prev.map(p => (p.id === activeId ? { ...p, content } : p)));
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-gray-900">
      <div className="h-full w-full grid" style={{ gridTemplateColumns: '18rem 1fr' }}>
        <Sidebar
          pages={pages}
          activePageId={activeId}
          onSelectPage={setActiveId}
          onAddPage={addPage}
          onDeletePage={deletePage}
        />

        <main className="flex flex-col bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
          {activePage ? (
            <>
              <Topbar title={activePage.title} onTitleChange={updateTitle} />
              <Editor value={activePage.content} onChange={updateContent} />
            </>
          ) : (
            <EmptyState onCreate={addPage} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
