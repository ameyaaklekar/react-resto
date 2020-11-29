import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Alert, Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useEmployee } from '../../context/EmployeeContext';
import PermissionsForm from './PermissionsForm';

export default function EmployeeForm({ submitAction, employee}) {
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const contryCodeRef = useRef()
  const phoneNumberRef = useRef()
  const emailRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const stateRef = useRef()
  const postalCodeRef = useRef()
  const countryRef = useRef()
  const roleRef = useRef()
  const formRef = useRef()
  
  const defaults = {
    message: "",
    data: [],
    show: false
  }

  const [error, setError] = useState(defaults)
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [selectedPermissions, setSelectedPermissions] = useState([])

  const { getRoles, getPermissions, getRolePermission } = useEmployee()

  async function handleSubmit(e) {
    e.preventDefault(e)
    const { permissions } = formRef.current
    console.log(permissions)
    // const response = submitAction(employee.id)
  }

  async function handleOnRoleChange(e) {
    const role = roleRef.current.value
    const response = await getRolePermission(role)
    if (response.success) {
      setSelectedPermissions(response.data)
    }
  }

  const rolesOptions = roles.length > 0
		&& roles.map((role) => {
    let selected = (employee && employee.roles[0].codeName == role.codeName)
		return (
			<option key={role.id} value={role.codeName} selected={selected}>{role.name}</option>
		)
	}, this);

  useEffect(() => {
    if (employee && employee.permissions.length > 0) setSelectedPermissions(employee.permissions)

    getRoles().then((response) => {
      setRoles(response.data)
      getPermissions().then((response) => {
        setPermissions(response.data)
      })
    })
  }, [])

  return (
    <Container>
      {error.show && 
        <Row>
          <Col>
            <Alert variant="danger">{error.message}</Alert>
          </Col>
        </Row>
      }
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Row>
          <Col md="4">
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                ref={firstNameRef}
                defaultValue={employee.firstName}
                required
                isInvalid={!!error.data && !!error.data.firstName} />
                <Form.Control.Feedback type="invalid" >
                  {!!error.data && !!error.data.firstName && error.data.firstName}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                ref={lastNameRef}
                defaultValue={employee.lastName}
                required
                isInvalid={!!error.data && !!error.data.lastName} />
                <Form.Control.Feedback type="invalid" >
                  {!!error.data && !!error.data.lastName && error.data.lastName}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group id="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>+</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control 
                  className="col-3" 
                  type="tel" 
                  ref={contryCodeRef}
                  defaultValue={employee.countryCode}
                  required
                  isInvalid={!!error.data && !!error.data.countryCode} />
                <Form.Control 
                  type="tel" 
                  ref={phoneNumberRef}
                  required
                  defaultValue={employee.phoneNumber}
                  isInvalid={!!error.data && !!error.data.phoneNumber} />
                <Form.Control.Feedback type="invalid" >
                  {!!error.data && !!error.data.countryCode && error.data.countryCode} &nbsp;
                  {!!error.data && !!error.data.phoneNumber && error.data.phoneNumber}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="4">
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                ref={emailRef}
                defaultValue={employee.email}
                required
                isInvalid={!!error.data && !!error.data.email} />
                <Form.Control.Feedback type="invalid" >
                  {!!error.data && !!error.data.email && error.data.email}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
         <Col md="4">
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="text" 
                ref={addressRef}
                defaultValue={employee.address}
                required
                isInvalid={!!error.data && !!error.data.address} />
                <Form.Control.Feedback type="invalid" >
                  {!!error.data && !!error.data.address && error.data.address}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group id="city">
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text" 
                ref={cityRef}
                defaultValue={employee.city}
                required
                isInvalid={!!error.data && !!error.data.city} />
                <Form.Control.Feedback type="invalid" >
                  {!!error.data && !!error.data.city && error.data.city}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="4">
            <Form.Group id="state">
              <Form.Label>State</Form.Label>
              <Form.Control 
                type="text" 
                ref={stateRef}
                defaultValue={employee.state}
                required
                isInvalid={!!error.data && !!error.data.state} />
                <Form.Control.Feedback type="invalid" >
                  {!!error.data && !!error.data.state && error.data.state}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group id="postalCode">
              <Form.Label>Post Code</Form.Label>
              <Form.Control 
                type="text" 
                ref={postalCodeRef}
                defaultValue={employee.postalCode}
                required
                isInvalid={!!error.data && !!error.data.postalCode} />
                <Form.Control.Feedback type="invalid" >
                  {!!error.data && !!error.data.postalCode && error.data.postalCode}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group id="country">
              <Form.Label>Country</Form.Label>
              <Form.Control 
                type="text" 
                ref={countryRef}
                defaultValue={employee.country}
                required
                isInvalid={!!error.data && !!error.data.country} />
                <Form.Control.Feedback type="invalid" >
                  {!!error.data && !!error.data.country && error.data.country}
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <hr/>
          </Col>
        </Row>

        <Row>
          <Col md="4">
            <h5>Roles</h5>
            <Form.Group id="roles">
              <Form.Control as="select" defaultValue="test"
                ref={roleRef}
                onChange={handleOnRoleChange}
                custom>
                  <option value="" key="default">Select a role</option>
                  {rolesOptions}
              </Form.Control>
            </Form.Group>
          </Col>
          {permissions.length > 0 &&
          <Col md="8">
            <h5>Permissions</h5>
            <Row>
              <PermissionsForm 
                selectedPermissions={selectedPermissions}
                permissions={permissions}
              />
            </Row>
          </Col>
          }
          
        </Row>

        <Button className="w-100" type="submit" disabled={loading}>
          {loading ? <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </>
          :
          <>
            Save
          </>}
        </Button>
      </Form>
    </Container>
  )
}
