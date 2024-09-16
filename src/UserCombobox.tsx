import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { type ResponseMetadata, type User } from '@/types';

type AbreviatedUser = Pick<User, 'id' | 'firstName' | 'lastName'>;
type AbreviatedUserResponse = {
  users: AbreviatedUser[];
} & ResponseMetadata;

export function UserCombobox() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState<AbreviatedUser | null>(
    null,
  );
  const [users, setUsers] = React.useState<AbreviatedUser[]>([]);
  const [status, setStatus] = React.useState<'idle' | 'loading'>('loading');

  const [debouncedSearch] = useDebounce(search, 300);

  React.useEffect(() => {
    let staleRequest = false;
    const runEffect = async () => {
      setStatus('loading');
      setUsers([]);
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${debouncedSearch}&limit=10&select=id,firstName,lastName`,
      );
      const data: AbreviatedUserResponse =
        (await response.json()) as AbreviatedUserResponse;
      console.log({ data });
      if (!staleRequest) {
        setUsers(data.users);
        setStatus('idle');
      }
    };

    void runEffect();
    return () => {
      staleRequest = true;
    };
  }, [debouncedSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedUser
            ? selectedUser.firstName + ' ' + selectedUser.lastName
            : 'Select User...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search Users..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No User found.</CommandEmpty>
            {status === 'loading' && (
              <CommandLoading>Searching...</CommandLoading>
            )}
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id.toString()}
                  onSelect={(currentValue) => {
                    setSelectedUser(
                      users.find((u) => u.id.toString() === currentValue) ??
                        null,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedUser?.id === user.id
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {user.firstName + ' ' + user.lastName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
