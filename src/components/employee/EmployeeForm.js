import React, { useEffect, useRef, useState } from 'react'

import { useEmployee } from '../../context/EmployeeContext';
import PermissionsForm from './PermissionsForm';
import { modalView } from '../preference/Users';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Divider, InputAdornment, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    margin: theme.spacing(1),
    width: '100%',
  },
  detailsCard: {
    minWidth: 275,
    maxWidth: 500,
  },
  secondaryHeading: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    minWidth: '100%',
  },
}));

export default function EmployeeForm({ employee, mode }) {
  const formRef = useRef()
  
  const defaults = {
    message: "",
    data: [],
    show: false
  }

  const [success, setSuccess] = useState(defaults)
  const [error, setError] = useState(defaults)
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [employeePermissions, setEmployeePermissions] = useState([])

  const { getRoles, getPermissions, getRolePermission, updateEmployee, createEmployee } = useEmployee()

  async function handleSubmit(e) {
    e.preventDefault(e)
    setSuccess(defaults)
    setError(defaults)
    setLoading(true)
    
    const { firstName,
      lastName,
      countryCode,
      phoneNumber,
      email,
      address,
      city,
      state,
      country,
      postalCode,
      role,
      permissions
    } = formRef.current

    let permissionsArray = []

    permissions.forEach((permission) => {
      if (permission.checked) permissionsArray.push(permission.value)
    })

    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      countryCode: countryCode.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      address: address.value,
      city: city.value,
      state: state.value,
      country: country.value,
      postalCode: postalCode.value,
      role: role.value,
      permissions: permissionsArray,
      employeeId: employee.id
    }

    let response
    
    if (mode === modalView.MODE_EDIT) {
      response = await updateEmployee(formData)
    } else {
      response = await createEmployee(formData)
    }

    if (response.success) {
      setSuccess({
        message: response.message,
        data: response.data,
        show: true
      })
    } else {
      setError({
        message: response.message,
        data: response.errors,
        show: true
      })
    }

    setLoading(false)
  }

  async function handleOnRoleChange(event) {
    const role = event.target.value
    if (role) {
      const response = await getRolePermission(role)
  
      if (response && response.success) {
        setEmployeePermissions(response.data)
      }
    } else {
      setEmployeePermissions([])
    }
  }

  const rolesOptions = roles.length > 0
		&& roles.map((role) => {
    let selected = (employee && employee.roles && employee.roles[0].codeName === role.codeName)
		return (
			<MenuItem key={role.id} value={role.codeName} selected={selected}>{role.name}</MenuItem>
		)
	}, this);

  useEffect(() => {
    if (mode === modalView.MODE_EDIT) {
      if (employee && employee.permissions.length > 0) setEmployeePermissions(employee.permissions)
    }
    getRoles().then((response) => {
      setRoles(response.data)
      getPermissions().then((response) => {
        setPermissions(response.data)
      })
    })
  }, [])

  const classes = useStyles();

  return (
    <>
      {error.show && 
        <Alert className={classes.alert} severity="error">{error.message}</Alert>
      }
      {success.show && 
        <Alert className={classes.alert} severity="success">{success.message}</Alert>
      }
      <form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              autoComplete="firstname"
              name="firstName"
              variant="outlined"
              fullWidth
              id="firstName"
              label="First Name"
              error={!!error.data && !!error.data.firstName }
              helperText={!!error.data && !!error.data.firstName && error.data.firstName}
              defaultValue={employee.firstName}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              autoComplete="lastname"
              variant="outlined"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              error={!!error.data && !!error.data.lastName }
              helperText={!!error.data && !!error.data.lastName && error.data.lastName}
              defaultValue={employee.lastName}
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <TextField
              autoComplete="countryCode"
              name="countryCode"
              variant="outlined"
              fullWidth
              id="countryCode"
              label="Country Code"
              error={!!error.data && !!error.data.countryCode }
              helperText={!!error.data && !!error.data.countryCode && error.data.countryCode}
              InputProps={{
                startAdornment: <InputAdornment position="start">+</InputAdornment>,
              }}
              defaultValue={employee.countryCode}
            />
          </Grid>
          <Grid item xs={8} md={4}>
            <TextField
              autoComplete="phoneNumber"
              variant="outlined"
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              error={!!error.data && !!error.data.phoneNumber }
              helperText={!!error.data && !!error.data.phoneNumber && error.data.phoneNumber}
              defaultValue={employee.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!error.data && !!error.data.email }
              helperText={!!error.data && !!error.data.email && error.data.email}
              defaultValue={employee.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              error={!!error.data && !!error.data.address }
              helperText={!!error.data && !!error.data.address && error.data.address}
              defaultValue={employee.address}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              error={!!error.data && !!error.data.city }
              helperText={!!error.data && !!error.data.city && error.data.city}
              defaultValue={employee.city}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              fullWidth
              id="state"
              label="State"
              name="state"
              autoComplete="state"
              error={!!error.data && !!error.data.state }
              helperText={!!error.data && !!error.data.state && error.data.state}
              defaultValue={employee.state}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              fullWidth
              id="postalCode"
              label="Post Code"
              name="postalCode"
              autoComplete="postalCode"
              error={!!error.data && !!error.data.postalCode }
              helperText={!!error.data && !!error.data.postalCode && error.data.postalCode}
              defaultValue={employee.postalCode}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              variant="outlined"
              fullWidth
              id="country"
              label="Country"
              name="country"
              autoComplete="country"
              error={!!error.data && !!error.data.country }
              helperText={!!error.data && !!error.data.country && error.data.country}
              defaultValue={employee.country}
            />
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="textPrimary" component="h6" className={classes.secondaryHeading}>
              Roles
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}
              error={!!error.data && !!error.data.role }
              >
              <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                defaultValue={employee.roles && employee.roles[0].codeName}
                onChange={handleOnRoleChange}
                label="Role"
                name="role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {rolesOptions}
              </Select>
              <FormHelperText>{!!error.data && !!error.data.role && error.data.role}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" color="textPrimary" component="h6" className={classes.secondaryHeading}>
              Permissions
            </Typography>
            <Grid container spacing={2}>
              <PermissionsForm 
                permissions={permissions}
                employeePermissions={employeePermissions}
              />
            </Grid>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          size="large"
        >
          {loading ? <>
            <CircularProgress size={24} />
          </>
          :
          <>
            Update
          </>}
        </Button>
      </form>
    </>
  )
}
