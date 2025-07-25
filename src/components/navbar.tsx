import { logoutAction } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { SearchContext } from "./search-context";
import { Avatar, AvatarFallback, AvatarImage, AvatarOnline } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export type NavbarProps = {
  className?: string;
  userName: string;
  withSearch?: boolean;
};

export function Navbar({
  className,
  userName,
  withSearch = true,
}: NavbarProps) {
  return (
    <nav
      className={cn(
        "tw:sticky tw:w-full tw:flex tw:p-2 tw:items-center tw:justify-between tw:top-0 tw:bg-background tw:border-b-[1px] tw:border-placeholder",
        className,
      )}
    >
      {withSearch && <SearchContext />}
      <div className='tw:ml-auto'>
        <DropdownMenu>
          <DropdownMenuTrigger className='tw:flex tw:items-center tw:gap-4 tw:cursor-pointer'>
            <span>{userName}</span>
            <Avatar>
              <AvatarImage src='/images/avatar.svg' />
              <AvatarFallback>{userName[0]}</AvatarFallback>
              <AvatarOnline />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='tw:w-56' onClick={logoutAction}>
            <Button variant='ghost' className='tw:w-full'>
              Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
