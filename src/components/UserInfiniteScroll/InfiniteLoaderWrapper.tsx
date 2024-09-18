import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { type InfiniteLoaderWrapperProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function InfiniteLoaderWrapper<T>({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  renderItem,
  fixedSizeListMeasurements,
}: InfiniteLoaderWrapperProps<T>) {
  // const listRef = React.useRef<FixedSizeList | null>(null);

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? noop : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          {...fixedSizeListMeasurements}
          itemCount={itemCount}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {({ index, style }) =>
            renderItem(items[index], index, style, isItemLoaded)
          }
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}
