import React, { useRef, useState } from 'react'
import { Alert, Button, Container, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const emailRef = useRef()
  const passowrdRef = useRef()

  const defaultErrors = {
    message: "",
    data: [],
    show: false
  }

  const [error, setError] = useState(defaultErrors)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      email: emailRef.current.value,
      password: passowrdRef.current.value,
    }

    try {
      setError(defaultErrors)
      let response = await login(data)
      if (!response.success) {
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
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
      {error.show && 
        <Alert variant="danger">{error.message}</Alert>
      }
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  ref={emailRef}
                  required
                  isInvalid={!!error.data.email} />
                  <Form.Control.Feedback type="invalid" >
                    {error.data.email}
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  ref={passowrdRef}
                  required
                  isInvalid={!!error.data.password} />
                  <Form.Control.Feedback type="invalid" >
                    {error.data.password}
                  </Form.Control.Feedback>
              </Form.Group>
              <Button className="w-100" type="submit" disabled={loading}>Login</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/sign-up">Sign Up</Link>
        </div>
      </div>
    </Container>
  )
}
