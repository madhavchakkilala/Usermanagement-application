export const setCommonCheckBoxState = (isChecked) => {
    return {
        type : "SET_COMMON_CHECKBOX_STATE",
        payload : {isSelected : isChecked}
    }
}
