import { NUMBER_CONSTANTS } from "../constants/NumberConstants";

export const paginationReducer = (state = { pageSize : NUMBER_CONSTANTS.FIVE, pageNumber : NUMBER_CONSTANTS.ONE, totalNumberOfPages: NUMBER_CONSTANTS.ZERO}, action) => {
    switch(action.type){
        case "UPDATE_PAGINATION_PROPERTIES":
            return action.payload
        default:
            return state;
    }
}
