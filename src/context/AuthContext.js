import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null)
  const [userLoading, setuserLoading] = useState(true)
  async function getUser() {
    try {
      let token = localStorage.getItem("Auth")

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
      let response = await axios.get("user")
      setCurrentUser(response.data.data)
      setuserLoading(false)
    } catch (e) {
      localStorage.removeItem("Auth")
      setCurrentUser(null)
      setuserLoading(false)
    }
  }

  async function signUp(data) {
    try {
      let response = await axios.post("register", data)
      return response.data
    } catch (e) {
      if (e.response.data.errors) {
        return e.response.data
      }
    }
  }

  async function login (data) {
    try {
      let response = await axios.post("login", data)
      if (!response.errors) {
        localStorage.setItem("Auth", response.data.data)
        getUser()
      }
      return response.data
    } catch (e) {
      localStorage.removeItem("Auth")
      if (e.response.data.errors) {
        return e.response.data
      }
    }
  }

  async function logout () {
    await axios.post("logout")
    localStorage.removeItem("Auth")
    setCurrentUser(null)
  }

  async function updateUser (data) {
    try {
      let response = await axios.put("user", data)
      if (response.data.success) {
        setCurrentUser(response.data.data)
      }
      return response.data
    } catch (e) {
      if (e.response.data.errors) {
        return e.response.data
      }
    }
  }

  useEffect(() => {
    getUser().then((unsubscribe) => {
      setuserLoading(false)
      return unsubscribe
    })
  }, [])

  const value = {
    currentUser,
    signUp,
    login,
    getUser,
    logout,
    updateUser
  }
  return (
    <AuthContext.Provider value={value}>
      {!userLoading && children}
    </AuthContext.Provider>
  )
}
