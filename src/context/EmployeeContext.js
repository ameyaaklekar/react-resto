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

  useEffect(() => {
    getEmployees().then((response) => {
      setEmployeesLoading(false)
      return response
    })
  }, [])

  const value = {
    employees,
    getEmployees
  }

  return (
    <EmployeeContext.Provider value={value}>
      {!employeesLoading && children}
    </EmployeeContext.Provider>
  )
}
