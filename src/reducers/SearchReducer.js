import { NUMBER_CONSTANTS } from "../constants/NumberConstants";

export const searchReducer = (state = {searchString : "", isFilterEnabled : false}, action) => {
    switch(action.type){
        case "UPDATE_STRING":
            if(action.payload.length === NUMBER_CONSTANTS.ZERO){
                action.payload.isFilterEnabled = false;
            }
            else{
                action.payload.isFilterEnabled = true;
            }
            return action.payload
        default:
            return state;
    }
}
