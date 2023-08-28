import {
  CreateUserInput,
  EditUserInput,
  MutationDeleteUserArgs,
  QueryGetUserArgs,
  User,
} from '../../graphql/generated';
import {Database} from '../../lib/Database';
import {ObjectId} from 'mongodb';

const find = async (id: QueryGetUserArgs['id']) => {
  try {
    const userCollection = Database.getCollection<User>('user');
    const foundUser = await userCollection.findOne({_id: new ObjectId(id)});
    return foundUser;
  } catch (error) {
    throw error;
  }
};

const create = async (args: CreateUserInput): Promise<User> => {
  try {
    const userCollection = Database.getCollection<User>('user');
    const createdUser = await userCollection.insertOne(args);
    return {...args, _id: createdUser.insertedId};
  } catch (error) {
    throw error;
  }
};

const update = async (updatedUser: EditUserInput) => {
  try {
    const userCollection = Database.getCollection<User>('user');
    return await userCollection.findOneAndUpdate(
      {_id: new ObjectId(updatedUser._id)},
      updatedUser,
    );
  } catch (error) {
    throw error;
  }
};

const remove = async (id: MutationDeleteUserArgs['id']) => {
  try {
    const userCollection = Database.getCollection<User>('user');
    const deletedUserId = (
      await userCollection.findOneAndDelete({
        _id: new ObjectId(id),
      })
    ).value?._id;
    return deletedUserId;
  } catch (error) {
    throw error;
  }
};

export const UserController = {
  find,
  create,
  update,
  remove,
};
