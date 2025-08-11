export type TodoServiceResponse<TContent> = {
  content: TContent;
  message: string;
  errors: string[];
};

export type TodoServiceResult<TResponseSuccess, TResponseError> =
  | {
      success: true;
      response: TResponseSuccess;
    }
  | {
      success: false;
      response: TResponseError;
    };

export type TodoServiceResponseFail = TodoServiceResponse<null>;

export type TodoServiceRegisterBody = {
  email: string;
  fullName: string;
  password: string;
};

export type TodoServiceRegisterRequest = {
  data: TodoServiceRegisterBody;
};

export type TodoServiceLoginBody = {
  email: string;
  password: string;
};

export type TodoServiceLoginRequest = {
  data: TodoServiceLoginBody;
};

export type TodoServiceUserRole = "USER" | "ADMIN";

export type TodoServiceUser = {
  id: string;
  fullName: string;
  email: string;
  role: TodoServiceUserRole;
};

export type TodoServiceAuthzResponseBody = {
  user: TodoServiceUser;
  token: string;
};

export type TodoServiceAuthzResponse =
  TodoServiceResponse<TodoServiceAuthzResponseBody>;

export type TodoServiceVerifyTokenBody = {
  token: string;
};

export type TodoServiceVerifyTokenRequest = {
  data: TodoServiceVerifyTokenBody;
};

export type TodoServiceVerifyTokenResponse = TodoServiceResponse<
  Record<string, never>
>;

export type TodoServiceCreateTodoBody = {
  item: string;
};

export type TodoServiceCreateTodoRequest = {
  token: string;
  data: TodoServiceCreateTodoBody;
};

export type TodoServiceTodo = {
  id: string;
  item: string;
  userId: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  user?: Pick<TodoServiceUser, "id" | "email" | "fullName">;
};

export type TodoServiceCreateTodoResponse =
  TodoServiceResponse<TodoServiceTodo>;

export type TodoServiceMarkTodoAction = "DONE" | "UNDONE";

export type TodoServiceMarkTodoBody = {
  action: TodoServiceMarkTodoAction;
};

export type TodoServiceMarkTodoRequest = {
  token: string;
  todoId: string;
  data: TodoServiceMarkTodoBody;
};

export type TodoServiceMarkTodoResponse = TodoServiceResponse<TodoServiceTodo>;

export type TodoServiceAllTodosResponseBody = {
  entries: TodoServiceTodo[];
  totalData: number;
  totalPage: number;
};

export type TodoServiceAllTodosParams = {
  page?: number;
  rows?: number;
  filters?: Record<string, unknown>;
};

export type TodoServiceAllTodosRequest = {
  token: string;
  params: TodoServiceAllTodosParams;
};

export type TodoServiceAllTodosResponse =
  TodoServiceResponse<TodoServiceAllTodosResponseBody>;

export type TodoServiceDeleteTodoRequest = {
  token: string;
  todoId: string;
};

export type TodoServiceDeleteTodoResponse = TodoServiceResponse<
  Record<string, never>
>;
