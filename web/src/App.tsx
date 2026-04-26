import { useState } from 'react';
import { AddLotteryButton } from './components/AddLotteryButton';
import { AddLotteryModal } from './components/AddLotteryModal';

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = (name: string, prize: string) => {
    console.log({ name, prize });
    handleClose();
  };

  return (
    <>
      <AddLotteryButton onClick={handleOpen} />
      <AddLotteryModal open={open} onClose={handleClose} onAdd={handleAdd} />
    </>
  );
}

export default App;
