import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { NUMBER_CONSTANTS } from '../constants/NumberConstants';
import fetchUserDetails from '../common/FetchUserDetails';
import { setUsers } from '../actions/SetUsersAction';
import UserEditorScreenManager from '../components/UserEditorScreenManager';
import calculateTotalNumberOfPages from '../common/CalculateTotalNumberOfPages';
import paginate from '../common/Paginate';
import { setUsersToDisplay } from '../actions/SetUsersToDisplay';
import { updatePaginationProperties } from '../actions/SetPaginationProperties';

export default function UserAdminUi() {

    const dispatchAction = useDispatch()

    const getUserDetialsAndStoreInState = async () => {
        const userDetailsList = await fetchUserDetails();
        dispatchAction(setUsers(userDetailsList));
        const totalNumberOfPages = calculateTotalNumberOfPages(userDetailsList, NUMBER_CONSTANTS.FIVE)
        const pageNumber = NUMBER_CONSTANTS.ONE
        const pageSize = NUMBER_CONSTANTS.FIVE
        dispatchAction(setUsersToDisplay(paginate(userDetailsList, pageSize, pageNumber)))
        dispatchAction(updatePaginationProperties(pageNumber, pageSize, totalNumberOfPages))
    }

    useEffect(() => {
        getUserDetialsAndStoreInState();
    }, [])

    return (
        <>
            <SearchBar />
            <UserEditorScreenManager />
        </>
    )
}
