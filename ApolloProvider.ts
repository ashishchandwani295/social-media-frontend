import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import nookies from 'nookies';
const NEXT_PUBLIC_GRAPHQL_SERVER = process.env.NEXT_PUBLIC_GRAPHQL_SERVER;

const httpLink = createHttpLink({
    uri: NEXT_PUBLIC_GRAPHQL_SERVER,
  });


const authLink = setContext((_, { headers }) => {
    const cookies = nookies.get()
    const token = cookies.authToken
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;