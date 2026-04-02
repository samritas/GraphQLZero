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

/** Paginated users for the directory table (nested counts via meta only). */
export const GET_USERS = gql`
  query GetUsers($options: PageQueryOptions) {
    users(options: $options) {
      data {
        id
        name
        username
        email
        phone
        website
        company {
          name
        }
        address {
          city
        }
        posts(options: { paginate: { page: 1, limit: 1 } }) {
          meta {
            totalCount
          }
        }
        albums(options: { paginate: { page: 1, limit: 1 } }) {
          meta {
            totalCount
          }
          data {
            photos(options: { paginate: { page: 1, limit: 1 } }) {
              data {
                thumbnailUrl
                url
              }
            }
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

/** Totals for metric cards (single round trip). */
export const GET_USERS_OVERVIEW_STATS = gql`
  query GetUsersOverviewStats {
    users(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    posts(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    albums(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
  }
`;

export type UserRecord = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string } | null;
  address: { city: string } | null;
  posts: { meta: { totalCount: number } | null } | null;
  albums: {
    meta: { totalCount: number } | null;
    data: Array<{
      photos: {
        data: Array<{ thumbnailUrl: string; url: string }>;
      } | null;
    }>;
  } | null;
};

export type UsersPage = {
  data: UserRecord[];
  meta: { totalCount: number } | null;
};

export type UsersQueryResult = {
  users: UsersPage;
};

export type UsersOverviewStatsQueryResult = {
  users: { meta: { totalCount: number } | null };
  posts: { meta: { totalCount: number } | null };
  albums: { meta: { totalCount: number } | null };
};

/** Toolbar “role” tabs: GraphQLZero users have no role field — we use id ranges on the mock dataset (ids 1–5 vs 6–10). */
export type UsersRoleFilter = "all" | "admins" | "editors";

export type UserListOperator = {
  kind: "LTE" | "GTE";
  field: string;
  value: string;
};

export type UsersPageQueryOptions = {
  paginate?: { page: number; limit: number };
  search?: { q: string };
  operators?: UserListOperator[];
};

export function buildUsersQueryOptions(
  page: number,
  pageSize: number,
  roleFilter: UsersRoleFilter = "all",
  searchQuery = "",
): UsersPageQueryOptions {
  const options: UsersPageQueryOptions = {
    paginate: { page, limit: pageSize },
  };
  const q = searchQuery.trim();
  if (q.length > 0) {
    options.search = { q };
  }
  if (roleFilter === "admins") {
    options.operators = [{ kind: "LTE", field: "id", value: "5" }];
  } else if (roleFilter === "editors") {
    options.operators = [{ kind: "GTE", field: "id", value: "6" }];
  }
  return options;
}
