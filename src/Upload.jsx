
import React, { useContext, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getDatabase,ref, set, get,child } from 'firebase/database';

import { UserContext } from '../src/context/UserContext'
import { Navigate, Link } from 'react-router-dom';





const DocumentUpload = ({ userId }) => {

    const context = useContext(UserContext)
    if (context.user?.uid) {
        const [document, setDocument] = useState(null);
        
        const handleUpload = async () => {
          // Ensure a document is selected
          if (!document) return;
      
          // Reference to Firebase Storage
          const storageRef = firebase.storage().ref(`${userId}/${document.name}`);
      
          // Upload document
          const uploadTask = storageRef.put(document);
      
          // Handle successful upload
          uploadTask.on('state_changed',
            null,
            error => {
              console.error(error);
            },
            () => {
              // Document uploaded successfully
              console.log('Document uploaded successfully!');
              // writeUserData(context.user.uid, '1',document.name);
            }
          );
        };

      const createBot = async () => {
        
        
        };
      
        return (
          <div>
            <input type="file" onChange={(e) => setDocument(e.target.files[0])} />
            <button onClick={handleUpload}>Upload Document</button>
            <button onClick={createBot}>create new bot with local files</button>
            <Link className='mx-4' to="/Mybot">Go to my bot</Link>
          </div>
        );
    } else {
       return <Navigate to = '/'/>
    }
 
 
 
   
};

export default DocumentUpload;
