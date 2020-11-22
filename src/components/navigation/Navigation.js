import React from 'react'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
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

export default function Navigation() {

  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const location = useLocation();

  async function handleLogout() {
    await logout().then(() => {
      history.push('/login')
    })
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav defaultActiveKey={location.pathname} className="d-flex w-100">
          {currentUser ? <>
            <Nav.Link as={Link} to="/" eventKey="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/suppliers" eventKey="/suppliers">Suppliers</Nav.Link>
            </>
            :
            <Nav.Link as={Link} to="/sign-up" eventKey="/sign-up">Register</Nav.Link>
          }
            {currentUser ? <>
              <NavDropdown 
                title={currentUser.firstName + ' ' + currentUser.lastName} 
                id="collasible-nav-dropdown"
                className="ml-auto"
                alignRight>
                <NavDropdown.Header>
                  {currentUser.company.name}<br></br>
                  {currentUser.email}
                </NavDropdown.Header>
                <NavDropdown.Item as={Link} to="/preference" eventKey="/preference">Preference</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </>
            : 
            <Button href="/login" className="ml-auto">Login</Button>
            } 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <PublicRoute name="SignUp" path="/sign-up" component={SignUp} />
        <PublicRoute name="Login" path="/login" component={Login} />
        <PrivateRoute name="Dashboard" exact path="/" component={Dashboard} />
        <PrivateRoute name="Preference" path="/preference" component={PreferenceNav} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}
