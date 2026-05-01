import { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { AddLotteryButton } from './components/AddLotteryButton';
import { AddLotteryModal } from './components/AddLotteryModal';
import { RegisterModal } from './components/RegisterModal';
import { LotteryList } from './components/LotteryList';
import { RegisterButton } from './components/RegisterButton';
import { createLottery, registerForLottery } from './services/api';
import { useModal } from './hooks/useModal';
import { useNotification } from './hooks/useNotification';

function App() {
  const addModal = useModal();
  const registerModal = useModal();
  const notification = useNotification();

  const [addLoading, setAddLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedLotteryIds, setSelectedLotteryIds] = useState<string[]>([]);

  const refreshLotteries = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleAdd = async (name: string, prize: string) => {
    setAddLoading(true);

    try {
      await createLottery({ name, prize, type: 'simple' });
      addModal.handleClose();
      notification.showSuccess('New lottery created');
      refreshLotteries();
    } catch (err) {
      notification.showError(
        err instanceof Error ? err.message : 'Failed to create lottery',
      );
    } finally {
      setAddLoading(false);
    }
  };

  const handleRegisterSubmit = async (name: string) => {
    setRegisterLoading(true);

    try {
      await Promise.all(
        selectedLotteryIds.map((lotteryId) =>
          registerForLottery(lotteryId, name),
        ),
      );

      registerModal.handleClose();
      setSelectedLotteryIds([]);
      notification.showSuccess(
        `Successfully registered for ${selectedLotteryIds.length} ${selectedLotteryIds.length === 1 ? 'lottery' : 'lotteries'}`,
      );
    } catch (err) {
      notification.showError(
        err instanceof Error ? err.message : 'Failed to register for lottery',
      );
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
        onClick={registerModal.handleOpen}
        disabled={selectedLotteryIds.length === 0}
      />
      <AddLotteryButton onClick={addModal.handleOpen} />
      <AddLotteryModal
        open={addModal.open}
        onClose={addModal.handleClose}
        onAdd={handleAdd}
        loading={addLoading}
      />
      <RegisterModal
        open={registerModal.open}
        onClose={registerModal.handleClose}
        onRegister={handleRegisterSubmit}
        loading={registerLoading}
      />
      <Snackbar
        open={notification.notification.open}
        autoHideDuration={3000}
        onClose={notification.handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={notification.handleClose}
          severity={notification.notification.severity}
        >
          {notification.notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
