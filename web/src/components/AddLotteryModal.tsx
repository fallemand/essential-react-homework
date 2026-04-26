import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

interface AddLotteryModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, prize: string) => void | Promise<void>;
  loading?: boolean;
}

export function AddLotteryModal({
  open,
  onClose,
  onAdd,
  loading = false,
}: AddLotteryModalProps) {
  const [lotteryName, setLotteryName] = useState('');
  const [lotteryPrize, setLotteryPrize] = useState('');

  const nameError =
    lotteryName.length > 0 && lotteryName.length < 4
      ? 'name must be at least 4 characters'
      : '';
  const prizeError =
    lotteryPrize.length > 0 && lotteryPrize.length < 4
      ? 'prize must be at least 4 characters'
      : '';

  const isValid = lotteryName.length >= 4 && lotteryPrize.length >= 4;

  const handleAdd = () => {
    if (!isValid) return;
    void onAdd(lotteryName, lotteryPrize);
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
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            label="Lottery prize"
            variant="standard"
            fullWidth
            value={lotteryPrize}
            onChange={(e) => setLotteryPrize(e.target.value)}
            error={!!prizeError}
            helperText={prizeError}
          />
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!isValid || loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
            sx={{
              alignSelf: 'flex-start',
              mt: 2,
              textTransform: 'uppercase',
            }}
          >
            {loading ? 'ADDING...' : 'ADD'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
