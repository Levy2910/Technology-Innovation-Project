/*Admin Drawer component
Junaid Saleem 103824753
Last edited 10/10/2023*/
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { PeopleAlt, HelpOutline } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import AdminHome from './AdminHome';
import { Route, Routes, useLocation } from 'react-router-dom';
import UserManagement from '../Pages/UserManagement';
import FAQsManagement from '../Pages/FAQsManagement';
import '../Css/Navbar.css'; //importing the css

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '20px',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginLeft: 'auto',
    background: 'white',
    borderRadius: 5
  },
}));

const sections = [
  { text: 'Home', icon: <HomeIcon />, link: '/admin' },
  { text: 'Users', icon: <PeopleAlt />, link: '/admin/users' },
  { text: 'FAQs', icon: <HelpOutline />, link: '/admin/faqs' },
];

export default function AdminDrawer() {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('age');
    localStorage.removeItem('gender');
    localStorage.removeItem('nationality');
    localStorage.removeItem('postcode');
    localStorage.removeItem('name');
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="navbar" style={{ background: 'var(--primaryBackgroundColor)' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/admin" className=" navbar-item logo navbar-link"><img width="50px" height="50px" src="/images/HRLogoCMYKsmall.jpg" alt="logo" /></Link>
          <Link to="/login" className={classes.buttonContainer}>
            <Button variant="outlined" endIcon={<LogoutIcon />} style={{ color: 'var(--primaryBackgroundColor)' }} onClick={handleLogout}>
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sections.map((section, index) => (
            <ListItem button key={index} selected={section.link === pathname} component={Link} to={section.link}>
              <ListItemIcon>{section.icon}</ListItemIcon>
              <ListItemText primary={section.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="" element={<AdminHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="faqs" element={<FAQsManagement />} />
        </Routes>
      </Main>
    </Box>
  );
}
