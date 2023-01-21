import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import stylesReducer from "./styles/stylesReducer";

const reducer = combineReducers({
    authState: authReducer,
    stylesState: stylesReducer,
})

export default reducer;