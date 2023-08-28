import {ObjectId} from "mongodb";
import {CreateProductInput, Product} from "../../graphql/generated";
import {Database} from "../../lib/Database";

const find = async (id: string) => {
  try {
    const productCollection = Database.getCollection<Product>("product");
    // @ts-ignore
    return await productCollection.findOne({_id: new ObjectId(id)});
  } catch (error) {
    throw error;
  }
};

const create = async (args: CreateProductInput) => {
  try {
    const productCollection = Database.getCollection<Product>("product");
    const createdProduct = await productCollection.insertOne(args);
    return {...args, _id: createdProduct.insertedId};
  } catch (error) {
    throw error;
  }
};

export const ProductController = {
  find,
  create,
};
