import React from 'react'
import { Modal } from 'react-bootstrap';
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
          mode={props.mode}
          employee={props.employee}
        />
      </Modal.Body>
    </Modal>
  )
}
