import {mergeTypeDefs} from '@graphql-tools/merge';
import {loadFiles} from '@graphql-tools/load-files';

export const typeDefs = `#graphql
  scalar Date
  scalar JSON
  scalar ObjectId
`;

export const getMergedTypeDefs = async () => {
  const getTypeDefs = async () => {
    return loadFiles('src/features/**/*.graphql');
  };
  const mergedTypeDefs = mergeTypeDefs([typeDefs, await getTypeDefs()]);
  return mergedTypeDefs;
};
