import React, { useMemo, useState } from 'react'
import { Col,Form } from 'react-bootstrap';

export default function PermissionsForm({ permissions, employeePermissions }) {

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

  const onChange = (event, index) => {

    setCheckboxState(state => {
      let checkboxes = state.map((checkbox, i) => {
        if (i === index) {
          checkbox.checked = event.target.checked
          return checkbox;
        } else {
          return checkbox;
        }
      });

      return checkboxes
    })
  }

  useMemo(() => {
    let permissionsCheckbox = renderCheckbox(employeePermissions)
    setCheckboxState(permissionsCheckbox)
  }, [employeePermissions])

  return (
    <>
      {checkboxState.length > 0 && checkboxState.map((checkbox, index) => ( 
        <Col md="6" key={checkbox.id}>
          <Form.Check
            type="checkbox"
            name="permissions"
            label={checkbox.name}
            value={checkbox.codeName}
            checked={checkbox.checked}
            onChange={(e) => { onChange(e, index) }}
            />
        </Col>
      ))}
    </>
  )
}
