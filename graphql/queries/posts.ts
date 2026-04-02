import { gql } from "@apollo/client";

/** Root posts list with optional title search via `search.q` (GraphQLZero). */
export const GET_POSTS = gql`
  query GetPosts($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
        user {
          name
          email
        }
        comments(options: { paginate: { page: 1, limit: 100 } }) {
          meta {
            totalCount
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

/** Single post with comment preview for expanded table row (GraphQLZero). */
export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        name
        email
      }
      comments(options: { paginate: { page: 1, limit: 2 } }) {
        data {
          id
          name
          email
          body
        }
        meta {
          totalCount
        }
      }
    }
  }
`;

/** Global post and comment totals for dashboard stats copy (meta-only, one row). */
export const GET_POSTS_STATS_NETWORK = gql`
  query PostsStatsNetwork {
    posts(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    comments(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
  }
`;

export type PostsStatsNetworkResult = {
  posts: { meta: { totalCount: number } | null };
  comments: { meta: { totalCount: number } | null };
};

/** Last 7 posts (API order) with comment totals for the posting-frequency chart. */
export const GET_POSTING_FREQUENCY = gql`
  query GetPostingFrequency {
    posts(options: { paginate: { page: 1, limit: 7 } }) {
      data {
        id
        comments(options: { paginate: { page: 1, limit: 1 } }) {
          meta {
            totalCount
          }
        }
      }
    }
  }
`;

/** Posts for one author; same `options` (paginate, search) as root `posts`. */
export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!, $options: PageQueryOptions) {
    user(id: $userId) {
      id
      name
      posts(options: $options) {
        data {
          id
          title
          body
          user {
            name
            email
          }
          comments(options: { paginate: { page: 1, limit: 100 } }) {
            meta {
              totalCount
            }
          }
        }
        meta {
          totalCount
        }
      }
    }
  }
`;

export type PostsPage = {
  data: Array<{
    id: string;
    title: string;
    body: string;
    user: {
      name: string;
      email: string;
    } | null;
    comments: {
      meta: { totalCount: number } | null;
    } | null;
  }>;
  meta: { totalCount: number } | null;
};

export type PostsQueryResult = {
  posts: PostsPage;
};

export type UserPostsQueryResult = {
  user: {
    id: string;
    name: string;
    posts: PostsPage;
  } | null;
};

export type PostDetail = {
  id: string;
  title: string;
  body: string;
  user: {
    name: string;
    email: string;
  } | null;
  comments: {
    data: Array<{
      id: string;
      name: string;
      email: string;
      body: string;
    }>;
    meta: { totalCount: number } | null;
  } | null;
};

export type PostDetailQueryResult = {
  post: PostDetail | null;
};

export type PostingFrequencyQueryResult = {
  posts: {
    data: Array<{
      id: string;
      comments: { meta: { totalCount: number } | null } | null;
    }>;
  };
};

export type PageQueryOptionsVariable = {
  paginate?: { page: number; limit: number };
  search?: { q: string };
};

/** Builds `PageQueryOptions` for GraphQLZero `posts` / `user.posts`. */
export function buildPostQueryOptions(
  titleSearch: string,
  page: number,
  pageSize: number,
): PageQueryOptionsVariable {
  const options: PageQueryOptionsVariable = {
    paginate: { page, limit: pageSize },
  };
  const q = titleSearch.trim();
  if (q.length > 0) {
    options.search = { q };
  }
  return options;
}
