import { cn } from "@/lib/utils";
import { SearchContext } from "./search-context";
import { Avatar, AvatarFallback, AvatarImage, AvatarOnline } from "./ui/avatar";

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
        "tw:sticky tw:flex tw:p-2 tw:items-center tw:justify-between tw:top-0 tw:bg-background tw:border-b-[1px] tw:border-placeholder",
        className,
      )}
    >
      {withSearch && <SearchContext />}
      <div className='tw:w-fit tw:mr-16 tw:flex tw:items-center tw:gap-4'>
        <span>{userName}</span>
        <Avatar>
          <AvatarImage src='/images/avatar.svg' />
          <AvatarFallback>{userName[0]}</AvatarFallback>
          <AvatarOnline />
        </Avatar>
      </div>
    </nav>
  );
}
