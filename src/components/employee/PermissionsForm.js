import React, { useEffect, useMemo, useState } from 'react'
import { Col,Form } from 'react-bootstrap';

export default function PermissionsForm({ permissions, selectedPermissions }) {

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

  const data = useMemo(() => {
    return renderCheckbox(selectedPermissions)
  }, [selectedPermissions])

  return (
    <>
      {data.length > 0 && data.map((checkbox) => ( 
        <Col md="6" key={checkbox.id}>
          <Form.Check
            type="checkbox"
            name="permissions"
            label={checkbox.name}
            value={checkbox.codeName}
            checked={checkbox.checked}
            name="permissions"
          /> 
        </Col>
      ))}
    </>
  )
}
