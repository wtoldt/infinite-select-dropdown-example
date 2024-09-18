import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { UserInfiniteScroll } from '@/components/UserInfiniteScroll';
import { cn } from '@/lib/utils';
import { type AbreviatedUser } from '@/types';

function UserItem({ user }: { user: AbreviatedUser }) {
  return (
    <>
      <Avatar>
        <AvatarImage
          alt={`User icon for ${user.firstName} ${user.lastName}`}
          src={`https://dummyjson.com/icon/${user.firstName}${user.lastName}/40`}
        />
        <AvatarFallback>{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
      </Avatar>
      {`${user.firstName} ${user.lastName}`}
    </>
  );
}

type UserCommandItemProps = {
  user: AbreviatedUser;
  setSelectedUser: React.Dispatch<React.SetStateAction<AbreviatedUser | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: AbreviatedUser | null;
  style: React.CSSProperties;
};
function UserCommandItem({
  user,
  setSelectedUser,
  setOpen,
  selectedUser,
  style,
}: UserCommandItemProps) {
  return (
    <CommandItem
      style={style}
      key={user.id}
      value={user.id.toString()}
      onSelect={() => {
        setSelectedUser(user);
        setOpen(false);
      }}
      className={cn('gap-1')}
    >
      <Check
        className={cn(
          'h-4 w-4',
          selectedUser?.id === user.id ? 'opacity-100' : 'opacity-0',
        )}
      />
      <UserItem user={user} />
    </CommandItem>
  );
}

export function UserComboboxInfiniteScroll() {
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<AbreviatedUser | null>(
    null,
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {selectedUser ? (
            <div className="flex items-center gap-1">
              <UserItem user={selectedUser} />
            </div>
          ) : (
            'Select User...'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command shouldFilter={false}>
          <CommandList>
            <UserInfiniteScroll
              fixedSizeListMeasurements={{
                height: 300,
                width: 250,
                itemSize: 52,
              }}
              renderItem={(user, index, style, isItemLoaded) => {
                if (!isItemLoaded(index)) {
                  return <CommandEmpty>No User Found.</CommandEmpty>;
                }

                return (
                  <UserCommandItem
                    user={user}
                    setSelectedUser={setSelectedUser}
                    setOpen={setOpen}
                    selectedUser={selectedUser}
                    style={style}
                  />
                );
              }}
            />
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
