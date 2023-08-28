import {
  CreateUserInput,
  EditUserInput,
  MutationDeleteUserArgs,
  QueryGetUserArgs,
  User,
} from '../../graphql/generated';
import {Database} from '../../lib/Database';
import {ObjectId} from 'mongodb';

const find = async (id: QueryGetUserArgs['id']): Promise<User> => {
  try {
    const userCollection = Database.getCollection<User>('user');
    const user = await userCollection.findOne({_id: new ObjectId(id)});
    return {...user, id: user?._id.toString()};
  } catch (error) {
    throw error;
  }
};

const create = async (args: CreateUserInput): Promise<User> => {
  try {
    const userCollection = Database.getCollection<User>('user');
    const createdUser = await userCollection.insertOne(args);
    return {...args, id: createdUser.insertedId.toString()};
  } catch (error) {
    throw error;
  }
};

const update = async (updatedUser: EditUserInput): Promise<User> => {
  try {
    const userCollection = Database.getCollection<User>('user');
    const user = await userCollection.findOneAndUpdate(
      {_id: new ObjectId(updatedUser.id)},
      updatedUser,
    );
    return {...user, id: user.value?._id.toString()};
  } catch (error) {
    throw error;
  }
};

const remove = async (id: MutationDeleteUserArgs['id']): Promise<string> => {
  try {
    const userCollection = Database.getCollection<User>('user');
    const deletedUser = await userCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    const deletedUserId = deletedUser.value?._id.toString();
    if (!deletedUserId) {
      throw new Error('UserNotFound');
    }
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
