import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://host.docker.internal:4000/graphql", // スキーマのURLやローカルスキーマのパス
  documents: "src/graphql/**/*.graphql", // クエリやミューテーションのパス
  generates: {
    "./src/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true, // React Hooks を有効にする
        withHOC: false,
        withComponent: false,
      },
    },
  },
};

export default config;
