import {ProductController} from '.';
import {
  MutationCreateProductArgs,
  QueryGetProductArgs,
} from '../../graphql/generated';

const createProduct = async (_: any, {args}: MutationCreateProductArgs) => {
  try {
    return await ProductController.create(args);
  } catch (error) {
    throw error;
  }
};

const getProduct = async (_: any, {id}: QueryGetProductArgs) => {
  try {
    return await ProductController.find(id);
  } catch (error) {
    throw error;
  }
};

export const Queries = {
  getProduct,
};

export const Mutations = {
  createProduct,
};
