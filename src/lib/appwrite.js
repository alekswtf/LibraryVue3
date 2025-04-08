import { Client, Account, Databases, ID, Query } from 'appwrite';     

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const db = new Databases(client);

export const DATABASE_ID = '67e19e1c0023d5384bf2';
export const COLLECTION_ID = '67e1a0df003b877e51ae';
export { ID, Query };


