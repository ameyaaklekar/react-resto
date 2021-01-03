import React from 'react'
import { Container, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Stock() {
  const useStyles = makeStyles((theme) => ({
    section: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      width: '100%'
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <section className={classes.section}>
        Stock
      </section>
    </Container>
  )
}
