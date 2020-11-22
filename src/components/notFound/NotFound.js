import React from 'react'
import { Container } from 'react-bootstrap'

export default function NotFound() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <h1>404</h1>
      <p>Page not found</p>
    </Container>
  )
}
