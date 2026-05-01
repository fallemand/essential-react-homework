import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AddLotteryButton } from './components/AddLotteryButton';
import { AddLotteryModal } from './components/AddLotteryModal';
import { createLottery } from './services/api';

function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError(null);
  };

  const handleAdd = async (name: string, prize: string) => {
    setLoading(true);
    setError(null);

    try {
      await createLottery({ name, prize, type: 'simple' });
      handleClose();
      setSnackbarOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lottery');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {error ? (
          <Alert onClose={handleSnackbarClose} severity="error">
            {error}
          </Alert>
        ) : (
          <Alert onClose={handleSnackbarClose} severity="success">
            New lottery created
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default App;
