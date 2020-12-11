import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Col,Form } from 'react-bootstrap';

export default function PermissionsForm({ permissions, selectedPermissions }) {

  const [checkboxState, setCheckboxState] = useState([])
  
  const renderCheckbox = (selectedData) => {
    const checkbox = []

    permissions.map((permission) => {
      let selected = selectedData.length > 0 
        && selectedData.filter((selected) => selected.codeName == permission.codeName)

        checkbox.push({
          id: permission.id,
          name: permission.name,
          codeName: permission.codeName,
          checked: selected.length > 0
        })
    })
    
    return checkbox
  }

  useMemo(() => {
    let permissionsCheckbox = renderCheckbox(selectedPermissions)
    setCheckboxState(permissionsCheckbox)
  }, [selectedPermissions])

  return (
    <>
      {checkboxState.length && checkboxState.map((checkbox) => ( 
        <Col md="6" key={checkbox.id}>
          <input type="checkbox" 
            name="permissions"
            label={checkbox.name}
            value={checkbox.codeName}
            defaultChecked={checkbox.checked}
            /> 
            {checkbox.name}
        </Col>
      ))}
    </>
  )
}
