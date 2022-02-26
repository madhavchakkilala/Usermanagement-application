export default function updateUserSelection(userId, selection){
    return {
        type : "UPDATE_USER_AS_SELECTED",
        payload: {
            id: userId,
            selected: selection
        }
    }
}