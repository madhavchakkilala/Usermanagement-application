import { NUMBER_CONSTANTS } from "../constants/NumberConstants"

const userDetailsReducer = (state = [], action) => {
    switch(action.type){
        case "SET_USERS":
            return action.payload
        case "DELETE_USER":
            const stateAfterDeletingUser = state.filter((user) => {return user.id !== action.payload.id})
            return stateAfterDeletingUser
        case "DELETER_MULTIPLE_USERS":
            const stateAfterDeletingMultipleUsers = state.filter((user) => {return action.payload.listOfIds.include(user.id)})
            console.log("deleted users", stateAfterDeletingMultipleUsers)
            return stateAfterDeletingMultipleUsers
        case "UPDATE_USER_AS_SELECTED":
            for(let iterator = NUMBER_CONSTANTS.ZERO; iterator < state.length; iterator++){
                if(state[iterator].id === action.payload.id){
                    state[iterator].isSelected = action.payload.selected;
                }
            }
        default:
            return state;
    }
}

export default userDetailsReducer;
