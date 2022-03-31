import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type Car = {
  __typename?: 'Car';
  id: Scalars['ID'];
  model: Scalars['String'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']>;
};

export type CarInput = {
  model: Scalars['String'];
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCar?: Maybe<Car>;
  addUser?: Maybe<User>;
  removeCar?: Maybe<Scalars['Boolean']>;
  removeUser?: Maybe<Scalars['ID']>;
  updateCar?: Maybe<Car>;
  updateUser?: Maybe<User>;
};


export type MutationAddCarArgs = {
  carInput: CarInput;
};


export type MutationAddUserArgs = {
  userInput: UserInput;
};


export type MutationRemoveCarArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCarArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  car?: Maybe<Car>;
  cars?: Maybe<Array<Maybe<Car>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryCarArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  cars?: Maybe<Array<Car>>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserInput = {
  username: Scalars['String'];
};

export type CarQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CarQuery = { __typename?: 'Query', car?: { __typename?: 'Car', id: string, model: string, user?: { __typename?: 'User', id: string, username: string } | null } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, cars?: Array<{ __typename?: 'Car', id: string, model: string }> | null } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, username: string, cars?: Array<{ __typename?: 'Car', id: string, model: string }> | null }> | null };


export const CarDocument = gql`
    query Car($id: ID!) {
  car(id: $id) {
    id
    model
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useCarQuery__
 *
 * To run a query within a React component, call `useCarQuery` and pass it any options that fit your needs.
 * When your component renders, `useCarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCarQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCarQuery(baseOptions: Apollo.QueryHookOptions<CarQuery, CarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CarQuery, CarQueryVariables>(CarDocument, options);
      }
export function useCarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CarQuery, CarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CarQuery, CarQueryVariables>(CarDocument, options);
        }
export type CarQueryHookResult = ReturnType<typeof useCarQuery>;
export type CarLazyQueryHookResult = ReturnType<typeof useCarLazyQuery>;
export type CarQueryResult = Apollo.QueryResult<CarQuery, CarQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    id
    username
    cars {
      id
      model
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    username
    cars {
      id
      model
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    