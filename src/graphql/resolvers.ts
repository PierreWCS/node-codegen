import {
  Mutations as UserMutations,
  Queries as UserQueries,
} from '../features/user';
import {
  Mutations as ProductMutations,
  Queries as ProductQueries,
} from '../features/product';
import {Resolvers} from './generated';
// import * as scalars from './scalars';

export const resolvers: Resolvers = {
  Query: {
    ...UserQueries,
    ...ProductQueries,
  },
  Mutation: {
    ...UserMutations,
    ...ProductMutations,
  },
  // ...scalars,
};
