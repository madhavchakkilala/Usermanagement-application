import React from 'react'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchString } from '../actions/SetSearchString';
import { NUMBER_CONSTANTS } from '../constants/NumberConstants';
import { filterUsers } from '../common/FilterUsers';
import calculateTotalNumberOfPages from '../common/CalculateTotalNumberOfPages';
import { updatePaginationProperties } from '../actions/SetPaginationProperties';
import { setUsersToDisplay } from '../actions/SetUsersToDisplay';
import paginate from '../common/Paginate';

const styles = {
    paddingForInput: {
        boxSizing: 'border-box',
        padding: '8px'
    },
    dropDown: {
        width: '20ch'
    }
}

export default function SearchBar() {
    const dispatchAction = useDispatch();
    const searchString = useSelector(state => state.searchDetails.searchString)
    const userDetails = useSelector(state => state.userDetails)
    const paginationDetails = useSelector(state => state.paginationDetails)
    
    const handleSearchStringChange = (event) => {
        let searchString = event.target.value
        dispatchAction(setSearchString(event.target.value))
        let filteredUsers = filterUsers(userDetails,searchString)
        let updatedNumberOfPages =  calculateTotalNumberOfPages(filteredUsers, paginationDetails.pageSize)
        dispatchAction(updatePaginationProperties(NUMBER_CONSTANTS.ONE, paginationDetails.pageSize, updatedNumberOfPages))
        dispatchAction(setUsersToDisplay(paginate(filteredUsers, paginationDetails.pageSize, NUMBER_CONSTANTS.ONE)))
    }
    return (
        <Box sx={styles.paddingForInput} xs={NUMBER_CONSTANTS.TWELVE}>
            <TextField id="outlined-basic" value={searchString} fullWidth label="Search by name, role or email" variant="outlined" onChange={(event) => { handleSearchStringChange(event) }} />
        </Box>
    )
}
