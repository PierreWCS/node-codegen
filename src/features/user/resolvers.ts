import {
  MutationCreateUserArgs,
  MutationDeleteUserArgs,
  QueryGetUserArgs,
} from '../../graphql/generated';
import {UserController} from './';

const createUser = async (_: any, {args}: MutationCreateUserArgs) => {
  try {
    return await UserController.create(args);
  } catch (error) {
    throw error;
  }
};

const getUser = async (_: any, {id}: QueryGetUserArgs) => {
  try {
    return await UserController.find(id);
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (_: any, {id}: MutationDeleteUserArgs) => {
  try {
    return await UserController.remove(id);
  } catch (error) {
    throw error;
  }
};

export const Queries = {
  getUser,
};

export const Mutations = {
  createUser,
  deleteUser,
};
