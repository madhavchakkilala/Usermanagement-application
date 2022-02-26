import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Button, Card, Checkbox, IconButton, TextField, Typography } from '@mui/material'
import { NUMBER_CONSTANTS } from '../constants/NumberConstants'
import { useDispatch, useSelector } from 'react-redux'
import { setUsersToDisplay } from '../actions/SetUsersToDisplay'
import updateUserSelection from '../actions/UpdateUserSelection'
import DeleteIcon from '@mui/icons-material/Delete'
import { setUsers } from '../actions/SetUsersAction'
import paginate from '../common/Paginate'
import { setCommonCheckBoxState } from '../actions/SetCommonCheckBoxState'

const styles = {
    paddingForCard: {
        boxSizing: 'border-box',
        padding: '4px'
    },
    paddingForOuterBox: {
        boxSizing: 'border-box',
        padding: '4px'
    },
    paddingForCardSelected: {
        boxSizing: 'border-box',
        padding: '4px',
        backgroundColor: '#e0e0e0'
    },
    textHoldingBox: {
        width: '6ch'
    }
}


const getCardStyle = (user) => {
    if (user.isSelected) {
        return {
            ...styles.paddingForCardSelected
        }
    }
    return { ...styles.paddingForCard }
}

export default function UserDetailsEditor(props) {
    const dispatchAction = useDispatch()
    let usersToDisplay = useSelector(state => state.usersToDisplay)
    let userDetails = useSelector(state => state.userDetails)
    let paginationDetails = useSelector(state => state.paginationDetails)
    let user = props.user
    const [userToEdit, setUserToEdit] = useState({ ...user })

    const handleUserDetailsChange = (event) => {
        userToEdit[event.target.name] = event.target.value
        setUserToEdit({...userToEdit})
    }

    const updateUserDetails = (event,userId) => {
        event.preventDefault()
        for(let iterator=0; iterator<userDetails.length; iterator++){
            if(userDetails[iterator].id === userId){
                userDetails[iterator] = userToEdit;
            }
        }
        dispatchAction(setUsers([...userDetails]))
        dispatchAction(setUsersToDisplay(paginate(userDetails, paginationDetails.pageSize, paginationDetails.pageNumber)))
        props.handleShowUserDetailsCard(event, user.id)
    }

    return (
        <Box sx={styles.paddingForOuterBox} xs={NUMBER_CONSTANTS.TWELVE}>
            <Card sx={getCardStyle(user)}>
                <Box xs={NUMBER_CONSTANTS.TWELVE} display="flex">
                    <Box flexGrow={NUMBER_CONSTANTS.ONE}><Checkbox checked={user.isSelected} onChange={(event) => {
                        dispatchAction(updateUserSelection(user.id, event.target.checked));
                        user.isSelected = event.target.checked
                        dispatchAction(setUsersToDisplay([...usersToDisplay]))
                        if(!event.target.checked){
                            dispatchAction(setCommonCheckBoxState(event.target.checked))
                        }
                    }} /></Box>
                    <Box flexGrow={NUMBER_CONSTANTS.ONE}>
                        <IconButton sx={{ "float": "right" }} onClick={(event) => { props.handleDeleteUser(event, user.id) }}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Box>
                </Box>
                <Box display="flex">
                    <Box flexGrow={NUMBER_CONSTANTS.ONE} sx={styles.textHoldingBox}> <Typography sx={{ float: 'right' }} variant="span"><strong>Name:</strong></Typography> </Box>
                    <Box flexGrow={NUMBER_CONSTANTS.TWO}> <TextField name="name" variant='standard' value={userToEdit.name} onChange={(event) => {handleUserDetailsChange(event)}}/>  </Box>
                </Box>
                <Box display="flex">
                    <Box flexGrow={NUMBER_CONSTANTS.ONE} sx={styles.textHoldingBox}> <Typography sx={{ float: 'right' }} variant="span"><strong>Email:</strong></Typography> </Box>
                    <Box flexGrow={NUMBER_CONSTANTS.TWO}> <TextField name="email" variant='standard' value={userToEdit.email} onChange={(event) => {handleUserDetailsChange(event)}}/>  </Box>
                </Box>
                <Box display="flex">
                    <Box flexGrow={NUMBER_CONSTANTS.ONE} sx={styles.textHoldingBox}> <Typography sx={{ float: 'right' }} variant="span"><strong>Role:</strong></Typography> </Box>
                    <Box flexGrow={NUMBER_CONSTANTS.TWO}> <TextField name="role" variant='standard' value={userToEdit.role} onChange={(event) => {handleUserDetailsChange(event)}}/>  </Box>
                </Box>
                <center>
                    <Box display="flex" >
                        <Box sx={styles.paddingForBox} item flexGrow={NUMBER_CONSTANTS.ONE}>
                            <Box display="flex">
                                <Box p={NUMBER_CONSTANTS.ONE} m="auto">
                                    <Button color="primary" variant="outlined" onClick={(event) => {updateUserDetails(event,user.id)}}>Save</Button>
                                </Box>
                                <Box p={NUMBER_CONSTANTS.ONE} m="auto">
                                    <Button color="primary" variant="outlined" onClick={(event) => {props.handleShowUserDetailsCard(event, user.id)}}>Cancel</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </center>
            </Card>
        </Box>
    )
}
