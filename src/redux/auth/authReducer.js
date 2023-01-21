const initialState = {
    loading: false,
    user: {},
    originUser: {email: 'abc@mail.com', password: '123456'},
    error: '',
    active: false,
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case "FETCH_LOGIN_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "FETCH_LOGIN_SUCCESS":
            return {
                ...state,
                loading: false,
                user: action.payload
            }

        case "FETCH_LOGIN_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "ACVTIVE_USER":
            return {
                ...state,
                active: !state.active
            }

        default: return state
    }
}

export default authReducer;