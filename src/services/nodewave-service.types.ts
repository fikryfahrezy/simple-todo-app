export type NodewaveServiceResponse<TContent> = {
  content: TContent;
  message: string;
  errors: string[];
};

export type NodewaveServiceResponseFail = NodewaveServiceResponse<null>;

export type NodewaveServiceRegisterBody = {
  email: string;
  fullName: string;
  password: string;
};

export type NodewaveServiceRegisterRequest = {
  data: NodewaveServiceRegisterBody;
};

export type NodewaveServiceLoginBody = {
  email: string;
  fullName: string;
  password: string;
};

export type NodewaveServiceLoginRequest = {
  data: NodewaveServiceLoginBody;
};

export type NodewaveServiceUserRole = "USER" | "ADMIN";

export type NodewaveServiceUser = {
  id: string;
  fullName: string;
  email: string;
  role: NodewaveServiceUserRole;
};

export type NodewaveServiceAuthzResponseBody = {
  user: NodewaveServiceUser;
  token: string;
};

export type NodewaveServiceAuthzResponse =
  NodewaveServiceResponse<NodewaveServiceAuthzResponseBody>;

export type NodewaveServiceVerifyTokenBody = {
  token: string;
};

export type NodewaveServiceVerifyTokenRequest = {
  data: NodewaveServiceVerifyTokenBody;
};

export type NodewaveServiceVerifyTokenResponse = NodewaveServiceResponse<
  Record<string, never>
>;

export type NodewaveServiceCreateTodoBody = {
  item: string;
};

export type NodewaveServiceCreateTodoRequest = {
  data: NodewaveServiceCreateTodoBody;
};

export type NodewaveServiceTodo = {
  id: string;
  item: string;
  userId: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NodewaveServiceCreateTodoResponse =
  NodewaveServiceResponse<NodewaveServiceTodo>;

export type NodewaveServiceMarkTodoBody = {
  item: string;
};

export type NodewaveServiceMarkTodoRequest = {
  todoId: string;
  data: NodewaveServiceMarkTodoBody;
};

export type NodewaveServiceMarkTodoResponse =
  NodewaveServiceResponse<NodewaveServiceTodo>;

export type NodewaveServiceAllTodosResponseBody = {
  entries: NodewaveServiceTodo[];
  totalData: number;
  totalPage: number;
};

export type NodewaveServiceAllTodosRequest = {
  page?: number;
  rows?: number;
  filters?: string;
};

export type NodewaveServiceAllTodosResponse =
  NodewaveServiceResponse<NodewaveServiceAllTodosResponseBody>;

export type NodewaveServiceDeleteTodoRequest = {
  todoId: string;
};

export type NodewaveServiceDeleteTodoResponse = NodewaveServiceResponse<
  Record<string, never>
>;
