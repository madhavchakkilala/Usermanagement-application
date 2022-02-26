import {combineReducers} from 'redux'
import { commonCheckBoxReducer } from './CommonCheckBoxReducer';
import { paginationReducer } from './PaginationReducer';
import { searchReducer } from './SearchReducer'
import userDetailsReducer from './UserDetailsReducer';
import usersDisplayReducer from './UsersDisplayReducer';

let combinedReducer = combineReducers({
    searchDetails : searchReducer,
    userDetails : userDetailsReducer,
    usersToDisplay : usersDisplayReducer,
    paginationDetails : paginationReducer,
    commonCheckBoxState : commonCheckBoxReducer
})

export default combinedReducer;