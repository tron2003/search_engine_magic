export const vectorize = async (input: string): Promise<number[]> => {
    const response = await fetch('http://localhost:11434/api/embeddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: "snowflake-arctic-embed:22m",
            prompt: input
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Ollama API error: ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    let embedding = data.embedding;

    // If the embedding length is less than 1536, pad it with zeros
    while (embedding.length < 1536) {
        embedding.push(0);
    }

    // If the embedding length is greater than 1536, truncate it
    if (embedding.length > 1536) {
        embedding = embedding.slice(0, 1536);
    }

    return embedding;
};
