import {ObjectId} from 'mongodb';
import {
  CreateProductInput,
  Product,
  QueryGetProductArgs,
} from '../../graphql/generated';
import {Database} from '../../lib/Database';

const find = async (id: QueryGetProductArgs['id']): Promise<Product> => {
  try {
    const productCollection = Database.getCollection<Product>('product');
    const product = await productCollection.findOne({_id: new ObjectId(id)});
    return {...product, id: product?._id.toString()};
  } catch (error) {
    throw error;
  }
};

const create = async (args: CreateProductInput): Promise<Product> => {
  try {
    const productCollection = Database.getCollection<Product>('product');
    const createdProduct = await productCollection.insertOne(args);
    return {...args, id: createdProduct.insertedId.toString()};
  } catch (error) {
    throw error;
  }
};

export const ProductController = {
  find,
  create,
};
