import React, { useContext, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getDatabase,ref, set, get,child } from 'firebase/database';
import Modal from 'react-modal';
import { UserContext } from '../src/context/UserContext'
import { Navigate, Link } from 'react-router-dom';





const DocumentUpload = ({ userId }) => {

  const [document, setDocument] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [previewContent, setPreviewContent] = useState('');

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
              const newDocument = { name: document.name, url: storageRef.getDownloadURL() };
              setUploadedDocuments((prevDocuments) => [...prevDocuments, newDocument]);
              setDocument(null); // Reset the document state after upload
            }
          );
        };

      const createBot = async () => {
        
        
        };
      

       
      
        const handleDelete = async (index) => {
          const documentToDelete = uploadedDocuments[index];
          
          try {
            // Reference to Firebase Storage
            const storageRef = firebase.storage().ref(`${userId}/${documentToDelete.name}`);
            
            // Delete the document from Firebase Storage
            await storageRef.delete();
            
            // Update the state to remove the document
            const updatedDocuments = [...uploadedDocuments];
            updatedDocuments.splice(index, 1);
            setUploadedDocuments(updatedDocuments);
        
            console.log('Document deleted successfully:', documentToDelete.name);
          } catch (error) {
            console.error('Error deleting document:', error.message);
            // Handle error if necessary
          }
        };

        return (
          
    <div className="container mt-8">
         <h2 className="text-2xl font-bold">Upload your API Docs:</h2>
         <p className="font-semibold"> Supported file types include:
.c
.cpp
.csv
.docx
.html
.java
.json
.md
.pdf
.php
.pptx
.py
.rb
.tex
.txt
.css</p>
      <div className="flex ">
        <label htmlFor="fileInput" className="cursor-pointer mt-3">
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
        {document && (
            <div className="ml-4 mt-3">
              <p className="font-semibold">{document.name}</p>
              {/* You can also display other information like size, type, etc. */}
              {/* <p>{`Type: ${document.type}`}</p> */}
              {/* <p>{`Size: ${document.size} bytes`}</p> */}
            </div>
          )}
      </div>
      <button
        className="mt-8 mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleUpload}
       >Upload Document</button>
       
       <div className="mt-8">
        <h2 className="text-2xl font-bold">Current Uploads:</h2>
        {uploadedDocuments.map((uploadedDocument, index) => (
          <div key={index} className="border p-4 mt-4 flex items-center">
            {/* Display document icon here */}
            <div className="w-10 h-10 bg-gray-300 mr-4"></div>
            <p>{uploadedDocument.name}</p>
            <div className="ml-auto">
             
              {/* Add onClick handler for delete */}
              <span className="cursor-pointer" onClick={() => handleDelete(index)}>
                Delete
              </span>
            </div>
          </div>
        ))}
      </div>
             


            <button className='mx-4' onClick={createBot}>create new bot with local files</button>
            <Link className='mx-4' to="/Mybot">Go to my bot</Link>
          </div>
        );
    } else {
       return <Navigate to = '/'/>
    }
 
 
 
   
};

export default DocumentUpload;
