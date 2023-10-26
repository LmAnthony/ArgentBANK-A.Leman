// Save the authentication token in local or session storage based on 'rememberMe' preference.
// param (token) - The authentication token to be stored.
// param boolean (rememberMe) - A flag indicating whether to remember the user's login.
const saveLocal = (token, rememberMe) => {
   if (rememberMe) {
      // If 'rememberMe' is true, store the token in local storage.
      localStorage.setItem('token', token);
   } else {
      // Otherwise, store the token in session storage (temporary storage).
      sessionStorage.setItem('token', token);
   }
};
// Clear the stored authentication token from both local and session storage.
// param (token) - The authentication token to be cleared.
const clearStorage = (token) => {
   // Remove the token from both local and session storage.
   localStorage.removeItem('token', token);
   sessionStorage.removeItem('token', token);
};
export { clearStorage, saveLocal };
