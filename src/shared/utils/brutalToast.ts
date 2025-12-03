import { toast } from 'sonner';

export const brutalToast = {
    success: (message: string) => toast.success(message, {
        className: 'border-3 border-black bg-neon-green text-black font-mono font-bold shadow-brutal rounded-none',
        duration: 3000,
    }),
    error: (message: string) => toast.error(message, {
        className: 'border-3 border-black bg-red-600 text-white font-mono font-bold shadow-brutal rounded-none',
        duration: 4000,
    }),
    info: (message: string) => toast.message(message, {
        className: 'border-3 border-black bg-white text-black font-mono font-bold shadow-brutal rounded-none',
        duration: 3000,
    }),
    warning: (message: string) => toast.warning(message, {
        className: 'border-3 border-black bg-neon-yellow text-black font-mono font-bold shadow-brutal rounded-none',
        duration: 4000,
    }),
};
