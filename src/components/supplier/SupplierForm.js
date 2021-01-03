import React, { useEffect, useRef, useState } from 'react'

import { modalView } from '../preference/Users';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, InputAdornment } from '@material-ui/core';
import { useSupplier } from '../../context/SupplierContext';

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

export default function SupplierForm({ supplier, mode }) {
  const formRef = useRef()
  
  const defaults = {
    message: "",
    data: [],
    show: false
  }

  const [success, setSuccess] = useState(defaults)
  const [error, setError] = useState(defaults)
  const [loading, setLoading] = useState(false)

  const { createSupplier, updateSupplier } = useSupplier()

  async function handleSubmit(e) {
    e.preventDefault(e)
    setSuccess(defaults)
    setError(defaults)
    setLoading(true)
    
    const { name,
      contactPerson,
      countryCode,
      phoneNumber,
      email,
      address,
      city,
      state,
      country,
      postalCode,
    } = formRef.current

    const formData = {
      name: name.value,
      contactPerson: contactPerson.value,
      countryCode: countryCode.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      address: address.value,
      city: city.value,
      state: state.value,
      country: country.value,
      postalCode: postalCode.value,
      supplierId: supplier.id
    }

    let response
    
    if (mode === modalView.MODE_EDIT) {
      response = await updateSupplier(formData)
    } else {
      response = await createSupplier(formData)
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
              autoComplete="name"
              name="name"
              variant="outlined"
              fullWidth
              id="name"
              label="Name"
              error={!!error.data && !!error.data.name }
              helperText={!!error.data && !!error.data.name && error.data.name}
              defaultValue={supplier.name}
              disabled={mode === modalView.MODE_EDIT ? true : false}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              autoComplete="name"
              name="contactPerson"
              variant="outlined"
              fullWidth
              id="contactPerson"
              label="Contact Person"
              error={!!error.data && !!error.data.name }
              helperText={!!error.data && !!error.data.contactPerson && error.data.contactPerson}
              defaultValue={supplier.contactPerson}
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
              defaultValue={supplier.countryCode}
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
              defaultValue={supplier.phoneNumber}
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
              defaultValue={supplier.email}
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
              defaultValue={supplier.address}
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
              defaultValue={supplier.city}
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
              defaultValue={supplier.state}
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
              defaultValue={supplier.postalCode}
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
              defaultValue={supplier.country}
            />
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
            {mode === modalView.MODE_EDIT ? 'Update' : 'Add'}
          </>}
        </Button>
      </form>
    </>
  )
}
