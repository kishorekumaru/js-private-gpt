### PRIVATE GPT

Private GPT using Langchain JS, Tensorflow and Ollama Model (Mistral)
We can point different of the chat Model based on the requirements

Install dependeices

`$ yarn install`

Copy a PDF, HTML or Document file under `/data` folder 

To Ingest and create a vectorStore run the following file

`$ node ingest.js`

To ask questions replace the question in `app.js` and run the following file to see the answer

`$ node qa.js`

MIT Licence, this application is a first cut version