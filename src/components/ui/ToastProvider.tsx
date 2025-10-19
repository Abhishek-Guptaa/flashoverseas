import React, { createContext, useCallback, useContext, useState } from 'react';

type Toast = { id: string; type?: 'success' | 'error' | 'info'; message: string };

const ToastContext = createContext(null as any);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    const toast = { id, ...t } as Toast;
    setToasts((s) => [...s, toast]);
    setTimeout(() => {
      setToasts((s) => s.filter(x => x.id !== id));
    }, 4000);
  }, []);

  const remove = useCallback((id: string) => setToasts((s) => s.filter(t => t.id !== id)), []);

  return (
    <ToastContext.Provider value={{ push, remove }}>
      {children}
      {/* Toast container */}
      <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id} className={`max-w-sm w-full px-4 py-3 rounded shadow ${t.type === 'error' ? 'bg-red-600 text-white' : t.type === 'success' ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext) as { push: (t: Omit<Toast, 'id'>) => void; remove: (id: string) => void };

export default ToastProvider;
