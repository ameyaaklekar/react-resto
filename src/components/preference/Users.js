import React, { useState } from 'react'
import { Table, Button, Form } from 'react-bootstrap';
import { useEmployee } from '../../context/EmployeeContext';
import { useAuth } from '../../context/AuthContext';
import EmployeeModal from '../modal/EmployeeModal';

export const modalView = {
  MODE_EDIT: "edit",
  MODE_NEW: "new",
}

export default function Users() {

  const { currentUser } = useAuth()
  const { employees, updateStatus, getEmployee, getEmployees } = useEmployee()
  const [modalShow, setModalShow] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState([])
  const [mode, setMode] = useState(modalView.MODE_NEW)

  async function updateEmployeeStatus(employeeId, status) {
    let data = []
    if (status) {
      data = {
        companyId: currentUser.company.id,
        employeeId: employeeId,
        status: "A"
      }
    } else {
      data = {
        companyId: currentUser.company.id,
        employeeId: employeeId,
        status: "I"
      }
    }

    await updateStatus(data)
  }

  async function editEmployee(employeeId) {
    let response = await getEmployee(employeeId)
    if (response.success) {
      setMode(modalView.MODE_EDIT)
      setEmployeeToEdit(response.data)
      setModalShow(true)
    }
  }

  async function createEmployee() {
    setEmployeeToEdit([])
    setMode(modalView.MODE_NEW)
    setModalShow(true)
  }

  async function onHide() {
    getEmployees()
    setModalShow(false)
  }

  return (
    <>
      <Button variant="outline-primary" onClick={createEmployee}>Create New Employee</Button>
      <hr/>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.email}</td>
                <td>+{employee.countryCode} {employee.phoneNumber}</td>
                <td>
                  <Form.Check 
                    type="switch"
                    id={employee.id}
                    label=""
                    defaultChecked = {employee.status === 'A'}
                    onChange={(e) => updateEmployeeStatus(employee.id, e.target.checked)}
                  />               
                </td>
                <td>
                  <Button variant="primary" onClick={() => editEmployee(employee.id)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <EmployeeModal 
        show={modalShow}
        onHide={onHide}
        employee={employeeToEdit}
        mode={mode}
        title={mode === modalView.MODE_EDIT ? "Edit Employee" : "Create Employee"}
      />
    </>
  )
}
