import React, { useContext, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getDatabase,ref, set, get,child, update, increment } from 'firebase/database';
import Modal from 'react-modal';
import { UserContext } from '../context/UserContext'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DocumentUpload = ({ userId }) => {
  var listOfDocs;

  const [document, setDocument] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [docURL, setDocURL] = useState([]);
  const [docType, setDocType] = useState('');

  const Navigate = useNavigate();
    const context = useContext(UserContext)
    
    function writeUserData(HasUploads, UploadCount) {
      
      const db = getDatabase();
      const userRef = ref(db, 'users/' + context.user.uid);
      update(userRef, {
        HasUploads: HasUploads,
        UploadCount: UploadCount,
      });
    }
    
    function writeUserBot(AssitantId, HasBotStatus) {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + context.user.uid);
      update(userRef, {
        AssitantId: AssitantId,
        HasBotStatus: HasBotStatus,
      });
    }


    if (context.user?.uid) {
        const [document, setDocument] = useState(null);
        
        const handleUpload = async () => {
          // Ensure a document is selected
          if (!document) return;
          setDocType('');
            // Specify the allowed file types
          
            if (uploadedDocuments.length >= 20) {
              alert('You can only upload up to 20 files.');
              return;
            }

          const allowedFileTypes = ['.c', '.cpp', '.csv', '.docx', '.html', '.java', '.json', '.md', '.pdf', '.php', '.pptx', '.py', '.rb', '.tex', '.txt', '.css'];
          
          const fileExtension = document.name.slice(((document.name.lastIndexOf(".") - 1) >>> 0) + 2);
          const isValidFileType = allowedFileTypes.includes(`.${fileExtension.toLowerCase()}`);

          if (!isValidFileType) {
            setDocType('Invalid file type. Please select a supported file type.');
            
            return;
          }

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
            async () => {
              // Document uploaded successfully
              console.log('Document uploaded successfully!');
              const downloadURL = await storageRef.getDownloadURL(); // Await the promise
              const newDocument = { name: document.name, url: downloadURL };
              
              setUploadedDocuments((prevDocuments) => [...prevDocuments, newDocument]);
              console.log(uploadedDocuments.length);
              var incrementUploadCount = uploadedDocuments.length + 1;
              writeUserData('true', incrementUploadCount);
              console.log('performed writeUserData');
              setDocument(null); // Reset the document state after upload
            }
          );
        };

      const createBot = async () => {
        if (uploadedDocuments.length<1) {
                  return  alert('please upload files to continue');
                }
                console.log(Array.isArray(uploadedDocuments));
                const response = await axios.post('https://lorem-ipsum-demo-3115728536ba.herokuapp.com/api/createBot', {
                  dataArray: uploadedDocuments,
                     
        }  
        )
          
        const botId = response.data.botResponse;
        console.log('Bot succesfully made ' + botId);
        const assistantId = botId;
        writeUserBot(botId, 'true');
        const charSet = 'asst';
        var hasAsst = charSet.split('').every(char => botId.includes(char))
        console.log(hasAsst);

        if (hasAsst){
          // Navigate('/BotTesting');
          Navigate(`/BotTesting/${assistantId}`);
        };
         
        
        
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
            console.log(uploadedDocuments.length);
            writeUserData(uploadedDocuments.length > 1 ? 'true' : 'false', updatedDocuments.length);
          } catch (error) {
            console.error('Error deleting document:', error.message);
            // Handle error if necessary
          }
        };

        return (
          
    <div className="container mt-8">
         <h2 className="text-2xl font-bold">Upload your API Docs:</h2>
         <p className="font-semibold"> Upload upto 20 files. Supported file types include:
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
              <p className="font-semibold">{docType}</p>
              {/* You can also display other information like size, type, etc. */}
              {/* <p>{`Type: ${document.type}`}</p> */}
              {/* <p>{`Size: ${document.size} bytes`}</p> */}
            </div>
          )}
      </div>
      <button
        className="mt-8 mb-8 bg-transparent hover:bg-blue-500 text-blue-500 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleUpload}
       >Upload Document</button>
       
       <div className="mt-8">
        <h2 className="text-2xl font-bold">Current Uploads:</h2>
        {uploadedDocuments.map((uploadedDocument, index) => (
          <div key={index} className="border p-4 mt-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 mx-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>

            {/* <div className="w-10 h-10 bg-gray-300 mr-4"></div> */}
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
      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold">Give your bot instructions:</h2>
        <textarea
          className="w-full p-4 border border-gray-300 mt-2"
         value={instructions}
         onChange={}
        />
      </div> */}


            <button className='mt-8 mb-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={createBot}>Create my Bot</button>
           
          </div>
        );
    } else {
       return <Navigate to = '/'/>
    }
 
 
 
   
};

export default DocumentUpload;