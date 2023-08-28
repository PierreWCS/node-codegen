import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {buildSchema} from 'graphql';

import {resolvers} from '../graphql/resolvers';
import {getMergedTypeDefs} from '../graphql/typeDefs';
import {Resolvers} from '../graphql/generated';

export const Server = (() => {
  const start = async () => {
    buildSchema;
    const typeDefs = await getMergedTypeDefs();
    const server = new ApolloServer({
      typeDefs,
      resolvers: resolvers as Resolvers,
    });

    const {url} = await startStandaloneServer(server, {
      context: async ({req}) => ({token: req.headers.token}),
      listen: {port: 4000},
    });
    console.log('🚀 - Server ready at: ', url);
  };
  return {start};
})();
