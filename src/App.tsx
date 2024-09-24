import { UserCombobox } from './UserCombobox';
import { UserComboboxInfiniteScroll } from './UserComboboxInfiniteScroll';
import { UserListInfiniteScroll } from './UserListInfiniteScroll';

export default function App() {
  // const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
  //   const { currentTarget, target } = e;
  //   console.log('window keydown', { currentTarget, target }, e);
  // }, []);
  // React.useEffect(() => {
  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => document.removeEventListener('keydown', handleKeyDown);
  // }, [handleKeyDown]);

  // const handleFocusChange = React.useCallback((e: FocusEvent) => {
  //   const { currentTarget, target } = e;
  //   console.log('focus changed', { currentTarget, target }, e);
  // }, []);
  // React.useEffect(() => {
  //   document.addEventListener('focusin', handleFocusChange);
  //   return () => document.removeEventListener('focusin', handleFocusChange);
  // }, [handleFocusChange]);

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
        No caching, makes repeated api calls. Does not support focus or arrow
        up/down.
      </p>
      <UserListInfiniteScroll />

      {/* divider */}
      <div className="my-4 w-full border-t" />

      <h2 className="text-2xl font-bold">Combobox with infinite scroll</h2>
      <p>
        Uses react-window to load more items. Uses Command component. Uses
        useEffect for api call.
      </p>
      <p className="text-sm text-slate-400">
        No searching, no caching, makes repeated api calls. Manually moves the
        focus into the list when popper opens. Command manages focus and arrow
        up/down via keydown event listener in Command Root.
      </p>
      <UserComboboxInfiniteScroll />
    </div>
  );
}
