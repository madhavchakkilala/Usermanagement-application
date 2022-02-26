import { NUMBER_CONSTANTS } from "../constants/NumberConstants"


export default function calculateTotalNumberOfPages(userList,pageSize){
    let numberOfPages =  parseInt(userList.length / pageSize)
    if(userList.length % pageSize === NUMBER_CONSTANTS.ZERO){
        return numberOfPages
    }
    return numberOfPages + NUMBER_CONSTANTS.ONE
}