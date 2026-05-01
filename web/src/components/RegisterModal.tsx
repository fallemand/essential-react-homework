import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onRegister: (name: string) => void | Promise<void>;
  loading?: boolean;
}

export function RegisterModal({
  open,
  onClose,
  onRegister,
  loading = false,
}: RegisterModalProps) {
  const [name, setName] = useState('');

  const nameError =
    name.length > 0 && name.length < 3
      ? 'Name must be at least 3 characters'
      : '';

  const isValid = name.length >= 3;

  const handleRegister = () => {
    if (!isValid) return;
    void onRegister(name);
    setName('');
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register for a lottery</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            placeholder="Enter your name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
          />
          <LoadingButton
            variant="contained"
            onClick={handleRegister}
            disabled={!isValid}
            loading={loading}
            sx={{
              alignSelf: 'flex-start',
              mt: 2,
              textTransform: 'uppercase',
            }}
          >
            REGISTER
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
