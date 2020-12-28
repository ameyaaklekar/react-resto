import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const defaultErrors = {
    message: "",
    data: [],
    show: false
  }

  const [error, setError] = useState(defaultErrors)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    try {
      setError(defaultErrors)
      setLoading(true)

      let response = await login(data)
      if (response.success) {
        history.push('/')
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
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
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
          Sign in
        </Typography>
        {error.show && 
          <Alert className={classes.alert} severity="error">{error.message}</Alert>
        }
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
            error={!!error.data && !!error.data.email }
            helperText={!!error.data && !!error.data.email && error.data.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
            error={!!error.data && !!error.data.password }
            helperText={!!error.data && !!error.data.password && error.data.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            size="large"
          >
            {loading ? <>
              <CircularProgress size={24} />
            </>
            :
            <>
              Sign In
            </>}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              Need an account? <Link to="/sign-up">Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
