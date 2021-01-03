import React, { useEffect, useState } from 'react'
import { FormControlLabel, Checkbox, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    paddingTop: theme.spacing(0) + ' !important',
    paddingBottom: theme.spacing(0) + ' !important'
  },
  formControl: {
    margin: theme.spacing(0),
  },
}));

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

  useEffect(() => {
    let permissionsCheckbox = renderCheckbox(employeePermissions)
    setCheckboxState(permissionsCheckbox)
  }, [permissions, employeePermissions])

  const classes = useStyles();

  return (
    <>
      {checkboxState.length > 0 && checkboxState.map((checkbox, index) => ( 
        <Grid item xs={12} md={4} key={checkbox.id} className={classes.grid}>
          <FormControlLabel
            component="fieldset"
            className={classes.formControl}
            control={
              <Checkbox
                checked={checkbox.checked}
                name="permissions"
                color="primary"
                value={checkbox.codeName}
                onChange={(e) => { onChange(e, index) }}
              />
            }
            label={checkbox.name}
          />
        </Grid>
      ))}
    </>
  )
}
