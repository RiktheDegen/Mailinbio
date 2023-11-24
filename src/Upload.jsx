
import React, { useContext, useState } from 'react';
import fs from "fs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { UserContext } from '../src/context/UserContext'
import { Navigate, Link } from 'react-router-dom';
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

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
            }
          );
        };

      const createBot = async () => {
          const fileOne = await openai.files.create({
            file: fs.createReadStream("/Mailinbio/src/assistants API chat/screencapture-platform-openai-docs-assistants-overview-2023-11-21-15_38_12.pdf"),
            purpose: "assistants",
          });
          const fileTwo = await openai.files.create({
            file: fs.createReadStream("Mailinbio/src/assistants API chat/screencapture-platform-openai-docs-assistants-tools-2023-11-21-15_41_15.pdf"),
            purpose: "assistants",
          });
          const assistant = await openai.beta.assistants.create({
            instructions: "You are a developer support chatbot.Use the given documents to help users with questions regarding the API",
            model: "gpt-4-1106-preview",
            tools: [{"type": "retrieval"}],
            file_ids: [fileOne.id, fileTwo.id]
          });
        
        }
      
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
