import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import NotificationPopover from './Notifications';
import type { Notification } from '../interfaces/CommonInterface';

interface navbarProps {
  onLogout : () => void
}
export const Navbar: React.FC<navbarProps> = ({onLogout}) => {
  const userName : string = "rajat" 
  const navigate = useNavigate();

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};
const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'New message from Rahul',
    body: 'Hey, can we discuss the latest design updates?',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Your report has been approved',
    body: 'The monthly performance report is now live.',
    read: true,
    createdAt: new Date(Date.now() - 3600_000).toISOString(), // 1 hour ago
  },
  {
    id: '3',
    title: 'System maintenance scheduled',
    body: 'There will be a downtime from 2AM to 4AM tomorrow.',
    read: false,
    createdAt: new Date(Date.now() - 2 * 3600_000).toISOString(), // 2 hours ago
  },
  {
    id: '4',
    title: 'New comment on your post',
    body: 'Anita commented: "Looks great!"',
    read: true,
    createdAt: new Date(Date.now() - 5 * 3600_000).toISOString(), // 5 hours ago
  },
  {
    id: '5',
    title: 'Task deadline approaching',
    body: 'Finish the UI review before 6 PM today.',
    read: false,
    createdAt: new Date(Date.now() - 8 * 3600_000).toISOString(), // 8 hours ago
  },
  {
    id: '6',
    title: 'Meeting rescheduled',
    body: 'The team meeting has been moved to Thursday at 3 PM.',
    read: true,
    createdAt: new Date(Date.now() - 24 * 3600_000).toISOString(), // 1 day ago
  },
];
  const [notifications,setNotifications] = useState<Notification[]>([])
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
const [openProfile, setOpenProfile] = React.useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'basic-menu' : undefined;

  const handleLogout = () => {
    handleClose()
  }


  return (
    <div className="w-full h-16 flex justify-between items-center px-6 bg-[#e3e8e8] shadow-md sticky top-0 z-50">
      <div
        className="text-xl font-bold text-black cursor-pointer"
        onClick={() => navigate('/')}
      >
        Pathology Lab App
      </div>
      <div className="flex items-center gap-4">
        <NotificationPopover notifications={sampleNotifications} onSeeAll={() =>{}} onClickNotification={() => {}} />
        <IconButton onClick={handleClick} style={{ color: 'black', borderColor: 'white' }}>
          <AccountCircleRoundedIcon />
        </IconButton>
        <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          setOpenProfile(true)
        }}>Profile</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
      </div>
      <Modal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        aria-labelledby="modal-modal-title "
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='flex justify-center items-center w-full h-full'>
<Avatar src="/broken-image.jpg" sx={{ width: 64, height: 64 }} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
