import { openai, supabase } from './config.js';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

/* Split movies.txt into text chunks.
Return LangChain's "output" – the array of Document objects. */
async function splitDocument(document) {
  const response = await fetch(document);
  const text = await response.text();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 250,
    chunkOverlap: 35,
  });
  const output = await splitter.createDocuments([text]);
  return output;
}

/* Create an embedding from each text chunk.
Store all embeddings and corresponding text in Supabase. */
export async function createAndStoreEmbeddings() {
  // Check if the 'movies' table is empty
  const { data: existingData, error } = await supabase
    .from('movies')
    .select('id')  // Select only the id for a lightweight query
    .limit(1);     // We just need to know if there is at least one row
  
  if (error) {
    console.error('Error checking table:', error.message);
    return;
  }

  if (existingData.length > 0) {
    console.log('Table is not empty, skipping insert.');
    return;
  }

  console.log('Table is empty, proceeding with insert.');

  // Proceed with document splitting and embedding
  const chunkData = await splitDocument("movies.txt");
  const data = await Promise.all(
    chunkData.map(async (chunk) => {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: chunk.pageContent
      });
      return { 
        content: chunk.pageContent, 
        embedding: embeddingResponse.data[0].embedding 
      }
    })
  );
  await supabase.from('movies').insert(data);
  console.log('SUCCESS!');
}
