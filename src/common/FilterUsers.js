export function filterUsers(usersList, searchString){
    if(searchString.length === 0){
        return usersList
    }
    const lowerCaseSearchString = searchString.toLowerCase()
    let regularExpression = new RegExp(lowerCaseSearchString)
    let filteredUsers = usersList.filter(user => {
        return regularExpression.test(user.name.toLowerCase()) || regularExpression.test(user.email.toLowerCase()) || regularExpression.test(user.role.toLowerCase())
    })
    return filteredUsers
}