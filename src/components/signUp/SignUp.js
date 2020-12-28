import React, { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CircularProgress, InputAdornment } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

export default function SignUp() {
  const companyNameRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const contryCodeRef = useRef()
  const phoneNumberRef = useRef()
  const emailRef = useRef()
  const passowrdRef = useRef()
  const confirmPassowrdRef = useRef()
  const captchaRef = useRef()

  const defaults = {
    message: "",
    data: [],
    show: false
  }

  const [error, setError] = useState(defaults)
  const [loading, setLoading] = useState(false)

  const { signUp } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      company: { 
        name: companyNameRef.current.value 
      },
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      countryCode: contryCodeRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      email: emailRef.current.value,
      password: passowrdRef.current.value,
      confirmPassword: confirmPassowrdRef.current.value,
      robot: captchaRef.current.value
    }

    try {
      setError(defaults)
      setLoading(true)
      let response = await signUp(data)
      console.log(response)
      if (response.success) {
        history.push('/login')
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

  async function verify(value) {
    captchaRef.current.value = value
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
    }
  }));

  const classes = useStyles();

  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error.show && 
          <Alert className={classes.alert} severity="error">{error.message}</Alert>
        }
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
              />
            </Grid>
            <Grid item xs={5}>
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
              />
            </Grid>
            <Grid item xs={7}>
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
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passowrdRef}
                error={!!error.data && !!error.data.password }
                helperText={!!error.data && !!error.data.password && error.data.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                inputRef={confirmPassowrdRef}
                error={!!error.data && !!error.data.confirmPassword }
                helperText={!!error.data && !!error.data.confirmPassword && error.data.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <ReCAPTCHA sitekey="6LfreLQZAAAAAI7rloxhlVtP5j3fN_vKaP76ymSQ" ref={captchaRef} onChange={verify} />
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
              Sign Up
            </>}
          </Button>
          <Grid container justify="center">
            <Grid item>
              Already have an account? <Link to="/login">Login</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}