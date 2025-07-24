import axios from "axios";
import type {
  NodewaveServiceAllTodosRequest,
  NodewaveServiceAllTodosResponse,
  NodewaveServiceAuthzResponse,
  NodewaveServiceCreateTodoRequest,
  NodewaveServiceCreateTodoResponse,
  NodewaveServiceDeleteTodoRequest,
  NodewaveServiceDeleteTodoResponse,
  NodewaveServiceLoginRequest,
  NodewaveServiceMarkTodoRequest,
  NodewaveServiceMarkTodoResponse,
  NodewaveServiceRegisterRequest,
  NodewaveServiceResponseFail,
  NodewaveServiceVerifyTokenRequest,
  NodewaveServiceVerifyTokenResponse,
} from "@/services/nodewave-service.types";
import type { Either } from "@/types/utility";

const BASE_URL = process.env.NEXT_PUBLIC_NODEWAVE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export async function register({
  data,
}: NodewaveServiceRegisterRequest): Promise<
  Either<NodewaveServiceAuthzResponse, NodewaveServiceResponseFail>
> {
  const res = await axiosInstance.post<
    NodewaveServiceAuthzResponse | NodewaveServiceResponseFail
  >("/register", data);

  if (!res.data.content) {
    return [null, res.data];
  }

  return [res.data, null];
}

export async function login({
  data,
}: NodewaveServiceLoginRequest): Promise<
  Either<NodewaveServiceAuthzResponse, NodewaveServiceResponseFail>
> {
  const res = await axiosInstance.post<
    NodewaveServiceAuthzResponse | NodewaveServiceResponseFail
  >("/login", data);

  if (!res.data.content) {
    return [null, res.data];
  }

  return [res.data, null];
}

export async function verifyToken({
  data,
}: NodewaveServiceVerifyTokenRequest): Promise<
  Either<NodewaveServiceVerifyTokenResponse, NodewaveServiceResponseFail>
> {
  const res = await axiosInstance.post<
    NodewaveServiceVerifyTokenResponse | NodewaveServiceResponseFail
  >("/verify-token", data);

  if (!res.data.content) {
    return [null, res.data];
  }

  return [res.data, null];
}

export async function createNewTodo({
  data,
}: NodewaveServiceCreateTodoRequest): Promise<
  Either<NodewaveServiceCreateTodoResponse, NodewaveServiceResponseFail>
> {
  const res = await axiosInstance.post<
    NodewaveServiceCreateTodoResponse | NodewaveServiceResponseFail
  >("/todos", data);

  if (!res.data.content) {
    return [null, res.data];
  }

  return [res.data, null];
}

export async function markTodo({
  todoId,
  data,
}: NodewaveServiceMarkTodoRequest): Promise<
  Either<NodewaveServiceMarkTodoResponse, NodewaveServiceResponseFail>
> {
  const res = await axiosInstance.put<
    NodewaveServiceMarkTodoResponse | NodewaveServiceResponseFail
  >(`/todos/${todoId}/mark`, data);

  if (!res.data.content) {
    return [null, res.data];
  }

  return [res.data, null];
}

export async function getAllTodos({
  page = 1,
  rows = 10,
  filters = undefined,
}: NodewaveServiceAllTodosRequest): Promise<
  Either<NodewaveServiceAllTodosResponse, NodewaveServiceResponseFail>
> {
  const res = await axiosInstance.get<
    NodewaveServiceAllTodosResponse | NodewaveServiceResponseFail
  >("/todos", {
    params: {
      page,
      rows,
      filters: JSON.stringify(filters),
    },
  });

  if (!res.data.content) {
    return [null, res.data];
  }

  return [res.data, null];
}

export async function deleteTodoById({
  todoId,
}: NodewaveServiceDeleteTodoRequest): Promise<
  Either<NodewaveServiceDeleteTodoResponse, NodewaveServiceResponseFail>
> {
  const res = await axiosInstance.delete<
    NodewaveServiceDeleteTodoResponse | NodewaveServiceResponseFail
  >(`/todos/${todoId}`);

  if (!res.data.content) {
    return [null, res.data];
  }

  return [res.data, null];
}
