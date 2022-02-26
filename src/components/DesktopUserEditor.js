import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux'
import UserDetailsTableRow from './UserDetailsTableRow';


export default function DesktopUserEditor(props) {
    let usersToDisplay = useSelector(state => state.usersToDisplay)
    let isAllChecked = useSelector(state => state.commonCheckBoxState.isSelected)
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><Checkbox checked={isAllChecked} onChange={(event) => {
                        props.handleSelectAllUser(event)
                    }} /></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Role</strong></TableCell>
                    <TableCell><strong>Action</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    usersToDisplay.map(user => {
                        return (
                            <UserDetailsTableRow handleShowUserDetailsRow={props.handleShowUserDetailsRow} handleDeleteUser={props.handleDeleteUser} handleDisplayEditUserDetailsForm={props.handleDisplayEditUserDetailsForm} user={user} key={user.id} />
                        )
                    })}
            </TableBody>
        </Table>
    )
}