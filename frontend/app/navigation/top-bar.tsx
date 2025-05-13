import {AppBar, Button, Toolbar, Typography, Menu, MenuItem} from "@mui/material";
import {useAuth} from "~/auth/auth-context";
import React, {useState, type MouseEvent} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MaterialModal from "~/modal/material-modal";
import LoginModal from "~/login/login-modal";

export default function TopBar() {

  const {isLoggedIn, username, logout} = useAuth()
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(prev => !prev)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };

  const handleLogout = () => {
    handleClose();
    logout()
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Nazwa Projektu
        </Typography>
        {
          isLoggedIn ? (
            <>
              <Button color="inherit" sx={{textTransform: "none"}} startIcon={<AccountCircleIcon />} onClick={handleClick} >
                {username}
              </Button>
            <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            </>
          ) : (
            <MaterialModal button={<Button color="inherit">Zaloguj się</Button>} label={"Zaloguj się"} >
              <LoginModal />
            </MaterialModal>
          )
        }
      </Toolbar>
    </AppBar>
  )
}