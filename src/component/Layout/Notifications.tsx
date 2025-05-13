import React, { useState } from 'react';
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Link,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import type { Notification } from '../interfaces/CommonInterface';
 

 
interface Props {
  notifications: Notification[];
  onSeeAll?: () => void;
  onClickNotification?: (id: string) => void;
}
 
export default function NotificationPopover({
  notifications,
  onSeeAll,
  onClickNotification,
}: Props) {
  const unreadCount = notifications.filter(n => !n.read).length;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 
  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
 
  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;
 
  return (
    <>
      <IconButton aria-describedby={id} onClick={handleOpen} size="large">
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
 
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ width: 360 }}
        PaperProps={{
          sx: { width: 360, p: 0 }, // fixed width so the scrollbar doesn’t jump
        }}
      >
        <Typography variant="h6" sx={{ px: 2, py: 1 }}>
          Notifications
        </Typography>
        <Divider />
 
        {/* Scrollable list  */}
        <Box sx={{ maxHeight: 360, overflowY: 'auto' }}>
          <MenuList dense disablePadding>
            {notifications.length === 0 && (
              <MenuItem disabled>
                <ListItemText
                  primary="No notifications"
                  primaryTypographyProps={{ align: 'center' }}
                />
              </MenuItem>
            )}
 
            {notifications.map(n => (
              <MenuItem
key={n.id}
                onClick={() => {
                  handleClose();
onClickNotification?.(n.id);
                }}
                sx={{
                  alignItems: 'flex-start',
                  bgcolor: n.read ? 'inherit' : 'action.hover',
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle2"
                      fontWeight={n.read ? 400 : 600}
                      noWrap
                    >
                      {n.title}
                    </Typography>
                  }
                  secondary={
                    n.body && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        lineHeight={1.3}
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {n.body}
                      </Typography>
                    )
                  }
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1, whiteSpace: 'nowrap' }}
                >
                  {new Date(n.createdAt).toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
 
        <Divider />
 
        <Box sx={{ textAlign: 'center', py: 1 }}>
          <Link
            component="button"
            variant="body2"
            underline="hover"
            onClick={() => {
              handleClose();
              onSeeAll?.();
            }}
          >
            See all notifications
          </Link>
        </Box>
      </Popover>
    </>
  );
}