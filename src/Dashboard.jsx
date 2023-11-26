import React, { useState, useContext } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Replace with your Firebase storage functions
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { UserContext } from '../src/context/UserContext'
import { Navigate, Link } from 'react-router-dom';

const Dashboard = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [instructions, setInstructions] = useState('');

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
        }};  



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleCreateBot = async () => {
    if (!file || !instructions) {
      alert('Please select a file and provide instructions.');
      return;
    }

    // Upload the file to Firebase Storage
    const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    // Add the upload to the list of uploads
    setUploads((prevUploads) => [...prevUploads, { name: file.name, url: downloadURL }]);

    // Clear the file input and instructions
    setFile(null);
    setInstructions('');
  };

  return (
    <div className="container mt-8">
         <h2 className="text-2xl font-bold">Upload your API Docs:</h2>
      <div className="flex ">
        <label htmlFor="fileInput" className="cursor-pointer">
          <div className="w-16 h-16 border border-gray-300 flex justify-center items-center">
            <span className="text-4xl">+</span>
          </div>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={(e) => setDocument(e.target.files[0])}
          />
        </label>
        
      </div>
      <button
        className="mt-8 mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >Upload Document</button>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Current Uploads:</h2>
        <div className="flex mt-2">
          {uploads.map((upload, index) => (
            <div key={index} className="m-2 p-4 border border-gray-300">
              <p>{upload.name}</p>
              <img src={upload.url} alt={upload.name} className="mt-2 max-w-xs" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Give your bot instructions:</h2>
        <textarea
          className="w-full p-4 border border-gray-300 mt-2"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </div>

      <button
        className="mt-8 mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleCreateBot}
      >
        Create my bot
      </button>
    </div>
  );
};

export default Dashboard;
