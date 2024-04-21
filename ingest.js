import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { TensorFlowEmbeddings } from 'langchain/embeddings/tensorflow';
import { FaissStore } from 'langchain/vectorstores/faiss';
import '@tensorflow/tfjs-node';

export const ingest = async () => {
    const pdfLoader = new PDFLoader('./data/constitution.pdf');
    const data = await pdfLoader.load();
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 20,
    });
    const characters = await splitter.splitDocuments(data);
    console.log(characters);

    // Save the data to a file
    const vectorstores = await FaissStore.fromDocuments(characters, new TensorFlowEmbeddings());
    console.log('saving vectorstores');

    await vectorstores.save('./data/vectorstores')
    console.log('done');
};
ingest();