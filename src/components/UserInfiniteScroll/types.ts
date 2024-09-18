export type FixedSizeListMeasurements = {
  height: number | string;
  width: number | string;
  itemSize: number;
};

export type RenderItem<T> = (
  item: T,
  index: number,
  style: React.CSSProperties,
  isItemLoaded: (index: number) => boolean,
) => React.ReactNode;

export type InfiniteLoaderWrapperProps<T> = {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: T[];
  loadNextPage: (startIndex: number, stopIndex: number) => void;
  renderItem: RenderItem<T>;
  fixedSizeListMeasurements: FixedSizeListMeasurements;
};
