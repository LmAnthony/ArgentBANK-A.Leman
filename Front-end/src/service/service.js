import axios from 'axios';
// Set the default base URL for Axios requests to the API server.
axios.defaults.baseURL = 'http://localhost:3001/api/v1/user';

// Send a request to obtain a token by providing email and password.
const getToken = async (email, password) => {
   try {
      const response = await axios.post('/login', { email, password });
      return response.data.body.token;
   } catch (error) {
      if (error.response?.status === 400) {
         console.error("The provided username or password is incorrect.");
      } else {
         console.error("An error occurred while requesting the token.");
      }
      throw error; // Re-throw the error to handle it higher up if needed.
   }   
};
// Send a request to fetch user information.
const userData = async () => {
   try {
      const response = await axios.post('/profile');
      return response.data.body;
   } catch (error) {
      if (error.response?.status === 401) {
         console.error("Your session has expired, please log in again.");
      } else {
         console.error("An error occurred while updating user information.");
      }
      throw error; // Re-throw the error to handle it higher up if needed.
   }
};
// Send a request to update the user's information with new data.
const userEdit = async (userName) => {
   try {
      await axios.put('/profile', { userName });
   } catch (error) {
      if (error.response?.status === 401) {
         console.error("Your session has expired, please log in again.");
      } else {
         console.error("An error occurred while updating user information.");
      }
      throw error; // Re-throw the error to handle it higher up if needed.
   }
};
// Set the bearer token in Axios headers for authentication.
const setBearer = (token) => { axios.defaults.headers.common = { Authorization: `Bearer ${token}` }; };
export { getToken, userData, userEdit, setBearer };

