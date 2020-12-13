import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Alert, Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { useEmployee } from '../../context/EmployeeContext';
import PermissionsForm from './PermissionsForm';
import { modalView } from '../preference/Users';

export default function EmployeeForm({ employee, mode }) {
  const formRef = useRef()
  const roleRef = useRef()
  
  const defaults = {
    message: "",
    data: [],
    show: false
  }

  const [success, setSuccess] = useState(defaults)
  const [error, setError] = useState(defaults)
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [employeePermissions, setEmployeePermissions] = useState([])

  const { getRoles, getPermissions, getRolePermission, updateEmployee, createEmployee } = useEmployee()

  async function handleSubmit(e) {
    e.preventDefault(e)
    setSuccess(defaults)
    setError(defaults)
    setLoading(true)
    
    const { firstName,
      lastName,
      countryCode,
      phoneNumber,
      email,
      address,
      city,
      state,
      country,
      postalCode,
      role,
      permissions
    } = formRef.current

    let permissionsArray = []

    permissions.forEach((permission) => {
      if (permission.checked) permissionsArray.push(permission.value)
    })

    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      countryCode: countryCode.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      address: address.value,
      city: city.value,
      state: state.value,
      country: country.value,
      postalCode: postalCode.value,
      role: role.value,
      permissions: permissionsArray,
      employeeId: employee.id
    }

    let response
    
    if (mode === modalView.MODE_EDIT) {
      response = await updateEmployee(formData)
    } else {
      response = await createEmployee(formData)
    }

    if (response.success) {
      setSuccess({
        message: response.message,
        data: response.data,
        show: true
      })
    } else {
      setError({
        message: response.message,
        data: response.errors,
        show: true
      })
    }

    setLoading(false)
  }

  async function handleOnRoleChange(e) {
    const role = roleRef.current.value

    if (role) {
      const response = await getRolePermission(role)
  
      if (response && response.success) {
        setEmployeePermissions(response.data)
      }
    } else {
      setEmployeePermissions([])
    }
  }

  const rolesOptions = roles.length > 0
		&& roles.map((role) => {
    let selected = (employee && employee.roles && employee.roles[0].codeName === role.codeName)
		return (
			<option key={role.id} value={role.codeName} selected={selected}>{role.name}</option>
		)
	}, this);

  useEffect(() => {
    if (mode === modalView.MODE_EDIT) {
      if (employee && employee.permissions.length > 0) setEmployeePermissions(employee.permissions)
    }
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

      {success.show && 
        <Row>
          <Col>
            <Alert variant="success">{success.message}</Alert>
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
                name="firstName"
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
                name="lastName"
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
                  name="countryCode"
                  defaultValue={employee.countryCode}
                  required
                  isInvalid={!!error.data && !!error.data.countryCode} />
                <Form.Control 
                  type="tel" 
                  name="phoneNumber"
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
                name="email"
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
                name="address"
                defaultValue={employee.address}
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
                name="city"
                defaultValue={employee.city}
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
                name="state"
                defaultValue={employee.state}
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
                name="postalCode"
                defaultValue={employee.postalCode}
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
                name="country"
                defaultValue={employee.country}
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
                name="role"
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
                employeePermissions={employeePermissions}
                permissions={permissions}
              />
            </Row>
          </Col>
          }
          
        </Row>

        <Row>
          <Col>
            <hr/>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button type="submit" disabled={loading} block>
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
          </Col>
        </Row>
      </Form>
    </Container>
  )
}
