import React, { useContext, useState, useEffect  } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getDatabase,ref, set, get,child } from 'firebase/database';
import Modal from 'react-modal';
import { UserContext } from './context/UserContext'
import axios from 'axios';

function CurrentUploads({ userId }) {
    const context = useContext(UserContext)
    useEffect(() => {
        // Fetch existing files from Firebase
        const fetchExistingFiles = async () => {
          try {
            const dbRef = ref(getDatabase());
            const snapshot = await get(child(dbRef, `users/${userId}/uploadedDocuments`));
    
            if (snapshot.exists()) {
              const existingFiles = snapshot.val();
              const filesArray = Object.entries(existingFiles).map(([name, url]) => ({ name, url }));
              setUploadedDocuments(filesArray);
            }
          } catch (error) {
            console.error('Error fetching existing files:', error.message);
          }
        };
    
        if (context.user?.uid) {
          fetchExistingFiles();
        }
      }, [context.user?.uid, userId]);


  return (
    <div>currentUploads</div>
  )
}

export default CurrentUploads