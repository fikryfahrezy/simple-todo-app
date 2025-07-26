export type NodewaveServiceResponse<TContent> = {
  content: TContent;
  message: string;
  errors: string[];
};

export type NodewaveServiceResult<TResponseSuccess, TResponseError> =
  | {
      success: true;
      response: TResponseSuccess;
    }
  | {
      success: false;
      response: TResponseError;
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
  token: string;
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

export type NodewaveServiceMarkTodoAction = "DONE" | "UNDONE";

export type NodewaveServiceMarkTodoBody = {
  action: NodewaveServiceMarkTodoAction;
};

export type NodewaveServiceMarkTodoRequest = {
  token: string;
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

export type NodewaveServiceAllTodosParams = {
  page?: number;
  rows?: number;
  filters?: Record<string, unknown>;
};

export type NodewaveServiceAllTodosRequest = {
  token: string;
  params: NodewaveServiceAllTodosParams;
};

export type NodewaveServiceAllTodosResponse =
  NodewaveServiceResponse<NodewaveServiceAllTodosResponseBody>;

export type NodewaveServiceDeleteTodoRequest = {
  token: string;
  todoId: string;
};

export type NodewaveServiceDeleteTodoResponse = NodewaveServiceResponse<
  Record<string, never>
>;
