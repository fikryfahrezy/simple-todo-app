import {
  type MutationOptions,
  type UseQueryOptions,
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
} from "@/services/nodewave-service";
import type {
  NodewaveServiceAllTodosParams,
  NodewaveServiceAllTodosRequest,
  NodewaveServiceAllTodosResponse,
  NodewaveServiceCreateTodoRequest,
  NodewaveServiceCreateTodoResponse,
  NodewaveServiceDeleteTodoRequest,
  NodewaveServiceDeleteTodoResponse,
  NodewaveServiceMarkTodoRequest,
  NodewaveServiceMarkTodoResponse,
} from "@/services/nodewave-service.types";

export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "lists"] as const,
  list: (queryParams: NodewaveServiceAllTodosParams) =>
    [...todoKeys.lists(), queryParams] as const,
};

export function useGetAllTodos(
  params: NodewaveServiceAllTodosRequest,
  options?: Omit<
    UseQueryOptions<NodewaveServiceAllTodosResponse, RequestError>,
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

export function useCreateNewTodo(
  options?: Omit<
    MutationOptions<
      NodewaveServiceCreateTodoResponse,
      RequestError,
      NodewaveServiceCreateTodoRequest
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
      NodewaveServiceMarkTodoResponse,
      RequestError,
      NodewaveServiceMarkTodoRequest
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
      NodewaveServiceDeleteTodoResponse,
      RequestError,
      NodewaveServiceDeleteTodoRequest
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
