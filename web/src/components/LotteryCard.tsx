import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { Sync as SyncIcon } from '@mui/icons-material';
import type { Lottery } from '../types';

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
  return (
    <Card
      variant="outlined"
      onClick={() => onSelect?.(lottery.id)}
      sx={{
        height: '100%',
        position: 'relative',
        cursor: onSelect ? 'pointer' : 'default',
        borderColor: selected ? 'primary.main' : undefined,
        borderWidth: selected ? 2 : 1,
        '&:hover': {
          boxShadow: 2,
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
        onClick={() => void onRefresh?.()}
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
