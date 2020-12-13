import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const EmployeeContext = React.createContext()

export function useEmployee() {
  return useContext(EmployeeContext)
}

export default function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([])
  const [employeesLoading, setEmployeesLoading] = useState(true)

  async function getEmployees() {
    try {
      let response = await axios.get("employee")
      setEmployees(response.data.data)
      return response.data
    } catch (e) {
      setEmployees(null)
    }
    setEmployeesLoading(false)
  }

  async function updateStatus(data) {
    try {
      let response = await axios.patch("employee", data)
      return response.data
    } catch (e) {
      return e.response.data
    }
  }

  async function updateEmployee(data) {
    try {
      let response = await axios.put("employee", data)
      return response.data
    } catch (e) {
      return e.response.data
    }
  }

  async function getEmployee(employeeId) {
    try {
      let response = await axios.get("employee/" + employeeId)
      return response.data
    } catch (e) {
      if (e.response.data.errors) {
        return e.response.data
      }
    }
  }

  async function getRoles() {
    try {
      let response = await axios.get("role")
      return response.data
    } catch (e) {
      if (e.response.data.errors) {
        return e.response.data
      }
    }
  }

  async function getPermissions() {
    try {
      let response = await axios.get("permission")
      if (!response.errors) {
        return response.data
      }
    } catch (e) {
      if (e.response.data.errors) {
        return e.response.data
      }
    }
  }

  async function getRolePermission(role) {
    try {
      let response = await axios.get("role/permission/" + role)
      return response.data
    } catch (e) {
      if (e.response.data.errors) {
        return e.response.data
      }
    }
  }

  useEffect(() => {
    getEmployees().then((response) => {
      setEmployeesLoading(false)
      return response
    })
  }, [])

  const value = {
    employees,
    getEmployees,
    getEmployee,
    updateStatus,
    getRoles,
    getPermissions,
    getRolePermission,
    updateEmployee
  }

  return (
    <EmployeeContext.Provider value={value}>
      {!employeesLoading && children}
    </EmployeeContext.Provider>
  )
}
