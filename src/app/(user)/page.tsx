"use client";

import { Fragment, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { create } from "zustand";
import { CheckCircleIcon, CheckIcon, XCircleIcon } from "@/components/icons";
import { Intersector } from "@/components/intersector";
import { TypographyH1, TypographyUnorderedList } from "@/components/typograhpy";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox, CheckboxIndicator } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/hooks/use-session";
import {
  useCreateNewTodo,
  useDeleteTodo,
  useInfiniteGetAllTodos,
  useMarkTodo,
} from "@/queris/todo-query";
import type {
  NodewaveServiceAuthzResponseBody,
  NodewaveServiceTodo,
} from "@/services/nodewave-service.types";

type TodoState = {
  item: string;
  setItem: (newItem: string) => void;
  // todo id as a key, and boolean for delete loading indicator as value
  checkedTodoIds: Record<string, boolean>;
  isDeletingTodo: (id: string, deleting: boolean) => void;
  addCheckedTodoId: (id: string) => void;
  removeCheckedTodoId: (id: string) => void;
};

const useTodoStore = create<TodoState>()((set) => {
  return {
    item: "",
    setItem: (newItem) => {
      set(() => {
        return { item: newItem };
      });
    },
    checkedTodoIds: {},
    isDeletingTodo: (id: string, deleting: boolean) => {
      set((state) => {
        return { checkedTodoIds: { ...state.checkedTodoIds, [id]: deleting } };
      });
    },
    addCheckedTodoId: (id) => {
      set((state) => {
        return { checkedTodoIds: { ...state.checkedTodoIds, [id]: false } };
      });
    },
    removeCheckedTodoId: (id) => {
      set((state) => {
        const { [id]: _, ...restCheckedTodoIds } = state.checkedTodoIds;
        return {
          checkedTodoIds: restCheckedTodoIds,
        };
      });
    },
  };
});

type TodoItemProps = {
  todoItem: NodewaveServiceTodo;
};

const TodoItem = ({ todoItem }: TodoItemProps) => {
  const session = useSession<NodewaveServiceAuthzResponseBody>();
  const markTodo = useMarkTodo();

  const checkedTodoIds = useTodoStore((state) => {
    return state.checkedTodoIds;
  });
  const addCheckedTodoId = useTodoStore((state) => {
    return state.addCheckedTodoId;
  });
  const removeCheckedTodoId = useTodoStore((state) => {
    return state.removeCheckedTodoId;
  });

  const isTodoChecked = todoItem.id in checkedTodoIds;
  const isDeleting = checkedTodoIds[todoItem.id];

  const onCheckedChange = () => {
    if (isTodoChecked) {
      removeCheckedTodoId(todoItem.id);
    } else {
      addCheckedTodoId(todoItem.id);
    }
  };

  const onMarkClick = () => {
    markTodo.mutate(
      {
        token: session.token,
        todoId: todoItem.id,
        data: {
          action: todoItem.isDone ? "UNDONE" : "DONE",
        },
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);
        },
        onError(result) {
          toast.error(result.message, {
            description: (
              <TypographyUnorderedList>
                {result.errors.map((error) => {
                  return <li key={error}>{error}</li>;
                })}
              </TypographyUnorderedList>
            ),
          });
        },
      },
    );
  };

  return (
    <div className='tw:border-b-[1px] tw:border-placeholder tw:pb-7 tw:last:pb-0 tw:last:border-b-0 tw:flex tw:items-center tw:gap-10'>
      <Checkbox
        className='tw:w-6 tw:h-6 tw:[--color:#6DD230] tw:[--bg:#E9F8E0]'
        checked={isTodoChecked}
        onCheckedChange={onCheckedChange}
      >
        <CheckboxIndicator>
          <CheckIcon className='tw:size-5' strokeWidth='4' />
        </CheckboxIndicator>
      </Checkbox>
      <p className='tw:text-3xl tw:text-neutral-[#323232] tw:flex-[1]'>
        {isDeleting ? "Loading deleting..." : todoItem.item}
      </p>
      {markTodo.isPending ? (
        <span>Loading...</span>
      ) : (
        <Button variant='ghost' size='none' onClick={onMarkClick}>
          {todoItem.isDone ? (
            <CheckCircleIcon className='tw:text-[#6DD230] tw:size-8' />
          ) : (
            <XCircleIcon className='tw:text-[#F01414] tw:size-8' />
          )}
        </Button>
      )}
    </div>
  );
};

