import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

function graphqlUri(): string {
  const uri = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  if (!uri) {
    throw new Error(
      "NEXT_PUBLIC_GRAPHQL_ENDPOINT is missing. Add it to .env.local.",
    );
  }
  return uri;
}


export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: graphqlUri() }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
}
