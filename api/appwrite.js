import { Client, Databases, ID, Query } from 'appwrite';

export default async function handler(req, res) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const db = new Databases(client);

  try {
    const { method, body, query } = req;

    if (!process.env.APPWRITE_ENDPOINT || !process.env.APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY) {
      return res.status(500).json({ error: 'Missing environment variables' });
    }

    if (method === 'POST' && body.action === 'create') {
      const response = await db.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_ID,
        ID.unique(),
        body.data
      );
      return res.status(200).json(response);
    }

    if (method === 'POST' && body.action === 'update') {
      const response = await db.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_ID,
        body.documentId,
        body.data
      );
      return res.status(200).json(response);
    }

    if (method === 'GET' && query.userEmail) {
      const response = await db.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_ID,
        [Query.equal('userEmail', query.userEmail)]
      );
      return res.status(200).json(response);
    }

    return res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'A server error occurred' });
  }
}