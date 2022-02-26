const usersDisplayReducer = (state = [], action) => {
    switch(action.type){
        case "SET_USERS_TO_DISPLAY":
            return action.payload
        default:
            return state;
    }
}

export default usersDisplayReducer;