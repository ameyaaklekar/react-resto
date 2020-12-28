import React, { useState } from 'react'
import EmployeeForm from '../employee/EmployeeForm';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, useMediaQuery, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function EmployeeModal(props) {
  const classes = useStyles();
  return (
    <Dialog
      {...props}
      fullWidth={true}
      maxWidth="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <DialogTitle id="responsive-dialog-title">
        {props.title}
        <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <EmployeeForm 
          mode={props.mode}
          employee={props.employee}
        />
      </DialogContent>
    </Dialog>
  )
}
