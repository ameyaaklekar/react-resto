import React, { useRef, useState } from 'react'
import { Alert, Button, Container, Card, Form, InputGroup } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SignUp() {
  const companyNameRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const contryCodeRef = useRef()
  const phoneNumberRef = useRef()
  const emailRef = useRef()
  const passowrdRef = useRef()
  const confirmPassowrdRef = useRef()
  const captchaRef = useRef()

  const defaultErrors = {
    message: "",
    data: [],
    show: false
  }

  const [error, setError] = useState(defaultErrors)
  const [loading, setLoading] = useState(false)

  const { signUp } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      company: { 
        name: companyNameRef.current.value 
      },
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      countryCode: contryCodeRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value,
      password: passowrdRef.current.value,
      confirmPassword: confirmPassowrdRef.current.value,
      robot: captchaRef.current.value
    }

    try {
      setError(defaultErrors)
      setLoading(true)
      let response = await signUp(data)
      console.log(response)
      if (response.success) {
        history.push('/login')
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

  async function verify(value) {
    captchaRef.current.value = value
  }

  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "500px" }}>
      {error.show && 
        <Alert variant="danger">{error.message}</Alert>
      }
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={companyNameRef}
                  required
                  isInvalid={!!error.data && !!error.data.company } />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.company && error.data.company}
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={firstNameRef}
                  required
                  isInvalid={!!error.data && !!error.data.firstName} />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.firstName && error.data.firstName}
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  ref={lastNameRef}
                  required
                  isInvalid={!!error.data && !!error.data.lastName} />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.lastName && error.data.lastName}
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>+</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control 
                    className="col-3" 
                    type="text" 
                    ref={contryCodeRef}
                    required
                    isInvalid={!!error.data && !!error.data.countryCode} />
                  <Form.Control 
                    type="text" 
                    ref={phoneNumberRef}
                    required
                    isInvalid={!!error.data && !!error.data.phoneNumber} />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.countryCode && error.data.countryCode} &nbsp;
                    {!!error.data && !!error.data.phoneNumber && error.data.phoneNumber}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  ref={emailRef}
                  required
                  isInvalid={!!error.data && !!error.data.email} />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.email && error.data.email}
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  ref={passowrdRef}
                  required
                  isInvalid={!!error.data && !!error.data.password} />
                  <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.password && error.data.password}
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  ref={confirmPassowrdRef}
                  required
                  isInvalid={!!error.data && !!error.data.confirmPassword} />
                <Form.Control.Feedback type="invalid" >
                    {!!error.data && !!error.data.confirmPassword && error.data.confirmPassword}
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group id="recaptcha">
                <ReCAPTCHA sitekey="6LfreLQZAAAAAI7rloxhlVtP5j3fN_vKaP76ymSQ" ref={captchaRef} onChange={verify} />
              </Form.Group>
              <Button className="w-100" type="submit" disabled={loading}>Sign Up</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </Container>
  )
}