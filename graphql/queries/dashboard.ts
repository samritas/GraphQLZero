import { gql } from "@apollo/client";

/** Single round trip: entity totals, todo backlog, and newest posts for the home overview. */
export const GET_DASHBOARD_OVERVIEW = gql`
  query DashboardOverview {
    users: users(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    posts: posts(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    comments: comments(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    albums: albums(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    photos: photos(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    todos: todos(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    todosPending: todos(
      options: {
        paginate: { page: 1, limit: 1 }
        operators: [{ kind: NE, field: "completed", value: "true" }]
      }
    ) {
      meta {
        totalCount
      }
    }
    recentPosts: posts(options: { paginate: { page: 1, limit: 5 } }) {
      data {
        id
        title
        user {
          name
        }
      }
    }
  }
`;

export type DashboardOverviewQueryResult = {
  users: { meta: { totalCount: number } | null } | null;
  posts: { meta: { totalCount: number } | null } | null;
  comments: { meta: { totalCount: number } | null } | null;
  albums: { meta: { totalCount: number } | null } | null;
  photos: { meta: { totalCount: number } | null } | null;
  todos: { meta: { totalCount: number } | null } | null;
  todosPending: { meta: { totalCount: number } | null } | null;
  recentPosts: {
    data: Array<{ id: string; title: string; user: { name: string } | null }>;
  };
};
