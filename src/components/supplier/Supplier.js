import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import SupplierModal from '../modal/SupplierModal';
import { useSupplier } from '../../context/SupplierContext';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Box, List, ListItem, ListItemText, Switch, Button, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

export const modalView = {
  MODE_EDIT: "edit",
  MODE_NEW: "new",
}

export default function Supplier() {

  const useStyles = makeStyles((theme) => ({
    table: {
      width: '100%'
    },
    tableRow: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    createBtn: {
      marginBottom: theme.spacing(2)
    },
    section: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      width: '100%'
    },
  }));

  const classes = useStyles();

  const { currentUser } = useAuth()
  const { suppliers, getSupplier, getSuppliers, updateStatus } = useSupplier();

  const [modalShow, setModalShow] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState([])
  const [mode, setMode] = useState(modalView.MODE_NEW)
  const [open, setOpen] = useState(false);

  async function onHide() {
    getSuppliers()
    setModalShow(false)
  }

  async function createSupplier() {
    setSupplierToEdit([])
    setMode(modalView.MODE_NEW)
    setModalShow(true)
  }

  async function handleDetails(id) {
    if (open === id) {
      setOpen(false)
    } else {
      setOpen(id)
    }
  }

  async function editSupplier(supplierId) {
    let response = await getSupplier(supplierId)
    if (response.success) {
      setMode(modalView.MODE_EDIT)
      setSupplierToEdit(response.data)
      setModalShow(true)
    }
  }

  async function updateSupplierStatus(supplierId, status) {
    let data = []
    if (status) {
      data = {
        companyId: currentUser.company.id,
        supplierId: supplierId,
        status: "A"
      }
    } else {
      data = {
        companyId: currentUser.company.id,
        supplierId: supplierId,
        status: "I"
      }
    }

    await updateStatus(data)
  }


  return (
    <Container maxWidth="xl">
      <section className={classes.section}>
        <Button 
          variant="outlined" 
          size="medium" 
          color="primary" 
          onClick={createSupplier}
          className={classes.createBtn}>
          Add Supplier
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
                <TableCell align="left">Contact Person</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
            {suppliers.map((supplier, index) => (
              <>
                <TableRow className={classes.tableRow} key={supplier.id}>
                  <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => handleDetails(supplier.id)}>
                      {open === supplier.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{supplier.name}</TableCell>
                  <TableCell align="left">{supplier.email}</TableCell>
                  <TableCell align="left">+{supplier.countryCode} {supplier.phoneNumber}</TableCell>
                  <TableCell align="left">{supplier.contactPerson}</TableCell>
                  <TableCell align="left">
                    <Switch
                      defaultChecked={supplier.status === 'A'}
                      onChange={(e) => updateSupplierStatus(supplier.id, e.target.checked)}
                      color="primary"
                      name="checkedB"
                      id={supplier.id}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      disabled={currentUser.id === supplier.id}
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      size="medium" 
                      color="primary" 
                      onClick={() => editSupplier(supplier.id)}
                      >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open === supplier.id} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                      <List key={supplier.id}>
                        <ListItem key={`'address'-${supplier.id}`}>
                          <ListItemText
                            primary="Address"
                            secondary={
                              <Typography variant="body2" color="textSecondary" component="p">
                                {supplier.address} {supplier.address && <br/>}
                                {supplier.city} {supplier.city && <br/>}
                                {supplier.state} {supplier.state && <br/>}
                                {supplier.postalCode} {supplier.postalCode && <br/>}
                                {supplier.country} {supplier.country && <br/>}
                              </Typography>
                            }
                          />
                        </ListItem>
                        <ListItem key={`'updated-at'-${supplier.id}`}>
                          <ListItemText
                            primary="Last updated At:"
                            secondary={supplier.updateAt}
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
        <SupplierModal 
          open={modalShow}
          onClose={onHide}
          supplier={supplierToEdit}
          mode={mode}
          title={mode === modalView.MODE_EDIT ? "Edit Supplier" : "Create Supplier"}
        />
      </section>
    </Container>
  )
}
