"use client";

import { DropdownIcon, MagnifierIcon } from "@/components/icons";
import { TypographyH2 } from "@/components/typograhpy";
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
import { range } from "@/lib/array";

export default function AdminPage() {
  const currentPage = 1;
  const totalPages = 20;
  const lastPage = Math.min(Math.max(currentPage + 2, 3), totalPages);
  const firstPage = Math.max(1, lastPage - 4);

  return (
    <main className='tw:flex tw:h-full tw:flex-col'>
      <TypographyH2 className='tw:text-neutral-700 tw:mb-8'>To Do</TypographyH2>
      <Card className='tw:overflow-y-auto'>
        <div className='tw:flex tw:gap-10'>
          <div className='tw:flex tw:gap-3'>
            <InputRoot
              className='tw:w-fit'
              startIcon={<MagnifierIcon className='tw:text-neutral-500' />}
            >
              <Input placeholder='Search' dimension='lg' border='bottom' />
            </InputRoot>
            <Button>Search</Button>
          </div>
          <SelectRoot
            className='tw:w-fit'
            endIcon={<DropdownIcon className='tw:size-4' />}
          >
            <Select dimension='lg' border='bottom'>
              <option value=''>Filter by Status</option>
              <option value='indonesia'>Indonesia</option>
            </Select>
          </SelectRoot>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>To do</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='tw:w-1/3'>Ahmad Akbar</TableCell>
              <TableCell className='tw:w-1/3'>This</TableCell>
              <TableCell className='tw:w-1/3'>
                <Badge size='lg' variant='success'>
                  Success
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='tw:w-1/3'>Ahmad Akbar</TableCell>
              <TableCell className='tw:w-1/3'>Hello</TableCell>
              <TableCell className='tw:w-1/3'>
                <Badge size='lg' variant='destructive'>
                  Pending
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='tw:w-1/3'>Ahmad Akbar</TableCell>
              <TableCell className='tw:w-1/3'>Good</TableCell>
              <TableCell className='tw:w-1/3'>
                <Badge size='lg' variant='success'>
                  Success
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent className='tw:ml-auto'>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            {range(firstPage, lastPage).map((page) => {
              const isActive = page === currentPage;
              return (
                <PaginationItem key={page}>
                  <PaginationButton isActive={isActive}>
                    {page}
                  </PaginationButton>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Card>
    </main>
  );
}
