"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { DropdownIcon, MagnifierIcon } from "@/components/icons";
import { TypographyH2, TypographyUnorderedList } from "@/components/typograhpy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, InputRoot } from "@/components/ui/input";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectRoot } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "@/hooks/use-session";
import { range } from "@/lib/array";
import { useGetAllTodos } from "@/queries/todo-query";
import type { NodewaveServiceAuthzResponseBody } from "@/services/nodewave-service.types";

const AVAILABLE_STATUSES = [
  { label: "Done", value: "true" },
  { label: "Undone", value: "false" },
];

const PAGE_PARAM_NAME = "page";
const SEARCH_PARAM_NAME = "search";
const STATUS_PARAM_NAME = "status";

export default function AdminPage() {
  const session = useSession<NodewaveServiceAuthzResponseBody>();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPageQuery = Number(searchParams.get(PAGE_PARAM_NAME)) || 1;
  const searchQuery = searchParams.get(SEARCH_PARAM_NAME) || undefined;
  const statusQuery = searchParams.get(STATUS_PARAM_NAME) || undefined;

  const totalPages = 20;
  const lastPage = Math.min(Math.max(currentPageQuery + 2, 5), totalPages);
  const firstPage = Math.max(1, lastPage - 4);

  const getAllTodos = useGetAllTodos({
    token: session.token,
    params: {
      page: currentPageQuery,
      rows: 10,
      filters: {
        isDone: statusQuery ? statusQuery === "true" : undefined,
        item: searchQuery,
      },
    },
  });

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    params.set(PAGE_PARAM_NAME, "1");
    if (term) {
      params.set(SEARCH_PARAM_NAME, term);
    } else {
      params.delete(SEARCH_PARAM_NAME);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (key: string, value: unknown) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    params.set(key, String(value));
    replace(`${pathname}?${params.toString()}`);
  };

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    const searchInput = String(formObject[SEARCH_PARAM_NAME]);
    handleSearch(searchInput);
  };

  const goToPreviousPage = (): void => {
    handleFilterChange(PAGE_PARAM_NAME, Math.max(currentPageQuery - 1, 1));
  };

  const goToNextPage = (): void => {
    handleFilterChange(
      PAGE_PARAM_NAME,
      Math.min(currentPageQuery + 1, totalPages),
    );
  };

  const onStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    handleFilterChange(STATUS_PARAM_NAME, event.currentTarget.value);
  };

  useEffect(() => {
    if (!getAllTodos.error) {
      return;
    }

    toast.error(getAllTodos.error.message, {
      description: (
        <TypographyUnorderedList>
          {getAllTodos?.error?.errors?.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </TypographyUnorderedList>
      ),
    });
  }, [getAllTodos.error]);

  return (
    <main className='tw:flex tw:h-full tw:flex-col'>
      <TypographyH2 className='tw:text-neutral-700 tw:mb-8'>To Do</TypographyH2>
      <Card className='tw:overflow-y-auto'>
        <div className='tw:flex tw:gap-10'>
          <form className='tw:flex tw:gap-3' onSubmit={onSearchSubmit}>
            <InputRoot
              className='tw:w-fit'
              startIcon={<MagnifierIcon className='tw:text-neutral-500' />}
            >
              <Input
                placeholder='Search'
                dimension='lg'
                border='bottom'
                name={SEARCH_PARAM_NAME}
                defaultValue={searchQuery}
              />
            </InputRoot>
            <Button>Search</Button>
          </form>
          <SelectRoot
            className='tw:w-fit'
            endIcon={<DropdownIcon className='tw:size-4' />}
          >
            <Select
              dimension='lg'
              border='bottom'
              value={statusQuery}
              onChange={onStatusFilterChange}
            >
              <option value=''>Filter by Status</option>
              {AVAILABLE_STATUSES.map(({ label, value }) => {
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
            </Select>
          </SelectRoot>
        </div>
        {getAllTodos.isPending ? (
          <p className='tw:text-center'>Loading...</p>
        ) : getAllTodos.isError ? (
          <p className='tw:text-center tw:text-destructive'>
            Error: {getAllTodos.error?.message}
          </p>
        ) : getAllTodos.data?.content?.entries?.length === 0 ? (
          <p className='tw:text-center'>Empty</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>To do</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getAllTodos.data.content.entries.map((todoItem) => {
                return (
                  <TableRow key={todoItem.id}>
                    <TableCell className='tw:w-1/3'>
                      {todoItem.userId}
                    </TableCell>
                    <TableCell className='tw:w-1/3'>{todoItem.item}</TableCell>
                    <TableCell className='tw:w-1/3'>
                      <Badge
                        size='lg'
                        variant={todoItem.isDone ? "success" : "destructive"}
                      >
                        {todoItem.isDone ? "Success" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        <Pagination>
          <PaginationContent className='tw:ml-auto'>
            <PaginationItem>
              <PaginationPrevious onClick={goToPreviousPage} />
            </PaginationItem>
            {range(firstPage, lastPage).map((page) => {
              const isActive = page === currentPageQuery;
              return (
                <PaginationItem key={page}>
                  <PaginationButton
                    isActive={isActive}
                    onClick={() => {
                      handleFilterChange(PAGE_PARAM_NAME, page);
                    }}
                  >
                    {page}
                  </PaginationButton>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext onClick={goToNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </main>
  );
}
