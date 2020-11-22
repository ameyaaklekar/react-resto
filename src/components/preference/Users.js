import React from 'react'
import { FormCheck, Table } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { useEmployee } from '../../context/EmployeeContext';

export default function Users() {

  const {employees} = useEmployee()

  async function updateEmployeeStatus() {
    console.log('here')
  }

  return (
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
                {employee.status}
              </td>
              <td>Table cell</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}
