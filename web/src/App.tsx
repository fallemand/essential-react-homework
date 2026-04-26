import { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AddLotteryButton } from './components/AddLotteryButton';
import { AddLotteryModal } from './components/AddLotteryModal';
import { RegisterModal } from './components/RegisterModal';
import { LotteryList } from './components/LotteryList';
import { RegisterButton } from './components/RegisterButton';
import { createLottery } from './services/api';

function App() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedLotteryIds, setSelectedLotteryIds] = useState<string[]>([]);

  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);
  const handleRegisterModalOpen = () => setRegisterModalOpen(true);
  const handleRegisterModalClose = () => setRegisterModalOpen(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError(null);
  };

  const refreshLotteries = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleAdd = async (name: string, prize: string) => {
    setAddLoading(true);
    setError(null);

    try {
      await createLottery({ name, prize, type: 'simple' });
      handleAddModalClose();
      setSnackbarMessage('New lottery created');
      setSnackbarOpen(true);
      refreshLotteries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lottery');
      setSnackbarOpen(true);
    } finally {
      setAddLoading(false);
    }
  };

  const handleRegisterSubmit = async (name: string) => {
    setRegisterLoading(true);
    setError(null);

    try {
      // Register for each selected lottery
      await Promise.all(
        selectedLotteryIds.map(async (lotteryId) => {
          // TODO: Call register API
          console.log('Registering', name, 'for lottery', lotteryId);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }),
      );

      handleRegisterModalClose();
      setSelectedLotteryIds([]);
      setSnackbarMessage(
        `Successfully registered for ${selectedLotteryIds.length} ${selectedLotteryIds.length === 1 ? 'lottery' : 'lotteries'}`,
      );
      setSnackbarOpen(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to register for lottery',
      );
      setSnackbarOpen(true);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <LotteryList
        key={refreshKey}
        selectedIds={selectedLotteryIds}
        onSelectionChange={setSelectedLotteryIds}
      />
      <RegisterButton
        onClick={handleRegisterModalOpen}
        disabled={selectedLotteryIds.length === 0}
      />
      <AddLotteryButton onClick={handleAddModalOpen} />
      <AddLotteryModal
        open={addModalOpen}
        onClose={handleAddModalClose}
        onAdd={handleAdd}
        loading={addLoading}
      />
      <RegisterModal
        open={registerModalOpen}
        onClose={handleRegisterModalClose}
        onRegister={handleRegisterSubmit}
        loading={registerLoading}
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
            {snackbarMessage}
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default App;
