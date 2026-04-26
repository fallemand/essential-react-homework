import { useState } from 'react';
import { Snackbar } from '@mui/material';
import { AddLotteryButton } from './components/AddLotteryButton';
import { AddLotteryModal } from './components/AddLotteryModal';

function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleAdd = async (name: string, prize: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log({ name, prize });
    setLoading(false);
    handleClose();
    setSnackbarOpen(true);
  };

  return (
    <>
      <AddLotteryButton onClick={handleOpen} />
      <AddLotteryModal
        open={open}
        onClose={handleClose}
        onAdd={handleAdd}
        loading={loading}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="New lottery created"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
    </>
  );
}

export default App;
