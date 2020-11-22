import React, { useContext } from 'react'
import { useAuth } from './AuthContext';

const PermissionsContext = React.createContext()

export function usePermission() {
  return useContext(PermissionsContext)
}

export default function PermissionProvider({ children }) {
  const { currentUser } = useAuth()

  function checkPermissions(permission) {
    if (currentUser && currentUser.permissions.length > 0) {
      var hasPermisisons = currentUser.permissions.filter(function(el) {
        return el.codeName === permission
      })

      return hasPermisisons.length > 0 ? true : false
    } else {
      return false
    }
  }

  const value = {
    checkPermissions
  }

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  )
}
