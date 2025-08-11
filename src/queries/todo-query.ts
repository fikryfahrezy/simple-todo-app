import {
  type InfiniteData,
  type MutationOptions,
  type UseInfiniteQueryOptions,
  type UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createNewTodo,
  deleteTodoById,
  getAllTodos,
  markTodo,
  RequestError,
} from "@/services/todo-service";
import type {
  TodoServiceAllTodosParams,
  TodoServiceAllTodosRequest,
  TodoServiceAllTodosResponse,
  TodoServiceCreateTodoRequest,
  TodoServiceCreateTodoResponse,
  TodoServiceDeleteTodoRequest,
  TodoServiceDeleteTodoResponse,
  TodoServiceMarkTodoRequest,
  TodoServiceMarkTodoResponse,
} from "@/services/todo-service.types";

export const todoKeys = {
  all: ["todos"],
  lists: () => {
    return [...todoKeys.all, "lists"] as const;
  },
  list: (queryParams: TodoServiceAllTodosParams) => {
    return [...todoKeys.lists(), queryParams] as const;
  },
};

export function useGetAllTodos(
  params: TodoServiceAllTodosRequest,
  options?: Omit<
    UseQueryOptions<TodoServiceAllTodosResponse, RequestError>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: todoKeys.list(params.params),
    queryFn: async () => {
      const result = await getAllTodos(params);

      if (!result.success) {
        throw new RequestError(result.response.message, result.response.errors);
      }

      return result.response;
    },
    ...options,
  });
}

export function useInfiniteGetAllTodos(
  params: TodoServiceAllTodosRequest,
  options?: Omit<
    UseInfiniteQueryOptions<
      TodoServiceAllTodosResponse,
      RequestError,
      InfiniteData<TodoServiceAllTodosResponse, unknown>,
      readonly unknown[],
      number
    >,
    | "queryKey"
    | "queryFn"
    | "initialPageParam"
    | "getPreviousPageParam"
    | "getNextPageParam"
  >,
) {
  return useInfiniteQuery({
    queryKey: todoKeys.list(params.params),
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const result = await getAllTodos({
        ...params,
        params: { ...params.params, page: pageParam },
      });

      if (!result.success) {
        throw new RequestError(result.response.message, result.response.errors);
      }

      return result.response;
    },
    getNextPageParam: (lastPage, __, lastPageParam) => {
      if (lastPage.content.entries.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    ...options,
  });
}

export function useCreateNewTodo(
  options?: Omit<
    MutationOptions<
      TodoServiceCreateTodoResponse,
      RequestError,
      TodoServiceCreateTodoRequest
    >,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const result = await createNewTodo(payload);

      if (!result.success) {
        throw new RequestError(result.response.message, result.response.errors);
      }

      return result.response;
    },
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
}

export function useMarkTodo(
  options?: Omit<
    MutationOptions<
      TodoServiceMarkTodoResponse,
      RequestError,
      TodoServiceMarkTodoRequest
    >,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const result = await markTodo(payload);

      if (!result.success) {
        throw new RequestError(result.response.message, result.response.errors);
      }

      return result.response;
    },
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
}

export function useDeleteTodo(
  options?: Omit<
    MutationOptions<
      TodoServiceDeleteTodoResponse,
      RequestError,
      TodoServiceDeleteTodoRequest
    >,
    "mutationFn"
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const result = await deleteTodoById(payload);

      if (!result.success) {
        throw new RequestError(result.response.message, result.response.errors);
      }

      return result.response;
    },
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
}
