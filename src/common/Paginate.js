import { NUMBER_CONSTANTS } from "../constants/NumberConstants";

export default function paginate(userList,pageSize,pageNumber){
    const startIndex = (pageNumber - NUMBER_CONSTANTS.ONE)*pageSize;
    const endIndex = startIndex + pageSize;
    return userList.slice(startIndex, endIndex)
}