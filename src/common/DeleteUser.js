export const deleteUser = (userList, userId) => {
    return userList.filter(user => {return user.id !== userId})
}