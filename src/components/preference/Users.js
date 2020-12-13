import React, { useState } from 'react'
import { Table, Button, Form } from 'react-bootstrap';
import { useEmployee } from '../../context/EmployeeContext';
import { useAuth } from '../../context/AuthContext';
import EmployeeModal from '../modal/EmployeeModal';

export default function Users() {

  const { currentUser } = useAuth()
  const { employees, updateStatus, getEmployee } = useEmployee()
  const [modalShow, setModalShow] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState([])

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
      setEmployeeToEdit(response.data)
      setModalShow(true)
    }
  }

  return (
    <>
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
        onHide={() => { setModalShow(false) }}
        employee={employeeToEdit}
        title="Edit Employee"
      />
    </>
  )
}
