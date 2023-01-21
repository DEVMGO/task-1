// import axios from "axios"

export const fetchLoginRequest = () => ({ type: 'FETCH_LOGIN_REQUEST' });

export const fetchLoginSuccess = (data) => ({ type: 'FETCH_LOGIN_SUCCESS', payload: data });

export const fetchLoginFailure = (error) => ({ type: 'FETCH_LOGIN_FAILURE', payload: error });

export const activeUser = () => ({ type: 'ACVTIVE_USER' });

// export const fetchProducts = () => {
//     return (dispatch) => {
//         dispatch(fetchProductsRequest())
//         axios.get("https://fakestoreapi.com/products")
//         .then(res => {
//             dispatch(fetchProductsSuccess(res.data))
//         })
//         .catch(error => {
//             dispatch(fetchProductsFailure(error.message))
//         })
//     }
// }
