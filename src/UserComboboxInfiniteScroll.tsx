import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
  const isSelected = selectedUser?.id === user.id;
  return (
    <div
      style={style}
      key={user.id}
      onClick={() => {
        setSelectedUser(user);
        setOpen(false);
      }}
      className={cn(
        `relative flex cursor-default select-none items-center gap-1 rounded-sm px-2
        py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground
        disabled:pointer-events-none disabled:opacity-50`,
      )}
      role="option"
      aria-selected={isSelected}
    >
      <Check
        className={cn(
          'h-4 w-4',
          selectedUser?.id === user.id ? 'opacity-100' : 'opacity-0',
        )}
      />
      <UserItem user={user} />
    </div>
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
        <UserInfiniteScroll
          fixedSizeListMeasurements={{
            height: 300,
            width: 250,
            itemSize: 52,
          }}
          renderItem={(user, index, style, isItemLoaded) => {
            if (!isItemLoaded(index)) {
              return <div style={style}>Loading...</div>;
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
      </PopoverContent>
    </Popover>
  );
}
