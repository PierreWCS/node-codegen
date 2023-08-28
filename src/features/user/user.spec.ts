import {graphql, GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from '@graphql-tools/schema';

import {Database} from '../../lib';
import {UserController} from './controllers';
import {User, CreateUserInput} from '../../graphql/generated';
import {resolvers} from '../../graphql';
import {getMergedTypeDefs} from '../../graphql/typeDefs';

const GET_USER = `#graphql
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      firstname
      birthdate
      gender
    }
  }
`;
const CREATE_USER = `#graphql
  mutation CreateUser($args: CreateUserInput!) {
    createUser(args: $args) {
      id
      firstname
      birthdate
      gender
    }
  }
`;
const DELETE_USER = `#graphql
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;

describe('User', () => {
  let schema: GraphQLSchema;

  const init = async () => {
    schema = makeExecutableSchema({
      typeDefs: await getMergedTypeDefs(),
      resolvers,
    });
  };

  beforeAll(async () => {
    await Database.connect();
    await init();
  });

  afterAll(async () => {
    await Database.disconnect();
  });

  afterEach(async () => {
    await Database.drop();
  });

  it('should get a user', async () => {
    const user = await UserController.create({
      birthdate: '11-03-1996',
      firstname: 'Pierre-Test<GET_USER>',
      gender: 'male',
    });

    const {data, errors} = await graphql({
      schema: schema,
      source: GET_USER,
      variableValues: {
        id: user.id,
      },
    });
    if (errors) {
      console.log('errors in <should get a user>', errors);
    }

    expect((data?.getUser as User).id).toBe(user.id);
  });

  it('should create a user', async () => {
    const createUserArgs: CreateUserInput = {
      firstname: 'Pierre-Test<CREATE_USER>',
      gender: 'male',
      birthdate: '11-03-1996',
    };
    const {data, errors} = await graphql({
      schema: schema,
      source: CREATE_USER,
      variableValues: {
        args: createUserArgs,
      },
    });
    if (errors) {
      console.log('errors in <should create a user>', errors);
    }
    const createdUser = data?.createUser as User;

    expect(createdUser).not.toBe(null);
    expect(createdUser.firstname).toBe(createUserArgs.firstname);
  });

  it('should delete a user', async () => {
    const user = await UserController.create({
      birthdate: '11-03-1996',
      firstname: 'Pierre-Test<DELETE_USER>',
      gender: 'male',
    });
    const {data, errors} = await graphql({
      schema: schema,
      source: DELETE_USER,
      variableValues: {
        id: user.id,
      },
    });
    if (errors) {
      console.log('errors in <should delete a user>', errors);
    }
    const deletedUserId = data?.deleteUser as User['id'];

    expect(deletedUserId).toBe(user.id);
  });
});
