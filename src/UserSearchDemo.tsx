import * as React from 'react';
import { type ResponseMetadata, type User } from './types';

type AbreviatedUserResponse = {
  users: Pick<User, 'id' | 'firstName' | 'lastName'>[];
} & ResponseMetadata;

export default function UserSearchDemo() {
  const [result, setResult] = React.useState<AbreviatedUserResponse | null>(
    null,
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get('search') as string;
    const res = await fetch(
      `https://dummyjson.com/users/search?q=${search}&limit=10&select=id,firstName,lastName`,
    );
    const data: AbreviatedUserResponse =
      (await res.json()) as AbreviatedUserResponse;
    console.log(data);
    setResult(data);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" autoComplete="off" />
        <button type="submit">Search</button>
      </form>
      <hr />
      {result && (
        <pre className="ml-6 w-10/12 whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
