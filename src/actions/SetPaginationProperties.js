export const updatePaginationProperties = (pageNumber, pageSize, numberOfPages) => {
    return {
        type : "UPDATE_PAGINATION_PROPERTIES",
        payload : {
            pageSize : pageSize, pageNumber : pageNumber, totalNumberOfPages: numberOfPages
        }
    }
}