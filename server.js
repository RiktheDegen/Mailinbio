// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from "openai";
import axios from 'axios';
import fs from "fs";
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase-admin/app';
import 'firebase/compat/storage';
import { getStorage, ref, getDownloadURL} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyByWWvzq0_Rqef_n8kZu58mQA6IENhL0UU",
  authDomain: "mailinbio-e8100.firebaseapp.com",
  projectId: "mailinbio-e8100",
  storageBucket: "mailinbio-e8100.appspot.com",
  messagingSenderId: "845033432043",
  appId: "1:845033432043:web:c4c3307b010a15cb0bafae",
  measurementId: "G-95Y59PQSJW",
  databaseURL: "https://mailinbio-e8100-default-rtdb.firebaseio.com/",
};

const prod = firebase.initializeApp(firebaseConfig);
const storage = getStorage(prod);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());


const openai = new OpenAI({
  apiKey: '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',
});

app.use(bodyParser.json());

let assistantId;
let threadId;


async function createThread() {
  try {
    const thread = await openai.beta.threads.create();
    return thread;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
}

const initThread = async () => {
  try {
    const thread = await createThread();
    threadId = thread.id; // Update threadId after creating the thread
    console.log('Thread created:', threadId);
    return thread;
  } catch (error) {
    console.error('An error occurred during page load:', error);
  }
};

// Example endpoint to handle incoming messages
app.post('/api/messages', async (req, res) => {
  const userMessage = req.body.text; // Assuming your message is sent in the request body
  assistantId = req.body.assistant;


  // Handle the user message, interact with OpenAI, and send back a response

   if (!threadId) return; // Ensure Threadid is not undefined
      
    const sentMessage = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userMessage,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id:  assistantId,
      instructions: "Address the user as developer"
    });
    //'asst_M2KsX8ZbPvYqla6uF7tkKEqH'

    let retryCount = 0;
    let success = false;
    let runStatus;
    let messageOutput;
    

    while (retryCount < 10) {
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
        console.log(runStatus);
      if (runStatus.status === 'completed') {
        success = true;
        messageOutput = await openai.beta.threads.messages.list(threadId);
        console.log(messageOutput);
        break;
      } else if (runStatus.status === 'failed') {
        break;
      } else if (runStatus.status === 'queued' ||runStatus.status === 'in_progress' ) {
        // Wait for 50ms before checking again
        await new Promise(resolve => setTimeout(resolve, 10000));
      }

      retryCount++;
    }
    
    const lastElement = messageOutput.data;

    const botMessage = lastElement.find(lastElement => lastElement.role === 'assistant');
    
    const botReply =  botMessage.content[0].text.value ;

    const botResponse = {
      text: success ? botReply : 'the API call has failed',
      type: 'bot',
    };

  // Example response
  console.log(botResponse.text);
  res.json({ botResponse});
});


app.post('/api/createBot', async (req, res) => {
  let apiReply;
  const userFilesArray = req.body.dataArray; // Assuming your message is sent in the request body
  console.log(userFilesArray);
 
  var numberOfFiles = userFilesArray.length;
  console.log(numberOfFiles);
  var fileID = [];
  // userFilesArray.forEach(async(obj, index) => {
    
  //   const linkVariable = `link${index + 1}`;
  //   var linkValue = obj.url;
  //   // Replace 'path/to/your/file' with the actual path to your file in Firebase Storage

  //   // Create a reference to the file using the 'ref' method
  //   const fileRef = ref(storage, linkValue);

  //   // Get the download URL for the file
  //     getDownloadURL(fileRef)
  //     .then((downloadURL) => {
  //   // Use the download URL to fetch the file content
  //     return fetch(downloadURL);
  //     })
  //     .then((response) => {
  //   // Check if the fetch was successful (status code 200)
  //   if (!response.ok) {
  //     throw new Error(`Failed to fetch file: ${response.statusText}`);
  //   }

  //   // Process the file content (e.g., read as a stream, parse, etc.)
  //   return response.blob(); // You can use response.blob() for binary data
  // })
  // .then(async (fileContent) => {
  //   // Do something with the file content
  //   const fileBlob = new File([fileContent], 'filename');
  //   const fileOne = await openai.files.create({
  //     file: fileBlob,
  //     purpose: "assistants",
  //   });
  //  async function pushFileID() {
  //     var fileIdTemp = await fileOne.id;
  //     fileID.push(fileOne.id);
  //   console.log(fileID);
  //   }
  //   pushFileID();
  //   if (fileID.length === numberOfFiles - 1 ) {
  //     const assistant = await openai.beta.assistants.create({
  //       instructions: "You are a developer support chatbot.Use the given documents to help users with questions regarding the API",
  //       model: "gpt-3.5-turbo-1106",
  //       tools: [{"type": "retrieval"}],
  //       file_ids: fileID,
  //     });
  //     apiReply = assistant.id;
  //   }
  //   const botResponse = apiReply;

  // // Example response
  // console.log(botResponse);
  // res.json({ botResponse});
  //   });
    
  // });
   // Handle the user message, interact with OpenAI, and send back a response

   await Promise.all(userFilesArray.map(async (obj, index) => {
    const linkValue = obj.url;
    const fileRef = ref(storage, linkValue);
    
    try {
      const downloadURL = await getDownloadURL(fileRef);
      const response = await fetch(downloadURL);

      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const fileContent = await response.blob();
      const fileBlob = new File([fileContent], 'filename');

      const fileOne = await openai.files.create({
        file: fileBlob,
        purpose: 'assistants',
      });

      fileID.push(fileOne.id);
      console.log(fileID);
    } catch (error) {
      console.error('Error processing file:', error);
    }
  }));

  if (fileID.length === numberOfFiles) {
    const assistant = await openai.beta.assistants.create({
      instructions: 'You are a developer support chatbot. Use the given documents to help users with questions regarding the API',
      model: 'gpt-3.5-turbo-1106',
      tools: [{ type: 'retrieval' }],
      file_ids: fileID,
    });

    const botResponse = assistant.id;

    // Example response
    console.log(botResponse);
    res.json({ botResponse });
    return
  } else {
    res.status(500).json({ error: 'File processing failed' });
  }
   return

  });


//Begin document upload tests 

const createBot = async () => {
  
  const fileOne = await openai.files.create({
    file: fs.createReadStream("./src/assistants API chat/intro.docx"),
    purpose: "assistants",
  });
  const fileTwo = await openai.files.create({
    file: fs.createReadStream("./src/assistants API chat/tools.docx"),
    purpose: "assistants",
  });
  const assistant = await openai.beta.assistants.create({
    instructions: "You are a developer support chatbot.Use the given documents to help users with questions regarding the API",
    model: "gpt-3.5-turbo-1106",
    tools: [{"type": "retrieval"}],
    file_ids: [fileOne.id, fileTwo.id]
  });
  console.log(assistant.id);
  assistantId = assistant.id;
}


app.listen(port, async() => {
  console.log(`Server is running on port ${port}`);
 initThread()
});
