import { useState } from 'react';
import { AddLotteryButton } from './components/AddLotteryButton';
import { AddLotteryModal } from './components/AddLotteryModal';

function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = async (name: string, prize: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log({ name, prize });
    setLoading(false);
    handleClose();
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
    </>
  );
}

export default App;
