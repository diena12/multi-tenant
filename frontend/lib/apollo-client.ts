import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // GraphQL サーバーのエンドポイントを指定
  credentials: "include", // Cookie などの認証情報を送る場合
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
