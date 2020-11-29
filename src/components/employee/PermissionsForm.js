import React, { useEffect, useState } from 'react'
import { Col,Form } from 'react-bootstrap';

export default function PermissionsForm({ permissions, selectedPermissions }) {

  const [checkbox, setCheckbox] = useState([])

  let renderCheckbox = () => {
    const permissionCheckbox = []
    permissions.map((permission) => {
      let selected = selectedPermissions.length > 0 
        && selectedPermissions.filter((selected) => selected.codeName == permission.codeName)
        permissionCheckbox.push(
          <Col md="6">
            <Form.Check
              type="switch"
              name="permissions"
              label={permission.name}
              value={permission.codeName}
              defaultChecked={selected.length > 0}
              name="permissions"
            /> 
          </Col>
        )
    })
    
    setCheckbox(permissionCheckbox)
  }

  useEffect(() => {
    return renderCheckbox()
  }, [selectedPermissions])

  return checkbox
}
