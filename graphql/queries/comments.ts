import { gql } from "@apollo/client";

/** Root comments list with optional text search via `search.q` (GraphQLZero). */
export const GET_COMMENTS = gql`
  query GetComments($options: PageQueryOptions) {
    comments(options: $options) {
      data {
        id
        name
        email
        body
        post {
          id
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export type CommentRecord = {
  id: string;
  name: string;
  email: string;
  body: string;
  post: { id: string } | null;
};

export type CommentsPage = {
  data: CommentRecord[];
  meta: { totalCount: number } | null;
};

export type CommentsQueryResult = {
  comments: CommentsPage;
};

export type CommentPageQueryOptions = {
  paginate?: { page: number; limit: number };
  search?: { q: string };
};

export function buildCommentQueryOptions(
  searchQuery: string,
  page: number,
  pageSize: number,
): CommentPageQueryOptions {
  const options: CommentPageQueryOptions = {
    paginate: { page, limit: pageSize },
  };
  const q = searchQuery.trim();
  if (q.length > 0) {
    options.search = { q };
  }
  return options;
}

/** Post picker options for the comments sidebar. */
export const GET_POSTS_FOR_COMMENT_ASSOCIATION = gql`
  query PostsForCommentAssociation($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
      }
    }
  }
`;

export type PostsForCommentAssociationResult = {
  posts: {
    data: Array<{ id: string; title: string }>;
  };
};

/** Global aggregates + body sample for sidebar quick stats (GraphQLZero). */
export const GET_COMMENTS_SIDEBAR_AGGREGATES = gql`
  query CommentsSidebarAggregates($sampleLimit: Int!) {
    posts(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    commentsTotal: comments(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    commentsSample: comments(options: { paginate: { page: 1, limit: $sampleLimit } }) {
      data {
        body
      }
    }
  }
`;

export type CommentsSidebarAggregatesResult = {
  posts: { meta: { totalCount: number } | null } | null;
  commentsTotal: { meta: { totalCount: number } | null };
  commentsSample: { data: Array<{ body: string }> };
};

/** Paginated comments for one post (same `PageQueryOptions` as root `comments`). */
export const GET_COMMENTS_FOR_POST = gql`
  query GetCommentsForPost($postId: ID!, $options: PageQueryOptions) {
    post(id: $postId) {
      id
      comments(options: $options) {
        data {
          id
          name
          email
          body
          post {
            id
          }
        }
        meta {
          totalCount
        }
      }
    }
  }
`;

export type CommentsForPostQueryResult = {
  post: {
    id: string;
    comments: CommentsPage;
  } | null;
};
