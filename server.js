// server.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from "openai";
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const openai = new OpenAI({
  apiKey: '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',
});

app.use(bodyParser.json());

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

  // Handle the user message, interact with OpenAI, and send back a response

   if (!threadId) return; // Ensure Threadid is not undefined
      
    const sentMessage = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: userMessage,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: 'asst_M2KsX8ZbPvYqla6uF7tkKEqH',
      instructions: "Address the user as developer"
    });

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

app.listen(port, async() => {
  console.log(`Server is running on port ${port}`);
  await initThread(); // Wait for initThread to complete
});
