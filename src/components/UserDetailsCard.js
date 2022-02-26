import React from 'react'
import Card from '@mui/material/Card'
import { Checkbox, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import { NUMBER_CONSTANTS } from '../constants/NumberConstants'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import updateUserSelection from '../actions/UpdateUserSelection'
import { setUsersToDisplay } from '../actions/SetUsersToDisplay'
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

export default function UserDetailsCard(props) {
    const dispatchAction = useDispatch()
    let usersToDisplay = useSelector(state => state.usersToDisplay)
    let user = props.user
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
                <Typography><strong>Name:</strong> {user.name}</Typography>
                <Typography><strong>Email:</strong> {user.email}</Typography>
                <Typography><strong>Role:</strong> {user.role}</Typography>
                <Box display="flex" >
                    <Box sx={styles.paddingForBox} item flexGrow={NUMBER_CONSTANTS.ONE}>
                        <center> 
                            <Button color="primary" variant="outlined" onClick={(event) => {props.handleDisplayEditUserDetailsForm(event, user.id)}}>Edit user</Button> 
                        </center>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}
