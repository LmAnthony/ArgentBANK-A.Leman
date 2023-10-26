import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';
// Import my reducer
import { usersReducer } from '../reducers/usersReducer';

// Define the initial state of the application.
const initialState = { token: null, loggedIn: false, user: null, currentState: '', loader: false, error: false,};

// Check if the user's token is stored in local or session storage.
// If the token is not found, return the application to its initial state.
// If the token is found, add it to Axios request headers for authentication,
// and initialize the state with 'loggedIn' set to true and the token.
function setInitialState() {
   const token = localStorage.getItem('token') || sessionStorage.getItem('token') || null;
   if (token === null) return initialState;
   axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
   return { ...initialState, loggedIn: true, token };
}
// ** Redux Thunk allows handling asynchronous actions, such as API requests,
// ** and triggers multiple actions at different times. It's integrated into
// ** the Redux store to manage these asynchronous actions, ensuring the
// ** proper flow of data in your application.
// Create a middleware array containing Redux Thunk.
const middleThunk = [thunk];
// Create the Redux store with the specified reducer, initial state, and middleware.
const store = createStore(
   usersReducer,
   setInitialState(),
   composeWithDevTools(applyMiddleware(...middleThunk))
);
export { store, initialState };
