// React
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, setUserData } from '../../redux/actions/actions';

const Profil = () => {
   const store = useSelector((state) => state);
   const user = store.user;

   const userName = user && user.userName;

   const [edit, setEdit] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getUserData());
   }, [dispatch]);

   // OPEN MODALE
   const openModale = () => {
      setEdit(true);
   };
   // CLOSE MODALE
   const cancelEdit = () => {
      setEdit(false);
   };

   // SAVE EDITION
   const onSave = (e) => {
      e.preventDefault();
      const editUserName = document.querySelector('#editFirstName').value;
      dispatch(setUserData(editUserName));
      setEdit(false);
   };

   return (
      <div>
         {!edit ? (
            <div className="header">
               <h1>
                  Welcome back
                  <br />
                  {userName}
               </h1>
               <button
                  className="edit-button"
                  onClick={openModale}
               >
                  Edit Name
               </button>
            </div>
         ) : (
            <div className="header">
               <h1>
                  Welcome back
                  <br />
                  <div className="zone-edit">
                     <input type="text" placeholder={userName} id="editFirstName"/>
                  </div>
                  <div className="edit-btn">
                     <button 
                        className="edit-button" onClick={onSave}>&nbsp;Save&nbsp;
                     </button>
                     <button 
                        className="edit-button" onClick={cancelEdit}>Cancel
                     </button>
                  </div>
               </h1>
            </div>
         )}
      </div>
   );
};

export default Profil;
