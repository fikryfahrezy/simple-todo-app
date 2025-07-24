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
  NodewaveServiceResult,
  NodewaveServiceVerifyTokenRequest,
  NodewaveServiceVerifyTokenResponse,
} from "@/services/nodewave-service.types";

const BASE_URL = process.env.NEXT_PUBLIC_NODEWAVE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export async function register({
  data,
}: NodewaveServiceRegisterRequest): Promise<
  NodewaveServiceResult<
    NodewaveServiceAuthzResponse,
    NodewaveServiceResponseFail
  >
> {
  const res = await axiosInstance.post<
    NodewaveServiceAuthzResponse | NodewaveServiceResponseFail
  >("/register", data);

  if (!res.data.content) {
    return {
      success: false,
      response: res.data,
    };
  }

  return {
    success: true,
    response: res.data,
  };
}

export async function login({
  data,
}: NodewaveServiceLoginRequest): Promise<
  NodewaveServiceResult<
    NodewaveServiceAuthzResponse,
    NodewaveServiceResponseFail
  >
> {
  const res = await axiosInstance.post<
    NodewaveServiceAuthzResponse | NodewaveServiceResponseFail
  >("/login", data);

  if (!res.data.content) {
    return {
      success: false,
      response: res.data,
    };
  }

  return {
    success: true,
    response: res.data,
  };
}

export async function verifyToken({
  data,
}: NodewaveServiceVerifyTokenRequest): Promise<
  NodewaveServiceResult<
    NodewaveServiceVerifyTokenResponse,
    NodewaveServiceResponseFail
  >
> {
  const res = await axiosInstance.post<
    NodewaveServiceVerifyTokenResponse | NodewaveServiceResponseFail
  >("/verify-token", data);

  if (!res.data.content) {
    return {
      success: false,
      response: res.data,
    };
  }

  return {
    success: true,
    response: res.data,
  };
}

export async function createNewTodo({
  data,
}: NodewaveServiceCreateTodoRequest): Promise<
  NodewaveServiceResult<
    NodewaveServiceCreateTodoResponse,
    NodewaveServiceResponseFail
  >
> {
  const res = await axiosInstance.post<
    NodewaveServiceCreateTodoResponse | NodewaveServiceResponseFail
  >("/todos", data);

  if (!res.data.content) {
    return {
      success: false,
      response: res.data,
    };
  }

  return {
    success: true,
    response: res.data,
  };
}

export async function markTodo({
  todoId,
  data,
}: NodewaveServiceMarkTodoRequest): Promise<
  NodewaveServiceResult<
    NodewaveServiceMarkTodoResponse,
    NodewaveServiceResponseFail
  >
> {
  const res = await axiosInstance.put<
    NodewaveServiceMarkTodoResponse | NodewaveServiceResponseFail
  >(`/todos/${todoId}/mark`, data);

  if (!res.data.content) {
    return {
      success: false,
      response: res.data,
    };
  }

  return {
    success: true,
    response: res.data,
  };
}

export async function getAllTodos({
  page = 1,
  rows = 10,
  filters = undefined,
}: NodewaveServiceAllTodosRequest): Promise<
  NodewaveServiceResult<
    NodewaveServiceAllTodosResponse,
    NodewaveServiceResponseFail
  >
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
    return {
      success: false,
      response: res.data,
    };
  }

  return {
    success: true,
    response: res.data,
  };
}

export async function deleteTodoById({
  todoId,
}: NodewaveServiceDeleteTodoRequest): Promise<
  NodewaveServiceResult<
    NodewaveServiceDeleteTodoResponse,
    NodewaveServiceResponseFail
  >
> {
  const res = await axiosInstance.delete<
    NodewaveServiceDeleteTodoResponse | NodewaveServiceResponseFail
  >(`/todos/${todoId}`);

  if (!res.data.content) {
    return {
      success: false,
      response: res.data,
    };
  }

  return {
    success: true,
    response: res.data,
  };
}
