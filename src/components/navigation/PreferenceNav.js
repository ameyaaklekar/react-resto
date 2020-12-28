import React, { useState } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import PrivateRoute from '../../middleware/PrivateRoute'
import Profile from '../preference/Profile'
import Preference from '../preference/Preference';
import Users from '../preference/Users';
import EmployeeProvider from '../../context/EmployeeContext'

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tab, Tabs } from '@material-ui/core'

export default function PreferenceNav() {
  
  const { path, url } = useRouteMatch()
  const location = useLocation();

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%'
    },

    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    },

    main: {
      marginTop: theme.spacing(3),
      width: '100%'
    }
  }));
  
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <EmployeeProvider>
        <section className={classes.paper}>
          <Paper className={classes.root}>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              centered
              value={value}
              onChange={handleChange}
            >
              <Tab label="Preference" component={Link} to="/preference" />
              <Tab label="Profile" component={Link} to={`${url}/profile`} />
              <Tab label="Users & Permissions" component={Link} to={`${url}/users`} />
            </Tabs>
          </Paper>
          <div className={classes.main}>
            <PrivateRoute exact path={`${path}`} component={Preference} />
            <PrivateRoute path={`${path}/profile`} component={Profile} />
            <PrivateRoute path={`${path}/users`} component={Users} />
          </div>
        </section>
      </EmployeeProvider>
    </Container>
  )
}
