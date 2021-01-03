import React, { useState } from 'react'
import { useEmployee } from '../../context/EmployeeContext';
import { useAuth } from '../../context/AuthContext';
import EmployeeModal from '../modal/EmployeeModal';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Box, List, ListItem, ListItemText, Switch, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

export const modalView = {
  MODE_EDIT: "edit",
  MODE_NEW: "new",
}

export default function Users() {

  const useStyles = makeStyles((theme) => ({
    table: {
      width: '100%'
    },
    tableRow: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    createEmployeeBtn: {
      marginBottom: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  const { currentUser } = useAuth()
  const { employees, updateStatus, getEmployee, getEmployees } = useEmployee()
  const [modalShow, setModalShow] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState([])
  const [mode, setMode] = useState(modalView.MODE_NEW)
  const [open, setOpen] = useState(false);

  async function updateEmployeeStatus(employeeId, status) {
    let data = []
    if (status) {
      data = {
        companyId: currentUser.company.id,
        employeeId: employeeId,
        status: "A"
      }
    } else {
      data = {
        companyId: currentUser.company.id,
        employeeId: employeeId,
        status: "I"
      }
    }

    await updateStatus(data)
  }

  async function editEmployee(employeeId) {
    let response = await getEmployee(employeeId)
    if (response.success) {
      setMode(modalView.MODE_EDIT)
      setEmployeeToEdit(response.data)
      setModalShow(true)
    }
  }

  async function createEmployee() {
    setEmployeeToEdit([])
    setMode(modalView.MODE_NEW)
    setModalShow(true)
  }

  async function onHide() {
    getEmployees()
    setModalShow(false)
  }

  async function handleDetails(id) {
    if (open === id) {
      setOpen(false)
    } else {
      setOpen(id)
    }
  }

  return (
    <>
      <Button 
        variant="outlined" 
        size="medium" 
        color="primary" 
        onClick={createEmployee}
        className={classes.createEmployeeBtn}>
        Add Employee
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>#</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
          {employees.map((employee, index) => (
            <>
              <TableRow className={classes.tableRow} key={employee.id}>
                <TableCell>
                  <IconButton aria-label="expand row" size="small" onClick={() => handleDetails(employee.id)}>
                    {open === employee.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{employee.firstName} {employee.lastName}</TableCell>
                <TableCell align="left">{employee.email}</TableCell>
                <TableCell align="left">+{employee.countryCode} {employee.phoneNumber}</TableCell>
                <TableCell align="left">
                  <Switch
                    defaultChecked={employee.status === 'A'}
                    onChange={(e) => updateEmployeeStatus(employee.id, e.target.checked)}
                    color="primary"
                    name="checkedB"
                    id={employee.id}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    disabled={currentUser.id === employee.id}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="medium" 
                    color="primary" 
                    onClick={() => editEmployee(employee.id)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open === employee.id} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                    <List>
                      <ListItem key={`'name'-${employee.id}`}>
                        <ListItemText
                          primary="Role"
                          secondary={employee.roles[0].name}
                        />
                      </ListItem>
                      <ListItem key={`'address'-${employee.id}`}>
                        <ListItemText
                          primary="Address"
                          secondary={
                            <Typography variant="body2" color="textSecondary" component="p">
                              {employee.address} {employee.address && <br/>}
                              {employee.city} {employee.city && <br/>}
                              {employee.state} {employee.state && <br/>}
                              {employee.postalCode} {employee.postalCode && <br/>}
                              {employee.country} {employee.country && <br/>}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem key={`'password-change'-${employee.id}`}>
                        <ListItemText
                          primary="Last password changed At:"
                          secondary={employee.passwordChangedAt ? employee.passwordChangedAt : 'N/A'}
                        />
                      </ListItem>
                      <ListItem key={`'updated-at'-${employee.id}`}>
                        <ListItemText
                          primary="Last updated At:"
                          secondary={employee.updateAt}
                        />
                      </ListItem>
                    </List>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EmployeeModal 
        open={modalShow}
        onClose={onHide}
        employee={employeeToEdit}
        mode={mode}
        title={mode === modalView.MODE_EDIT ? "Edit Employee" : "Create Employee"}
      />
    </>
  )
}
