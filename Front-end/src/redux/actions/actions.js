import { getToken, userData, userEdit } from '../../service/service';
import { saveLocal, clearStorage } from '../../service/storage';

// Asynchronous function to verify user credentials.
const checkCredentials = (email, password) => {
   return async (dispatch) => {
      try {
         // Start the loading indicator by dispatching an action.
         dispatch({ type: 'LOADING_IN_PROGRESS', payload: true, });
         // Send the credentials to Axios to obtain a token.
         const token = await getToken(email, password);
         saveLocal(token);
         dispatch({ type: 'LOGIN_SUCEED', payload: { token }, loader: false, error: false, });
      } catch (err) {
         clearStorage();
         console.error(err);
         dispatch({ type: 'LOGIN_FAILED', payload: "L'identifiant ou le mot de passe fourni est incorrect.", });
      }
   };
};
// Asynchronous function to retrieve logged-in user information.
const getUserData = () => {
   return async (dispatch) => {
      try {
         // Initiate the loading indicator by dispatching an action.
         dispatch({ type: 'LOADING_IN_PROGRESS', payload: true, });
         // Send a request to fetch user data using Axios.
         const user = await userData();
         // Update user data in the application state.
         userEdit(user.userName);
         dispatch({ type: 'USER_PROFILE', payload: { user }, });
      } catch (err) {
         console.log(err);
         dispatch({ type: 'PROFILE_FAILED', payload: "Une erreur s'est produite lors de la récupération des données de l'utilisateur.", });
      }
   };
};
// Asynchronous function to update user information.
const setUserData = (userName) => {
   return async (dispatch) => {
      try {
         // Dispatch an action to indicate a successful update with the provided user data.
         dispatch({ type: 'SAVE_SUCCEED', payload: { user: { userName }, }, });
         // Send a request to update user data using Axios.
         await userEdit(userName);
      } catch (err) {
         console.error(err);
         dispatch({ type: 'SAVE_FAILED', });
      }
   };
};
export { checkCredentials, getUserData, setUserData };
