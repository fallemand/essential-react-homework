import { Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface AddLotteryButtonProps {
  onClick: () => void;
}

export function AddLotteryButton({ onClick }: AddLotteryButtonProps) {
  return (
    <Fab
      variant="extended"
      color="primary"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
      onClick={onClick}
    >
      <AddIcon sx={{ mr: 1 }} />
      ADD LOTTERY
    </Fab>
  );
}
