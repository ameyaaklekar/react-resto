import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import EmployeeForm from '../employee/EmployeeForm';

export default function EmployeeModal(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <EmployeeForm 
          employee={props.employee}
          submitAction={props.submitAction}
        />
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}
