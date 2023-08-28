import {Collection, Db, Document, MongoClient} from 'mongodb';
import {Product, User} from '../graphql/generated';

const MONGO_URL = process.env.MONGO_URL || '';
const DB_NAME = process.env.DATABASE_NAME || '';

export enum CollectionsEnum {
  User = 'user',
  Product = 'product',
}

export const Database = (() => {
  let connectionInstance: MongoClient;
  let db: Db;

  const connect = async () => {
    if (connectionInstance) {
      throw new Error('Already connected');
    }
    try {
      const client = await MongoClient.connect(MONGO_URL);
      connectionInstance = client;
      db = client.db(DB_NAME);
      console.log('📖 - Connected to MongoDB');
    } catch (error) {
      throw error;
    }
  };

  const disconnect = async () => {
    if (!connectionInstance) {
      throw new Error('Not connected to MongoDB');
    }
    await connectionInstance.close();
  };

  const getInstance = async () => {
    if (connectionInstance) {
      return connectionInstance;
    }
    throw new Error('You must connect to the Database first');
  };

  const getDb = () => {
    if (!db) {
      throw new Error('DB not initialized');
    }
    return db;
  };

  /**
   * Returns a reference to a MongoDB Collection.
   *
   * @param collectionName - the collection name we wish to access.
   * @returns return the Collection instance
   */
  const getCollection = <T extends (Product | User) & Document>(
    collectionName: `${CollectionsEnum}`,
  ): Collection<T> => {
    if (!db) {
      throw new Error('DB not initialized');
    }
    return db.collection(collectionName);
  };

  return {
    connect,
    disconnect,
    getInstance,
    getDb,
    getCollection,
  };
})();
