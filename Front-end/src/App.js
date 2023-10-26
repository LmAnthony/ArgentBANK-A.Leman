// React
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Pages
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import Transaction from './pages/Transaction/Transaction';
import Error from './pages/Error/Error';
// Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const App = () => {
   // Utilizing the useSelector hook to access the current Redux store state in this component. **
   const store = useSelector((state) => state);

   return (
      <>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route
               path="/dashboard"
               element={
                  store.token ? ( // Check if a valid token exists in the store.
                     <Dashboard /> // Render the Dashboard component if the token is valid.
                  ) : (
                     <Navigate to="/signIn" replace /> // Navigate to the "/signIn" route if the token is not valid.
                  )
               }
            />
            <Route
               path="/transaction"
               element={
                  store.token ? ( // Check if a valid token exists in the store.
                     <Transaction /> // Render the Transaction component if the token is valid.
                  ) : (
                     <Navigate to="/signIn" replace /> // Navigate to the "/signIn" route if the token is not valid.
                  )
               }
            />
            {/* Simple path to my page /signIn */}
            <Route path="/signIn" element={<SignIn />} />
            <Route
               path={store.token && '/transactions' }
               element={<Transaction />}
            />
            {/* If any error other than an authentication failure occurs, navigate to my "Error" component. */}
            <Route path="*" element={<Error />} />
         </Routes>
         <Footer />
      </>
   );
};

export default App;
