import { useState } from 'react';

interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

export function useNotification() {
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSuccess = (message: string) => {
    setNotification({ open: true, message, severity: 'success' });
  };

  const showError = (message: string) => {
    setNotification({ open: true, message, severity: 'error' });
  };

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return {
    showSuccess,
    showError,
    notification,
    handleClose,
  };
}
