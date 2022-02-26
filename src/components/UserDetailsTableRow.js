import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TableCell, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { setUsers } from '../actions/SetUsersAction';
import { TableRow } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Button } from '@mui/material';
import paginate from '../common/Paginate';
import { setUsersToDisplay } from '../actions/SetUsersToDisplay';
import updateUserSelection from '../actions/UpdateUserSelection';
import { setCommonCheckBoxState } from '../actions/SetCommonCheckBoxState';
import { Box } from '@mui/system';
import { NUMBER_CONSTANTS } from '../constants/NumberConstants';


const getRowStyle = (user) => {
    if (user.isSelected) {
        return {
            backgroundColor: '#e0e0e0'
        }
    }
    return { backgroundColor: 'white' }
}


export default function UserDetailsTableRow(props) {
    let user = props.user
    const dispatchAction = useDispatch()
    const usersToDisplay = useSelector(state => state.usersToDisplay)
    let userDetails = useSelector(state => state.userDetails)
    let paginationDetails = useSelector(state => state.paginationDetails)
    const [userToEdit, setUserToEdit] = useState({ ...user })

    const handleUserDetailsChange = (event) => {
        userToEdit[event.target.name] = event.target.value
        setUserToEdit({ ...userToEdit })
        console.log(userToEdit)
    }

    const updateUserDetails = (event, userId) => {
        event.preventDefault()
        for (let iterator = NUMBER_CONSTANTS.ZERO; iterator < userDetails.length; iterator++) {
            if (userDetails[iterator].id === userId) {
                userDetails[iterator] = userToEdit;
            }
        }
        dispatchAction(setUsers([...userDetails]))
        dispatchAction(setUsersToDisplay(paginate(userDetails, paginationDetails.pageSize, paginationDetails.pageNumber)))
        props.handleShowUserDetailsRow(event, user.id)
    }

    return (
        <TableRow key={user.id} style={getRowStyle(user)}>
            <TableCell >
                <Checkbox checked={user.isSelected} onChange={(event) => {
                    dispatchAction(updateUserSelection(user.id, event.target.checked));
                    user.isSelected = event.target.checked
                    dispatchAction(setUsersToDisplay([...usersToDisplay]))
                    if (!user.isSelected) {
                        dispatchAction(setCommonCheckBoxState(false))
                    }
                }} />
            </TableCell>
            <TableCell>
                {user.isEditable ? <TextField
                    variant="standard"
                    marigin="normal"
                    name="name"
                    sx={{ border: '0' }}
                    onChange={(event) => {
                        handleUserDetailsChange(event)
                    }}
                    value={userToEdit.name}></TextField> : <Typography>{user.name}</Typography>}
            </TableCell>
            <TableCell>
                {user.isEditable ? <TextField
                    variant="standard"
                    marigin="normal"
                    name="email"
                    onChange={(event) => {
                        handleUserDetailsChange(event)
                    }}
                    value={userToEdit.email}></TextField> : <Typography>{user.email}</Typography>}
            </TableCell>
            <TableCell>
                {user.isEditable ? <TextField
                    variant="standard"
                    marigin="normal"
                    name="role"
                    onChange={(event) => {
                        handleUserDetailsChange(event)
                    }}
                    value={userToEdit.role}></TextField> : <Typography>{user.role}</Typography>
                }
            </TableCell>
            <TableCell>
                {!user.isEditable ? <Box display="flex">
                    <Box p={NUMBER_CONSTANTS.ONE}>
                        <Button variant="outlined" color="primary" onClick={(event) => { props.handleDisplayEditUserDetailsForm(event, user.id) }}> Edit </Button>
                    </Box>
                    <Box p={NUMBER_CONSTANTS.ONE}>
                        <Button variant="outlined" color="error" onClick={(event) => { props.handleDeleteUser(event, user.id) }}> Delete User</Button>
                    </Box>
                </Box> : <Box display="flex">
                    <Box p={NUMBER_CONSTANTS.ONE}>
                        <Button variant="outlined" color="primary" onClick={(event) => { updateUserDetails(event, user.id) }}> Save </Button>
                    </Box>
                    <Box p={NUMBER_CONSTANTS.ONE}>
                        <Button variant="outlined" color="error" onClick={(event) => { props.handleShowUserDetailsRow(event, user.id) }}> Cancel </Button>
                    </Box>
                    <Box p={NUMBER_CONSTANTS.ONE}>
                        <Button variant="outlined" color="error" onClick={(event) => { props.handleDeleteUser(event, user.id) }}> Delete User</Button>
                    </Box>
                </Box>
                }
            </TableCell>
        </TableRow>
    )
}
