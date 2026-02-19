







import { useEffect } from 'react';
import { IconAlertCircle, IconX } from '@tabler/icons-react';

interface Props {
  message: string | undefined;
  onClose: () => void;
}

const ErrorAlert = ({ message, onClose }: Props) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 5000); // Auto-hide after 5s
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="z-[100] flex justify-center pointer-events-none">
      <div 
        role="alert"
        className="pointer-events-auto flex items-center gap-3 w-full max-w-[400px] p-4 rounded-xl border border-red-200 bg-red-100 shadow-2xl shadow-red-200/50 animate-in slide-in-from-bottom-5 md:slide-in-from-top-5 duration-300"
      >
        {/* Icon */}
        <div className="flex-shrink-0 p-2 bg-red-100 rounded-lg">
          <IconAlertCircle className="w-5 h-5 text-red-600" stroke={2.5} />
        </div>

        {/* Message */}
        <div className="flex-1 text-sm font-semibold text-slate-800 leading-tight">
          <p className="text-red-600 text-xs uppercase tracking-wider font-bold mb-0.5">Error</p>
          {message}
        </div>

        {/* Manual Close */}
        <button 
          onClick={onClose}
          className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-slate-600"
        >
          <IconX size={18} />
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
