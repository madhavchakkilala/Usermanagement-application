import { NUMBER_CONSTANTS } from "../constants/NumberConstants"

const fetchUserDetails = async () => {
    const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const response = await fetch(url)
    const userDetails = await response.json()
    if(response.status !== NUMBER_CONSTANTS.TWO_HUNDRED){
        alert("unable to connect to backend please refresh after some time and try again")
        return {};
    }
    const modifiedUserDetails = appendSelectedAndEditFieldToUserDetails(userDetails)
    return modifiedUserDetails
}

function appendSelectedAndEditFieldToUserDetails(listOfUsers){
    for(let iterator = NUMBER_CONSTANTS.ZERO; iterator < listOfUsers.length; iterator++){
        listOfUsers[iterator].isSelected = false;
        listOfUsers[iterator].isEditable = false;
    }
    return listOfUsers
}

export default fetchUserDetails;