import { gql } from "@apollo/client";

/** Paginated todos with optional title search and `completed` filters via operators (GraphQLZero). */
export const GET_TODOS = gql`
  query GetTodos($options: PageQueryOptions) {
    todos(options: $options) {
      data {
        id
        title
        completed
        user {
          id
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

/** Stat cards, insight strip metrics, and spotlight copy (single round trip). */
export const GET_TODOS_STATS = gql`
  query GetTodosStats {
    todosAll: todos(options: { paginate: { page: 1, limit: 1 } }) {
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
    todosCompleted: todos(
      options: {
        paginate: { page: 1, limit: 1 }
        operators: [{ kind: NE, field: "completed", value: "false" }]
      }
    ) {
      meta {
        totalCount
      }
    }
    spotlightTodo: todo(id: "1") {
      id
      title
      completed
    }
    postsMeta: posts(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
    commentsMeta: comments(options: { paginate: { page: 1, limit: 1 } }) {
      meta {
        totalCount
      }
    }
  }
`;

export type TodoRecord = {
  id: string;
  title: string;
  completed: boolean;
  user: { id: string } | null;
};

export type TodosPage = {
  data: TodoRecord[];
  meta: { totalCount: number } | null;
};

export type TodosQueryResult = {
  todos: TodosPage;
};

export type TodosStatsQueryResult = {
  todosAll: { meta: { totalCount: number } | null } | null;
  todosPending: { meta: { totalCount: number } | null } | null;
  todosCompleted: { meta: { totalCount: number } | null } | null;
  spotlightTodo: Pick<TodoRecord, "id" | "title" | "completed"> | null;
  postsMeta: { meta: { totalCount: number } | null } | null;
  commentsMeta: { meta: { totalCount: number } | null } | null;
};

export type TodoStatusFilter = "all" | "pending" | "completed";

export type TodoPageQueryOptions = {
  paginate: { page: number; limit: number };
  search?: { q: string };
  operators?: Array<{ kind: "NE"; field: string; value: string }>;
};

export function buildTodoQueryOptions(
  page: number,
  pageSize: number,
  status: TodoStatusFilter,
  titleSearch: string,
): TodoPageQueryOptions {
  const options: TodoPageQueryOptions = {
    paginate: { page, limit: pageSize },
  };
  const q = titleSearch.trim();
  if (q.length > 0) {
    options.search = { q };
  }
  if (status === "pending") {
    options.operators = [{ kind: "NE", field: "completed", value: "true" }];
  } else if (status === "completed") {
    options.operators = [{ kind: "NE", field: "completed", value: "false" }];
  }
  return options;
}
