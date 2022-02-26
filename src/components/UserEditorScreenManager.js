import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Pagination, Select, useMediaQuery } from '@mui/material'
import DesktopUserEditor from './DesktopUserEditor';
import MobileUserEditor from './MobileUserEditor';
import { useDispatch, useSelector } from 'react-redux';
import { filterUsers } from '../common/FilterUsers';
import paginate from '../common/Paginate';
import { setUsers } from '../actions/SetUsersAction';
import calculateTotalNumberOfPages from '../common/CalculateTotalNumberOfPages';
import { deleteUser } from '../common/DeleteUser';
import { setUsersToDisplay } from '../actions/SetUsersToDisplay';
import { updatePaginationProperties } from '../actions/SetPaginationProperties';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { NUMBER_CONSTANTS } from '../constants/NumberConstants';
import { setCommonCheckBoxState } from '../actions/SetCommonCheckBoxState';
import updateUserSelection from '../actions/UpdateUserSelection';


export default function UserEditorScreenManager() {
    const isWidthLessThan300px = useMediaQuery('(max-width: 300px)')
    const isWidthGreaterThan600px = useMediaQuery('(min-width : 700px)')
    const dispatchAction = useDispatch()
    let userDetails = useSelector(state => state.userDetails)
    let searchString = useSelector(state => state.searchDetails.searchString)
    let paginationDetails = useSelector(state => state.paginationDetails)
    let usersToDisplay = useSelector(state => state.usersToDisplay)

    const handleSelectAllUser = (event) => {
        dispatchAction(setCommonCheckBoxState(event.target.checked))
        for (let iterator = 0; iterator < usersToDisplay.length; iterator++) {
            usersToDisplay[iterator].isSelected = event.target.checked;
            dispatchAction(updateUserSelection(usersToDisplay[iterator].id, event.target.checked))
        }
        dispatchAction(setUsersToDisplay(usersToDisplay))
    }

    const handlePageNumberChange = (event, value) => {
        paginationDetails.pageNumber = value
        dispatchAction(updatePaginationProperties(paginationDetails.pageNumber, paginationDetails.pageSize, paginationDetails.totalNumberOfPages))
        dispatchAction(setUsersToDisplay(paginate(filterUsers(userDetails, searchString), paginationDetails.pageSize, paginationDetails.pageNumber)))
    }

    const deleteSelectedUsers = (event) => {
        event.preventDefault()
        let selectedUserIds = []
        for (let iterator = NUMBER_CONSTANTS.ZERO; iterator < usersToDisplay.length; iterator++) {
            if (usersToDisplay[iterator].isSelected) {
                selectedUserIds.push(usersToDisplay[iterator].id)
            }
        }
        let updatedUsersList = deleteUsersByListOfIds(userDetails, selectedUserIds)
        dispatchAction(setUsers(updatedUsersList))
        let filteredUsers = filterUsers(updatedUsersList, searchString)
        const totalNumberOfPages = calculateTotalNumberOfPages(filteredUsers, paginationDetails.pageSize)
        let newPageNumber = paginationDetails.pageNumber;
        if (newPageNumber > totalNumberOfPages) {
            newPageNumber = totalNumberOfPages
        }
        dispatchAction(setUsersToDisplay(paginate(updatedUsersList, paginationDetails.pageSize, newPageNumber)))
        dispatchAction(updatePaginationProperties(newPageNumber, paginationDetails.pageSize, totalNumberOfPages))
        dispatchAction(setCommonCheckBoxState(false))
    }

    const deleteUsersByListOfIds = (userDetailsToBeModified, listOfIds) => {
        return userDetailsToBeModified.filter((user) => {
            return !listOfIds.includes(user.id)
        })
    }

    const handlePageSizeChange = (event) => {
        paginationDetails.pageSize = event.target.value
        paginationDetails.pageNumber = NUMBER_CONSTANTS.ONE
        const filteredUsers = filterUsers(userDetails, searchString)
        const totalNumberOfPages = calculateTotalNumberOfPages(filteredUsers, paginationDetails.pageSize)
        paginationDetails.totalNumberOfPages = totalNumberOfPages
        dispatchAction(updatePaginationProperties(paginationDetails.pageNumber, paginationDetails.pageSize, paginationDetails.totalNumberOfPages))
        dispatchAction(setUsersToDisplay(paginate(filterUsers(userDetails, searchString), paginationDetails.pageSize, paginationDetails.pageNumber)))
    }

    const handleDeleteUser = (event, userId) => {
        event.preventDefault()
        let updatedUserList = deleteUser(userDetails, userId)
        dispatchAction(setUsers([...updatedUserList]))
        let updatedUsersToDisplay = filterUsers(updatedUserList, searchString)
        let updatedNumberOfPages = calculateTotalNumberOfPages(updatedUsersToDisplay, paginationDetails.pageSize)
        let updatedPageNumber = paginationDetails.pageNumber;
        if (updatedPageNumber > updatedNumberOfPages) {
            updatedPageNumber = updatedNumberOfPages
        }
        dispatchAction(updatePaginationProperties(updatedPageNumber, paginationDetails.pageSize, updatedNumberOfPages))
        dispatchAction(setUsersToDisplay(paginate(updatedUsersToDisplay, paginationDetails.pageSize, updatedPageNumber)))
    }

    const handleDisplayEditUserDetailsForm = (event, userId) => {
        event.preventDefault()
        for (let iterator = 0; iterator < userDetails.length; iterator++) {
            if (userDetails[iterator].id === userId) {
                userDetails[iterator].isEditable = true;
            }
        }
        const details = [...userDetails]
        dispatchAction(setUsers(details))
        dispatchAction(setUsersToDisplay(paginate(details, paginationDetails.pageSize, paginationDetails.pageNumber)))
    }


    const handleShowUserDetailsCard = (event, userId) => {
        event.preventDefault()
        for (let iterator = NUMBER_CONSTANTS.ZERO; iterator < userDetails.length; iterator++) {
            if (userDetails[iterator].id === userId) {
                userDetails[iterator].isEditable = false;
            }
        }
        const details = [...userDetails]
        dispatchAction(setUsers(details))
        dispatchAction(setUsersToDisplay(paginate(details, paginationDetails.pageSize, paginationDetails.pageNumber)))
    }

    const getStyleForPagination = () => {
        if (isWidthLessThan300px) {
            return {
                width: "210px"
            }
        }
        return {
            width: "350px"
        }
    }

    return (
        <>
            {isWidthGreaterThan600px ? <DesktopUserEditor handleSelectAllUser={handleSelectAllUser} handleShowUserDetailsRow={handleShowUserDetailsCard} handleDisplayEditUserDetailsForm={handleDisplayEditUserDetailsForm} handleDeleteUser={handleDeleteUser} /> : <MobileUserEditor handleSelectAllUser={handleSelectAllUser} handleShowUserDetailsCard={handleShowUserDetailsCard} handleDisplayEditUserDetailsForm={handleDisplayEditUserDetailsForm} handleDeleteUser={handleDeleteUser} />}
            <Box flexGrow={NUMBER_CONSTANTS.ONE}>
                <Grid container p={NUMBER_CONSTANTS.ONE}>
                    <Grid item xl={NUMBER_CONSTANTS.THREE} sm={NUMBER_CONSTANTS.THREE} xs={NUMBER_CONSTANTS.TWELVE} style={{ paddingTop: "16px" }}>
                        <div p={NUMBER_CONSTANTS.TWO} xs={NUMBER_CONSTANTS.TWELVE} sx={{ backgroundColor: "blue" }}>
                            <div>
                                <center><Button variant="outlined" color="error" onClick={(event) => { deleteSelectedUsers(event) }}>Delete selected</Button></center>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xl={NUMBER_CONSTANTS.SIX} alignItems="center" justifyContent="center" sm={NUMBER_CONSTANTS.SIX} xs={NUMBER_CONSTANTS.TWELVE} >
                        <div style={{ "width": "100%", 'paddingTop': '16px' }}>
                            <center><div style={{ ...getStyleForPagination() }}>
                                {!isWidthLessThan300px ? <Pagination variant='outlined' color='primary' count={paginationDetails.totalNumberOfPages} page={paginationDetails.pageNumber} onChange={(event, value) => { handlePageNumberChange(event, value) }} /> : <Pagination variant='outlined' color='primary' size="small" count={paginationDetails.totalNumberOfPages} page={paginationDetails.pageNumber} onChange={(event, value) => { handlePageNumberChange(event, value) }} siblingCount={NUMBER_CONSTANTS.ZERO} boundaryCount={NUMBER_CONSTANTS.ONE} />}
                            </div></center>
                        </div>
                    </Grid>
                    <Grid item xl={NUMBER_CONSTANTS.THREE} sm={NUMBER_CONSTANTS.THREE} xs={NUMBER_CONSTANTS.TWELVE} >
                        <Box alignSelf='center' p={NUMBER_CONSTANTS.TWO}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel>Page Size</InputLabel>
                                <Select
                                    fullWidth
                                    value={paginationDetails.pageSize}
                                    onChange={(event) => { handlePageSizeChange(event) }}
                                >
                                    <MenuItem value={NUMBER_CONSTANTS.FIVE}>{NUMBER_CONSTANTS.FIVE}</MenuItem>
                                    <MenuItem value={NUMBER_CONSTANTS.TEN}>{NUMBER_CONSTANTS.TEN}</MenuItem>
                                    <MenuItem value={NUMBER_CONSTANTS.FIFTEEN}>{NUMBER_CONSTANTS.FIFTEEN}</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
