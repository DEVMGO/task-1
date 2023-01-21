const initialState = {
    dirStyle: true,
}

const stylesReducer = (state=initialState, action) => {
    switch(action.type) {
        case "CHANGE_DIR":
            return {
                ...state,
                dirStyle: !state.dirStyle
            }

        default: return state
    }
}

export default stylesReducer;