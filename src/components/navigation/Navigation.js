import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useHistory, Link, Route, useLocation } from 'react-router-dom';
import { Switch } from 'react-router-dom'
import PrivateRoute from '../../middleware/PrivateRoute';
import PublicRoute from '../../middleware/PublicRoute';
import SignUp from '../signUp/SignUp';
import Login from '../login/Login';
import Dashboard from '../dashboard/Dashboard';
import NotFound from '../notFound/NotFound';
import PreferenceNav from './PreferenceNav';
import Suppliers from '../supplier/Supplier'
import Stock from '../stock/Stock'
import { usePermission } from '../../context/PermissionContext';
import { PermissionConstants } from '../../constants/PermissionConstant';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container, Drawer, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AccountCircle } from '@material-ui/icons';
import Hidden from '@material-ui/core/Hidden';

export default function Navigation() {

  const { currentUser, logout } = useAuth()
  const { checkPermissions } = usePermission()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);

  const history = useHistory()
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    await logout().then(() => {
      history.push('/login')
    })
  }

  const drawerWidth = 200;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    title: {
      flexGrow: 1,
    },
    userName: {
      fontSize: '16px',
      marginRight: '8px'
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
      },
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List component="nav">
          <ListItem selected={location.pathname === '/dashboard'} 
            button component={Link} 
            to='/dashboard' 
            key="dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          {checkPermissions(PermissionConstants.VIEW_SUPPLIER) &&
            <ListItem selected={location.pathname === '/suppliers'} 
              button component={Link} 
              to='/suppliers' 
              key="suppliers">
              <ListItemText primary="Suppliers" />
            </ListItem>
          }
          {checkPermissions(PermissionConstants.VIEW_STOCK) &&
            <ListItem selected={location.pathname === '/stock'} 
              button component={Link} 
              to='/stock' 
              key="stock">
              <ListItemText primary="Stock" />
            </ListItem>
          }
          
        </List>
      </div>
    </>
  );

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Resto
          </Typography>
          {currentUser ? 
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Hidden xsDown implementation="css">
                  <Typography variant="h6" className={classes.userName}>
                    {currentUser.firstName + ' ' + currentUser.lastName} 
                  </Typography>
                </Hidden>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/preference">Preference</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          : 
          <Button component={Link} to="/login" color="inherit">Login</Button>
          }
        </Toolbar>
      </AppBar>
      {currentUser && 
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>

          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      }
      <Container maxWidth="xl">
        <main className={classes.content}>
          <Switch>
            <PublicRoute name="SignUp" path="/sign-up" component={SignUp} />
            <PublicRoute name="Login" path="/login" component={Login} />
            <PrivateRoute name="Dashboard" exact path="/" component={Dashboard} />
            <PrivateRoute name="Preference" path="/preference" component={PreferenceNav} />
            <PrivateRoute name="Suppliers" path="/suppliers" component={Suppliers} />
            <PrivateRoute name="Stock" path="/stock" component={Stock} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Container>
    </div>
    </>
  )
}
