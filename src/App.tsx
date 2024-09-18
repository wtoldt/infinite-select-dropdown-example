import { UserCombobox } from './UserCombobox';
import { UserListInfiniteScroll } from './UserListInfiniteScroll';

export default function App() {
  return (
    <div className="flex flex-col items-center gap-2">
      <p>No infinite scroll, search enabled, uses Command component</p>
      <UserCombobox />

      {/* divider */}
      <div className="my-4 w-9/12 border-t" />

      <p>
        With infinite scroll, no search, not using Command component (just a
        simple list)
      </p>
      <UserListInfiniteScroll />
    </div>
  );
}
