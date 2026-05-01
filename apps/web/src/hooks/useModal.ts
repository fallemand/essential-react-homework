import { useState } from 'react';

export function useModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    open,
    handleOpen,
    handleClose,
  };
}
