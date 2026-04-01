import { gql } from "@apollo/client";

/** Users for the author filter dropdown. */
export const GET_USERS_FOR_AUTHOR_FILTER = gql`
  query GetUsersForAuthorFilter($options: PageQueryOptions) {
    users(options: $options) {
      data {
        id
        name
      }
      meta {
        totalCount
      }
    }
  }
`;

export type UsersForFilterQueryResult = {
  users: {
    data: Array<{ id: string; name: string }>;
    meta: { totalCount: number } | null;
  };
};
