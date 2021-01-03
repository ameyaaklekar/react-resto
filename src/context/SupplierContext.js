import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

const SupplierContext = React.createContext()

export function useSupplier() {
  return useContext(SupplierContext)
}

export default function SupplierProvider({ children }) {
  const [suppliers, setSupplier] = useState([])
  const [suppliersLoading, setSupplierLoading] = useState(true)

  async function getSuppliers() {
    try {
      let response = await axios.get("supplier")
      setSupplier(response.data.data)
      return response.data
    } catch (e) {
      setSupplier(null)
    }
    setSupplierLoading(false)
  }

  async function updateStatus(data) {
    try {
      let response = await axios.patch("supplier", data)
      return response.data
    } catch (e) {
      return e.response.data
    }
  }

  async function updateSupplier(data) {
    try {
      let response = await axios.put("supplier", data)
      return response.data
    } catch (e) {
      return e.response.data
    }
  }

  async function getSupplier(supplierId) {
    try {
      let response = await axios.get("supplier/" + supplierId)
      return response.data
    } catch (e) {
      if (e.response.data.errors) {
        return e.response.data
      }
    }
  }

  async function createSupplier(data) {
    try {
      let response = await axios.post("supplier", data)
      return response.data
    } catch (e) {
      return e.response.data
    }
  }

  useEffect(() => {
    getSuppliers().then((response) => {
      setSupplierLoading(false)
      return response
    })
  }, [])

  const value = {
    suppliers,
    getSuppliers,
    getSupplier,
    updateStatus,
    updateSupplier,
    createSupplier
  }

  return (
    <SupplierContext.Provider value={value}>
      {!suppliersLoading && children}
    </SupplierContext.Provider>
  )
}