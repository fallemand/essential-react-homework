import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from '@mui/material';

interface AddLotteryModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, prize: string) => void;
}

export function AddLotteryModal({
  open,
  onClose,
  onAdd,
}: AddLotteryModalProps) {
  const [lotteryName, setLotteryName] = useState('');
  const [lotteryPrize, setLotteryPrize] = useState('');

  const handleAdd = () => {
    onAdd(lotteryName, lotteryPrize);
    setLotteryName('');
    setLotteryPrize('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
  );
}
