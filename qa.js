import { Ollama } from '@langchain/community/llms/ollama';
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { TensorFlowEmbeddings } from '@langchain/community/embeddings/tensorflow';
import { RetrievalQAChain } from 'langchain/chains';
import '@tensorflow/tfjs-node';
import readerline from 'readline';

let chain;
const reader = readerline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const init = async () => {
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
        console.log('Vector store loaded')
        console.log('Loading model...')
        const reteriver = vectorStore.asRetriever();
        chain = RetrievalQAChain.fromLLM(ollama, reteriver, {
            k: 1
        })
        console.log('Model loaded')

    } catch (error) {
        console.log(error);
    }
}

export const ask = async () => {
    try{
        reader.question('Ask a question: ', async (question) => {
            const answer = await chain.invoke({query: question}, { maxConcurrency: 1 })

            console.log(answer);
            ask();
        });
    } catch (error) {
        console.log(error);
    }
}

export const main = async () => {
    await init();
    await ask();
}

main();