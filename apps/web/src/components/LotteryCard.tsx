import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Sync as SyncIcon } from '@mui/icons-material';
import type { Lottery } from '@lottery/shared/types';

interface LotteryCardProps {
  lottery: Lottery;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onRefresh?: () => void | Promise<void>;
}

export function LotteryCard({
  lottery,
  selected = false,
  onSelect,
  onRefresh,
}: LotteryCardProps) {
  const isFinished = lottery.status === 'finished';
  const isSelectable = !isFinished && onSelect;

  return (
    <Card
      variant="outlined"
      onClick={() => isSelectable && onSelect(lottery.id)}
      sx={{
        height: '100%',
        position: 'relative',
        cursor: isSelectable ? 'pointer' : 'default',
        borderColor: selected ? 'primary.main' : undefined,
        borderWidth: selected ? 2 : 1,
        opacity: isFinished ? 0.5 : 1,
        backgroundColor: isFinished ? 'action.disabledBackground' : undefined,
        '&:hover': {
          boxShadow: isSelectable ? 2 : undefined,
        },
      }}
    >
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
        onClick={(e) => {
          e.stopPropagation();
          void onRefresh?.();
        }}
      >
        <SyncIcon fontSize="small" />
      </IconButton>

      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {lottery.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {lottery.prize}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {lottery.id}
        </Typography>
      </CardContent>
    </Card>
  );
}
