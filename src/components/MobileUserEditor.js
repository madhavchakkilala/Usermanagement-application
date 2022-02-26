import { Checkbox } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import UserDetailsCard from './UserDetailsCard'
import UserDetailsEditor from './UserDetailsEditor'


export default function MobileUserEditor(props) {
    let usersToDisplay = useSelector(state => state.usersToDisplay)
    let isAllChecked = useSelector(state => state.commonCheckBoxState.isSelected)

    return (
        <>
            <Checkbox checked={isAllChecked} onChange={(event) => {
                props.handleSelectAllUser(event)
            }} /> Select/Deselect all users
            {
                usersToDisplay.map(user => {
                    return user.isEditable ? <UserDetailsEditor handleShowUserDetailsCard={props.handleShowUserDetailsCard} user={user} key={user.id} /> : <UserDetailsCard handleShowUserDetailsCard={props.handleShowUserDetailsCard} handleDisplayEditUserDetailsForm={props.handleDisplayEditUserDetailsForm} handleDeleteUser={props.handleDeleteUser} user={user} key={user.id} />
                })
            }
        </>
    )
}


