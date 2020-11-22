import React from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import PrivateRoute from '../../middleware/PrivateRoute'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import Profile from '../preference/Profile'
import Preference from '../preference/Preference';

export default function PreferenceNav() {
  const { path, url } = useRouteMatch()
  const location = useLocation();

  return (
    <section className="section">
      <Container fluid>
        <Tab.Container id="left-tabs-example" defaultActiveKey={location.pathname}>
          <Row>
            <Col sm={3} md={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link as={Link} to={`${url}/profile`} eventKey={`${url}/profile`}>Profile</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} md={10}>
              <PrivateRoute exact path={`${path}`} component={Preference} />
              <PrivateRoute path={`${path}/profile`} component={Profile} />
            </Col>
          </Row>
        </Tab.Container> 
      </Container>
    </section>
  )
}
