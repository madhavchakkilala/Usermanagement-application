export const setSearchString = (searchString) => {
    const shouldSearch = searchString.length ? true : false
    return {
        type : "UPDATE_STRING",
        payload : {
            'searchString': searchString,
            isFilterEnabled: shouldSearch
        }
    }
}