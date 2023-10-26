import { initialState } from '../store/store';
import { clearStorage } from '../../service/storage';
import { setBearer } from '../../service/service';

export function usersReducer(state = initialState, action) {
   const { payload } = action;
   switch (action.type) {
      case 'LOADING_IN_PROGRESS':
         // Update the state to indicate that the application is in a loading state.
         return {  ...state, currentState: 'loading', loader: payload, };
      case 'LOGIN_SUCEED':
         // Set the bearer token for authentication and update the state for a successful login.
         setBearer(action.payload.token);
         return { ...state, loggedIn: true, token: action.payload.token, currentState: 'logged', loader: true, };
      case 'USER_PROFILE':
         // Update the state with user profile data and indicate that loading is complete.
         return { ...state, user: payload.user, loader: false, };
      case 'SAVE_SUCCEED':
         // Merge the updated user data into the state.
         return { ...state, user: { ...state.user, ...payload.user, }, };
      case 'LOGIN_FAILED':
         // Handle login failure by marking an error and stopping loading.
         return { ...state, error: true, loader: false, currentState: 'failed', };
      case 'LOGOUT_ACTION':
         // Clear storage and reset the state to its initial values when the user logs out.
         clearStorage();
         return initialState;
      default:
         // If the action type is not recognized, return the current state unchanged.
         return state;
   }
}
// "...state" = used to create a new state object with the same properties and values ​
// ​as the existing state, while allowing you to modify specific properties.