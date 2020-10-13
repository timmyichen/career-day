import { Connection, createConnection } from 'typeorm';
import path from 'path';

let connection: Connection;

export async function connectDb() {
  if (
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_USER ||
    !process.env.DB_NAME ||
    isNaN(parseInt(process.env.DB_PORT))
  ) {
    throw new Error('Missing required db connection field');
  }

  const database = process.env.NODE_ENV === 'test' ? 'test' : process.env.DB_NAME;

  connection = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database,
    entities: [path.join(__dirname, '../models/*.ts')],
  });

  console.log(`\nsuccessfully connected to db ${database}\n`);
}

export const getConnection = () => connection;