export default function UserPage() {
  const session = useSession<NodewaveServiceAuthzResponseBody>();

  const createNewTodo = useCreateNewTodo();
  const deleteTodo = useDeleteTodo();
  const getAllTodos = useInfiniteGetAllTodos({
    params: {},
    token: session.token,
  });

  const item = useTodoStore((state) => {
    return state.item;
  });
  const setItem = useTodoStore((state) => {
    return state.setItem;
  });

  const checkedTodoIds = useTodoStore((state) => {
    return state.checkedTodoIds;
  });
  const isDeletingTodo = useTodoStore((state) => {
    return state.isDeletingTodo;
  });
  const removeCheckedTodoId = useTodoStore((state) => {
    return state.removeCheckedTodoId;
  });

  const isAnyCheckedTodo = Object.keys(checkedTodoIds).length !== 0;

  const onTaskInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem(event.currentTarget.value);
  };

  const onCreateTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewTodo.mutate(
      {
        token: session.token,
        data: {
          item,
        },
      },
      {
        onSuccess: (result) => {
          toast.success(result.message);
          setItem("");
        },
        onError(result) {
          toast.error(result.message, {
            description: (
              <TypographyUnorderedList>
                {result.errors.map((error) => {
                  return <li key={error}>{error}</li>;
                })}
              </TypographyUnorderedList>
            ),
          });
        },
      },
    );
  };

  const onDeleteClick = () => {
    for (const todoId in checkedTodoIds) {
      isDeletingTodo(todoId, true);
      deleteTodo.mutate(
        {
          todoId,
          token: session.token,
        },
        {
          onSuccess: (result) => {
            toast.success(result.message);
            removeCheckedTodoId(todoId);
          },
          onError(result) {
            isDeletingTodo(todoId, false);
            toast.error(result.message, {
              description: (
                <TypographyUnorderedList>
                  {result.errors.map((error) => {
                    return <li key={error}>{error}</li>;
                  })}
                </TypographyUnorderedList>
              ),
            });
          },
        },
      );
    }
  };

  const onEndReached = useCallback(() => {
    if (getAllTodos.hasNextPage && !getAllTodos.isFetching) {
      getAllTodos.fetchNextPage();
    }
  }, [
    getAllTodos.hasNextPage,
    getAllTodos.isFetching,
    getAllTodos.fetchNextPage,
  ]);

  useEffect(() => {
    if (getAllTodos.error) {
      toast.error(getAllTodos.error.message, {
        description: (
          <TypographyUnorderedList>
            {getAllTodos.error.errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </TypographyUnorderedList>
        ),
      });
    }
  }, [getAllTodos.error]);

  return (
    <main className='tw:pt-36 tw:px-4 tw:pb-4 tw:max-w-[958px] tw:mx-auto'>
      <TypographyH1 className='tw:mb-20 tw:text-5xl tw:text-blue-900'>
        To Do
      </TypographyH1>
      <Card className='tw:p-16 tw:shadow-2xl tw:border-[1px] tw:border-placeholder'>
        <div className='tw:mb-16 tw:space-y-7'>
          <div>
            <Label
              htmlFor='taskInput'
              className='tw:mb-2 tw:text-xl tw:text-neutral-500 tw:font-medium'
            >
              Add a new task
            </Label>
            <form className='tw:flex tw:gap-10' onSubmit={onCreateTodo}>
              <Input
                id='taskInput'
                placeholder='Input task'
                dimension='xl'
                className='tw:bg-accent tw:border-0 tw:border-b-2 tw:border-b-blue-900 tw:rounded-xs'
                value={item}
                onChange={onTaskInputChange}
              />
              <Button
                size='xl'
                className='tw:w-fit tw:text-2xl'
                disabled={createNewTodo.isPending}
                type={createNewTodo.isPending ? "submit" : "submit"}
              >
                {createNewTodo.isPending ? "Loading..." : "Add Todo"}
              </Button>
            </form>
          </div>
          <div className='scrollbox tw:max-h-[250px] tw:overflow-y-auto tw:space-y-7 tw:bg-no-repeat'>
            {getAllTodos.isPending ? (
              <p className='tw:text-center'>Loading...</p>
            ) : getAllTodos.isError ? (
              <p className='tw:text-center tw:text-destructive'>
                Error: {getAllTodos.error?.message}
              </p>
            ) : getAllTodos.data?.pages?.[0]?.content?.entries?.length === 0 ? (
              <p className='tw:text-center'>Empty</p>
            ) : (
              <>
                {getAllTodos.data?.pages.map((page, pageIndex) => {
                  return (
                    // biome-ignore lint/suspicious/noArrayIndexKey: this is fine, as the index never re-arrange
                    <Fragment key={pageIndex}>
                      {page.content.entries.map((todoItem) => {
                        return (
                          <TodoItem key={todoItem.id} todoItem={todoItem} />
                        );
                      })}
                    </Fragment>
                  );
                })}
                <Intersector onIntsersecting={onEndReached} />
              </>
            )}
          </div>
        </div>
        <Button
          variant='destructive'
          size='xl'
          className='tw:w-fit tw:text-2xl'
          disabled={!isAnyCheckedTodo}
          onClick={onDeleteClick}
        >
          Deleted Selected
        </Button>
      </Card>
    </main>
  );
}
