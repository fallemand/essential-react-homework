import { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

function App() {
  const [open, setOpen] = useState(false);
  const [lotteryName, setLotteryName] = useState('');
  const [lotteryPrize, setLotteryPrize] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = () => {
    console.log({ lotteryName, lotteryPrize });
    setLotteryName('');
    setLotteryPrize('');
    handleClose();
  };

  return (
    <>
      <Fab
        variant="extended"
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleOpen}
      >
        <AddIcon sx={{ mr: 1 }} />
        ADD LOTTERY
      </Fab>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add a new lottery</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Lottery name"
              variant="standard"
              fullWidth
              value={lotteryName}
              onChange={(e) => setLotteryName(e.target.value)}
            />
            <TextField
              label="Lottery prize"
              variant="standard"
              fullWidth
              value={lotteryPrize}
              onChange={(e) => setLotteryPrize(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{
                alignSelf: 'flex-start',
                mt: 2,
                textTransform: 'uppercase',
              }}
            >
              ADD
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
