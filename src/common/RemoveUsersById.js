export const deleteSelectedUsers = (userDetailsToBeModified, listOfIds) => {
    return userDetailsToBeModified.filter((user) => {
        return !listOfIds.includes(user.id)
    })
}