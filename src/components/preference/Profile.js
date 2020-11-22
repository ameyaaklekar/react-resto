import React, { useRef, useState } from 'react'
import { Alert, Button, Container, Card, Form, InputGroup, Col, Spinner, ListGroup } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext';
import { usePermission } from '../../context/PermissionContext';
import { PermissionConstants } from '../../constants/PermissionConstant';

export default function Profile() {
  const companyNameRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const contryCodeRef = useRef()
  const phoneNumberRef = useRef()
  const emailRef = useRef()
  const cityRef = useRef()
  const stateRef = useRef()
  const postCodeRef = useRef()
  const addressRef = useRef()
  const countryRef = useRef()

  const defaults = {
    message: "",
    data: [],
    show: false
  }

  const [error, setError] = useState(defaults)
  const [success, setSuccess] = useState(defaults)
  const [loading, setLoading] = useState(false)
  const { currentUser, updateUser } = useAuth()
  const { checkPermissions } = usePermission()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      countryCode: contryCodeRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      postalCode: postCodeRef.current.value,
      country: countryRef.current.value,
      userId: currentUser.id
    }

    try {
      setError(defaults)
      setSuccess(defaults)
      setLoading(true)
      let response = await updateUser(data)
      if (response.success) {
        setSuccess({
          message: "User updated successfully",
          data: [],
          show: true
        })
      } else {
        setError({
          message: response.message,
          data: response.errors,
          show: true
        })
      }
    } catch (e) {
      setError({
        message: e.message,
        data: e.errors,
        show: true
      })
    }
    setLoading(false)
  }

  return (
    <>
      {checkPermissions(PermissionConstants.UPDATE_PROFILE) ? 
        <>
          <Alert show={error.show} onClose={() => setError(defaults)} dismissible variant="danger">{error.message}</Alert>
          <Alert show={success.show} onClose={() => setSuccess(defaults)} dismissible variant="success">{success.message}</Alert>
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} sm="12" md="4" id="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control 
                  type="text" 
                  defaultValue={currentUser.company.name}
                  disabled />
              </Form.Group>

              <Form.Group as={Col} sm="12" md="4" id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={firstNameRef}
                  required
                  isInvalid={!!error.data && !!error.data.firstName}
                  defaultValue={currentUser.firstName}
                  placeholder="First Name" />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.firstName && error.data.firstName}
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm="12" md="4" id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={lastNameRef}
                  required
                  isInvalid={!!error.data && !!error.data.lastName}
                  defaultValue={currentUser.lastName}
                  placeholder="Last Name" />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.lastName && error.data.lastName}
                  </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} sm="12" md="4" id="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>+</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control 
                    className="col-3" 
                    type="tel" 
                    ref={contryCodeRef}
                    required
                    isInvalid={!!error.data && !!error.data.countryCode} 
                    defaultValue={currentUser.countryCode}
                    placeholder="Country Code" />
                  <Form.Control 
                    type="tel" 
                    ref={phoneNumberRef}
                    required
                    isInvalid={!!error.data && !!error.data.phoneNumber}
                    defaultValue={currentUser.phoneNumber}
                    placeholder="Phone Number" />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.countryCode && error.data.countryCode} &nbsp;
                    {!!error.data && !!error.data.phoneNumber && error.data.phoneNumber}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} sm="12" md="4" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  ref={emailRef}
                  required
                  isInvalid={!!error.data && !!error.data.email}
                  defaultValue={currentUser.email}
                  placeholder="Email" />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.email && error.data.email}
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm="12" md="4" id="email">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={addressRef}
                  required
                  isInvalid={!!error.data && !!error.data.address}
                  defaultValue={currentUser.address} 
                  placeholder="Address" />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.address && error.data.address}
                  </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} sm="12" md="3" id="city">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={cityRef}
                  required
                  isInvalid={!!error.data && !!error.data.city}
                  defaultValue={currentUser.city}
                  placeholder="City" />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.city && error.data.city}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="12" md="3" id="state">
                <Form.Label>State</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={stateRef}
                  required
                  isInvalid={!!error.data && !!error.data.state}
                  defaultValue={currentUser.state}
                  placeholder="State" />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.state && error.data.state}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="12" md="3" id="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={postCodeRef}
                  required
                  isInvalid={!!error.data && !!error.data.postalCode}
                  defaultValue={currentUser.postalCode}
                  placeholder="Postal Code" />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.postalCode && error.data.postalCode}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="12" md="3" id="postalCode">
                <Form.Label>Country</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={countryRef}
                  required
                  isInvalid={!!error.data && !!error.data.country}
                  defaultValue={currentUser.country}
                  placeholder="Postal Code" />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.country && error.data.country}
                  </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
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
                Update
              </>
            }
            </Button>
          </Form>
        </>

        :

        <>
          <Card>
            <Card.Body>
              <Card.Title>{currentUser.firstName} {currentUser.lastName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{currentUser.email}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{currentUser.company.name}</Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">{currentUser.roles[0].name}</Card.Subtitle>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Contact:</strong> <br/>
                  +{currentUser.countryCode} {currentUser.phoneNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Address:</strong> <br/>
                  {currentUser.address} <br/>
                  {currentUser.city} <br/>
                  {currentUser.state} <br/>
                  {currentUser.postalCode} <br/>
                  {currentUser.country} <br/>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Last password changed At:</strong> <br/>
                  {currentUser.passwordChangedAt}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Last updated At:</strong> <br/>
                  {currentUser.updateAt}
                </ListGroup.Item>
              </ListGroup>
              <Card.Text>
                Please ask the Admin to update any of the following details.
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      }

    </>
  )
}
