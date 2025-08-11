import axios from "axios";
import type {
  TodoServiceAllTodosRequest,
  TodoServiceAllTodosResponse,
  TodoServiceAuthzResponse,
  TodoServiceCreateTodoRequest,
  TodoServiceCreateTodoResponse,
  TodoServiceDeleteTodoRequest,
  TodoServiceDeleteTodoResponse,
  TodoServiceLoginRequest,
  TodoServiceMarkTodoRequest,
  TodoServiceMarkTodoResponse,
  TodoServiceRegisterRequest,
  TodoServiceResponseFail,
  TodoServiceResult,
  TodoServiceVerifyTokenRequest,
  TodoServiceVerifyTokenResponse,
} from "@/services/todo-service.types";

const BASE_URL = process.env.NEXT_PUBLIC_SERVICE_API_URL;

export class RequestError extends Error {
  errors: string[];
  constructor(message: string, errors: string[]) {
    super(message);
    this.name = "Request Error";
    this.errors = errors;
  }
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // Never throw
  validateStatus: () => true,
});

export async function register({
  data,
}: TodoServiceRegisterRequest): Promise<
  TodoServiceResult<TodoServiceAuthzResponse, TodoServiceResponseFail>
> {
  const res = await axiosInstance.post<
    TodoServiceAuthzResponse | TodoServiceResponseFail
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
}: TodoServiceLoginRequest): Promise<
  TodoServiceResult<TodoServiceAuthzResponse, TodoServiceResponseFail>
> {
  const res = await axiosInstance.post<
    TodoServiceAuthzResponse | TodoServiceResponseFail
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
}: TodoServiceVerifyTokenRequest): Promise<
  TodoServiceResult<TodoServiceVerifyTokenResponse, TodoServiceResponseFail>
> {
  const res = await axiosInstance.post<
    TodoServiceVerifyTokenResponse | TodoServiceResponseFail
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
  token,
}: TodoServiceCreateTodoRequest): Promise<
  TodoServiceResult<TodoServiceCreateTodoResponse, TodoServiceResponseFail>
> {
  const res = await axiosInstance.post<
    TodoServiceCreateTodoResponse | TodoServiceResponseFail
  >("/todos", data, {
    headers: {
      Authorization: `Bearer ${token}`,
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

export async function markTodo({
  todoId,
  data,
  token,
}: TodoServiceMarkTodoRequest): Promise<
  TodoServiceResult<TodoServiceMarkTodoResponse, TodoServiceResponseFail>
> {
  const res = await axiosInstance.put<
    TodoServiceMarkTodoResponse | TodoServiceResponseFail
  >(`/todos/${todoId}/mark`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
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

export async function getAllTodos({
  params,
  token,
}: TodoServiceAllTodosRequest): Promise<
  TodoServiceResult<TodoServiceAllTodosResponse, TodoServiceResponseFail>
> {
  const { page = 1, rows = 10, filters = undefined } = params;

  const res = await axiosInstance.get<
    TodoServiceAllTodosResponse | TodoServiceResponseFail
  >("/todos", {
    params: {
      page,
      rows,
      filters: JSON.stringify(filters),
    },
    headers: {
      Authorization: `Bearer ${token}`,
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
  token,
}: TodoServiceDeleteTodoRequest): Promise<
  TodoServiceResult<TodoServiceDeleteTodoResponse, TodoServiceResponseFail>
> {
  const res = await axiosInstance.delete<
    TodoServiceDeleteTodoResponse | TodoServiceResponseFail
  >(`/todos/${todoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
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
