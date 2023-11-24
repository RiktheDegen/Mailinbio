import OpenAI from "openai";
const openai = new OpenAI();


const assitant = await openai.beta.assistants.create(
    {
        name: "API tutor",
        instructions: "You help me understand API docs",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-3.5-turbo"
      }
);
  
const thread = await openai.beta.threads.create();

const message = await openai.beta.threads.messages.create(thread.id,
    {
        role: "user",
        content: "Please explain to me what an API is"
    }
);

const run = await openai.beta.threads.runs.create(thread.id, {
   assistant_id: assitant.id,
    instructions: "Address the user as developer"

});



const messageOutput = await openai.beta.threads.messages.list('thread_obdO0GRtY49XhLfk9YGpLfkP');

messageOutput.body.data.forEach((messageOutput) => {
    
}
);

const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);


console.log(runStatus);