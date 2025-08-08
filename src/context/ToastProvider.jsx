import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = ({ message, type = 'info', duration = 5000 }) => {
        const id = Math.random().toString(36).slice(2, 12)
        setToasts(prev => [...prev, { id, message, duration, type }])

        setTimeout(() => {
            setToasts(prev => prev.filter(item => item.id !== id))
        }, duration)
    }


    const dismiss = id => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            {/* Stacked toasts */}
            <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 items-end pointer-events-none transition-transform">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`relative px-6 py-4 rounded-lg shadow-lg
                            bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900
                            border border-zinc-700 text-white min-w-[260px] max-w-xs
                            flex flex-col gap-2 animate-fade-in pointer-events-auto
                            `}
                    >
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-base">{toast.message}</span>
                            <button
                                className="ml-2 text-white/60 text-lg hover:text-red-400"
                                onClick={() => dismiss(toast.id)}
                            >×</button>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden mt-2">
                            <div
                                className={`h-full ${toast.type === 'error' ? 'bg-red-600'
                                    : toast.type === 'success' ? 'bg-green-600'
                                        : toast.type === 'warn' ? 'bg-yellow-400' : 'bg-blue-600'
                                    }`}
                                style={{
                                    width: "100%",
                                    animation: `toast-bar ${toast.duration}ms linear forwards`
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);

export default ToastProvider;
