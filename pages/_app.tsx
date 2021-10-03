import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import client from '../ApolloProvider';
import React from 'react';
import { ContextProvider } from '../context/contextProvider';


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={client}>
        <ContextProvider>
          <Component {...pageProps} />
        </ContextProvider>
      </ApolloProvider>
  )
}
export default MyApp
