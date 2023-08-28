import type {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: ["src/graphql/schema.graphql", "src/features/**/*.graphql"],
  generates: {
    "src/graphql/generated/index.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
      },
    },
  },
};

export default config;
