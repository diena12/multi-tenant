import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Agent = {
  __typename?: 'Agent';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerAgent: Agent;
};


export type MutationRegisterAgentArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
};

export type RegisterAgentMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterAgentMutation = { __typename?: 'Mutation', registerAgent: { __typename?: 'Agent', id: string, email: string, token?: string | null } };


export const RegisterAgentDocument = gql`
    mutation RegisterAgent($email: String!, $password: String!) {
  registerAgent(email: $email, password: $password) {
    id
    email
    token
  }
}
    `;
export type RegisterAgentMutationFn = Apollo.MutationFunction<RegisterAgentMutation, RegisterAgentMutationVariables>;

/**
 * __useRegisterAgentMutation__
 *
 * To run a mutation, you first call `useRegisterAgentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAgentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAgentMutation, { data, loading, error }] = useRegisterAgentMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterAgentMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAgentMutation, RegisterAgentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAgentMutation, RegisterAgentMutationVariables>(RegisterAgentDocument, options);
      }
export type RegisterAgentMutationHookResult = ReturnType<typeof useRegisterAgentMutation>;
export type RegisterAgentMutationResult = Apollo.MutationResult<RegisterAgentMutation>;
export type RegisterAgentMutationOptions = Apollo.BaseMutationOptions<RegisterAgentMutation, RegisterAgentMutationVariables>;