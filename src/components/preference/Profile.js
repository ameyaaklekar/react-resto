import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { usePermission } from '../../context/PermissionContext';
import { PermissionConstants } from '../../constants/PermissionConstant';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardContent, CardHeader, CircularProgress, Divider, InputAdornment, List, ListItem, ListItemText } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Profile() {
  const companyNameRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const contryCodeRef = useRef()
  const phoneNumberRef = useRef()
  const emailRef = useRef()
  const cityRef = useRef()
  const stateRef = useRef()
  const postCodeRef = useRef()
  const addressRef = useRef()
  const countryRef = useRef()

  const defaults = {
    message: "",
    data: [],
    show: false
  }

  const [error, setError] = useState(defaults)
  const [success, setSuccess] = useState(defaults)
  const [loading, setLoading] = useState(false)
  const { currentUser, updateUser } = useAuth()
  const { checkPermissions } = usePermission()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      countryCode: contryCodeRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      postalCode: postCodeRef.current.value,
      country: countryRef.current.value,
      userId: currentUser.id
    }

    try {
      setError(defaults)
      setSuccess(defaults)
      setLoading(true)
      let response = await updateUser(data)
      if (response.success) {
        setSuccess({
          message: "User updated successfully",
          data: [],
          show: true
        })
      } else {
        setError({
          message: response.message,
          data: response.errors,
          show: true
        })
      }
    } catch (e) {
      setError({
        message: e.message,
        data: e.errors,
        show: true
      })
    }
    setLoading(false)
  }

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
  }));

  const classes = useStyles();

  return (
    <>
      {checkPermissions(PermissionConstants.UPDATE_PROFILE) ? 
        <>
          {error.show && 
            <Alert className={classes.alert} severity="error">{error.message}</Alert>
          }
          {success.show && 
            <Alert className={classes.alert} severity="success">{success.message}</Alert>
          }
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="company"
                  label="Company"
                  name="company"
                  autoFocus
                  inputRef={companyNameRef}
                  error={!!error.data && !!error.data.company }
                  helperText={!!error.data && !!error.data.company && error.data.company}
                  defaultValue={currentUser.company.name}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="firstname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  inputRef={firstNameRef}
                  error={!!error.data && !!error.data.firstName }
                  helperText={!!error.data && !!error.data.firstName && error.data.firstName}
                  defaultValue={currentUser.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="lastname"
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  inputRef={lastNameRef}
                  error={!!error.data && !!error.data.lastName }
                  helperText={!!error.data && !!error.data.lastName && error.data.lastName}
                  defaultValue={currentUser.lastName}
                />
              </Grid>
              <Grid item xs={4} sm={2}>
                <TextField
                  autoComplete="countryCode"
                  name="countryCode"
                  variant="outlined"
                  fullWidth
                  id="countryCode"
                  label="Country Code"
                  inputRef={contryCodeRef}
                  error={!!error.data && !!error.data.countryCode }
                  helperText={!!error.data && !!error.data.countryCode && error.data.countryCode}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+</InputAdornment>,
                  }}
                  defaultValue={currentUser.countryCode}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  autoComplete="phoneNumber"
                  variant="outlined"
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  inputRef={phoneNumberRef}
                  error={!!error.data && !!error.data.phoneNumber }
                  helperText={!!error.data && !!error.data.phoneNumber && error.data.phoneNumber}
                  defaultValue={currentUser.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                  error={!!error.data && !!error.data.email }
                  helperText={!!error.data && !!error.data.email && error.data.email}
                  defaultValue={currentUser.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  inputRef={addressRef}
                  error={!!error.data && !!error.data.address }
                  helperText={!!error.data && !!error.data.address && error.data.address}
                  defaultValue={currentUser.address}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  inputRef={cityRef}
                  error={!!error.data && !!error.data.city }
                  helperText={!!error.data && !!error.data.city && error.data.city}
                  defaultValue={currentUser.city}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state"
                  inputRef={stateRef}
                  error={!!error.data && !!error.data.state }
                  helperText={!!error.data && !!error.data.state && error.data.state}
                  defaultValue={currentUser.state}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postCode"
                  label="Post Code"
                  name="postCode"
                  autoComplete="postCode"
                  inputRef={postCodeRef}
                  error={!!error.data && !!error.data.postalCode }
                  helperText={!!error.data && !!error.data.postalCode && error.data.postalCode}
                  defaultValue={currentUser.postalCode}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  inputRef={countryRef}
                  error={!!error.data && !!error.data.country }
                  helperText={!!error.data && !!error.data.country && error.data.country}
                  defaultValue={currentUser.country}
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
                Update
              </>}
            </Button>
          </form>
        </>

        :

        <>
          <Card className={classes.detailsCard}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
                </Avatar>
              }
              title={
                <Typography variant="h5" color="textPrimary" component="h5">
                  {currentUser.firstName} {currentUser.lastName}
                </Typography>
              }
              subheader={
                <>
                  <Typography variant="body1" color="textSecondary" component="p">
                    {currentUser.company.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {currentUser.email}
                  </Typography>
                </>
              }
            />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Role"
                    secondary={currentUser.roles[0].name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Address"
                    secondary={
                      <Typography variant="body2" color="textSecondary" component="p">
                        {currentUser.address} <br/>
                        {currentUser.city} <br/>
                        {currentUser.state} <br/>
                        {currentUser.postalCode} <br/>
                        {currentUser.country} <br/>
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last password changed At:"
                    secondary={currentUser.passwordChangedAt ? currentUser.passwordChangedAt : 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last updated At:"
                    secondary={currentUser.updateAt}
                  />
                </ListItem>
              </List>
              <Typography variant="body2" color="textPrimary" component="p">
                <strong>Please ask the Admin/Manager to update any of the following details.</strong>
              </Typography>
            </CardContent>
          </Card>
        </>
      }

    </>
  )
}
