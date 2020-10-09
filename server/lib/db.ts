import { Db, MongoClient } from 'mongodb';

let db: Db;
let client: MongoClient;

export async function connectMongo({ mongoUri, dbName }: { mongoUri: string; dbName: string }) {
  const newClient = await MongoClient.connect(mongoUri);

  db = newClient.db(dbName);
  client = newClient;
}

export const getClient = () => client;

export const getDb = () => db;
