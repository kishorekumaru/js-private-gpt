import { Ollama } from '@langchain/community/llms/ollama';
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { TensorFlowEmbeddings } from '@langchain/community/embeddings/tensorflow';
import { RetrievalQAChain } from 'langchain/chains';
import '@tensorflow/tfjs-node';


export const ask = async () => {
    
    try{
        const ollama = new Ollama({
            baseUrl: 'http://localhost:11434',
            model: 'mistral',
            modelVersion: '1.0.0',
            tokenizer: 'roberta-base',
            language: 'en',
            maxTokens: 512,
            maxRetries: 3,
        });

        const vectorStore = await FaissStore.load('./data/vectorstores', new TensorFlowEmbeddings());
        console.log(vectorStore);
        console.log(vectorStore); 
        console.log("Vector Ids:", vectorStore.ids); // Check loading
        console.log("Vectors:", vectorStore.vectors); // Check loading

        const question = "who is the author?"; //question goes here. 
        const reteriver = vectorStore.asRetriever();
        const chain = RetrievalQAChain.fromLLM(ollama, reteriver, {k: 1})

        const answer = await chain.invoke({query: question});

        console.log(answer);
    } catch (error) {
        console.log(error);
    }
}
ask();