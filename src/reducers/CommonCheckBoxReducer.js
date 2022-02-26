
export const commonCheckBoxReducer = (state = { isSelected : false }, action) => {
    switch(action.type){
        case "SET_COMMON_CHECKBOX_STATE":
            return action.payload
        default:
            return state;
    }
}
