import { Fab } from '@mui/material';

interface RegisterButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function RegisterButton({ onClick, disabled }: RegisterButtonProps) {
  return (
    <Fab
      variant="extended"
      color="inherit"
      disabled={disabled}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 180,
        bgcolor: disabled ? undefined : 'grey.300',
        color: disabled ? undefined : 'text.primary',
        '&:hover': {
          bgcolor: disabled ? undefined : 'grey.400',
        },
      }}
      onClick={onClick}
    >
      REGISTER
    </Fab>
  );
}
