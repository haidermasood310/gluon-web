import { toast } from 'sonner';

interface ToastOptions {
  duration?: number;
}

export const showSuccess = (description: string, options?: ToastOptions) => {
  toast.success(description, {
    // description,
    duration: options?.duration || 3000,
  });
};

export const showError = (description: string, options?: ToastOptions) => {
  toast.error('Error!', {
    description,
    duration: options?.duration || 3000,
  });
};

export const showWarning = (message: string, options?: ToastOptions) => {
  toast.warning(message, {
    duration: options?.duration || 3000,
  });
};

export const showInfo = (message: string, options?: ToastOptions) => {
  toast.info(message, {
    duration: options?.duration || 3000,
  });
};
