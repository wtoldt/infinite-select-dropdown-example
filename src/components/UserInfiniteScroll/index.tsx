import * as React from 'react';
import { type AbreviatedUser, type AbreviatedUserResponse } from '@/types';
import { InfiniteLoaderWrapper } from './InfiniteLoaderWrapper';
import { type FixedSizeListMeasurements, type RenderItem } from './types';

type UserDataSourceProps = {
  renderItem: RenderItem<AbreviatedUser>;
  fixedSizeListMeasurements: FixedSizeListMeasurements;
  pageSize?: number;
};

export function UserInfiniteScroll({
  renderItem,
  fixedSizeListMeasurements,
  pageSize = 10,
}: UserDataSourceProps) {
  const [totalUsers, setTotalUsers] = React.useState(1); // set to 1 so initial hasNextPage is true
  const [isNextPageLoading, setIsNextPageLoading] = React.useState(false);
  const [users, setUsers] = React.useState<AbreviatedUser[]>([]);

  const hasNextPage = React.useMemo(
    () => users.length < totalUsers,
    [users.length, totalUsers],
  );

  const loadNextPage = React.useCallback(
    async (startIndex: number) => {
      setIsNextPageLoading(true);
      const response = await fetch(
        `https://dummyjson.com/users/search?limit=${pageSize}&skip=${startIndex}&select=id,firstName,lastName`,
      );
      const data: AbreviatedUserResponse =
        (await response.json()) as AbreviatedUserResponse;
      if (data.total !== totalUsers) {
        setTotalUsers(data.total);
      }
      setUsers((currentUsers) => [...currentUsers, ...data.users]);
      setIsNextPageLoading(false);
    },
    [pageSize, totalUsers],
  );

  return (
    <InfiniteLoaderWrapper
      fixedSizeListMeasurements={fixedSizeListMeasurements}
      hasNextPage={hasNextPage}
      isNextPageLoading={isNextPageLoading}
      items={users}
      loadNextPage={loadNextPage}
      renderItem={renderItem}
    />
  );
}
