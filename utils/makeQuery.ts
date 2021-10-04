import { DocumentNode } from "graphql";
import client from "../ApolloProvider";

export const makeQuery: any =  async(query: DocumentNode, variables={}) => {

    try{

        const data = await client.query({ query: query, fetchPolicy: 'no-cache', variables:variables });
        
        return data;

    } catch(err:any) {
        throw new Error(err)
    }
    
}