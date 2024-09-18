import { UserCombobox } from './UserCombobox';
import { UserComboboxInfiniteScroll } from './UserComboboxInfiniteScroll';
import { UserListInfiniteScroll } from './UserListInfiniteScroll';

export default function App() {
  return (
    <div className="container mx-auto flex flex-col items-center gap-2">
      <h2 className="text-2xl font-bold">Combobox with search</h2>
      <p>No infinite scroll, search enabled, uses Command component.</p>
      <p className="text-sm text-slate-400">
        Can only show 10 results at time. Uses useEffect for api call.
      </p>
      <UserCombobox />

      {/* divider */}
      <div className="my-4 w-full border-t" />

      <h2 className="text-2xl font-bold">List with infinite scroll</h2>
      <p>Uses react-window to load more items. Uses useEffect for api call.</p>
      <p className="text-sm text-slate-400">
        No caching, makes repeated api calls.
      </p>
      <UserListInfiniteScroll />

      {/* divider */}
      <div className="my-4 w-full border-t" />

      <h2 className="text-2xl font-bold">Combobox with infinite scroll</h2>
      <p>
        Uses react-window to load more items. Uses Command component.Uses
        useEffect for api call.
      </p>
      <p className="text-sm text-slate-400">
        No searching, no caching, makes repeated api calls. Command component
        integration is not right, using arrow keys does not move the selected
        item as expected.
      </p>
      <UserComboboxInfiniteScroll />
    </div>
  );
}
