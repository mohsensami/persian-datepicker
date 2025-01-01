import React from "react";
import useFetch from "../hooks/useFetch";

interface Post {
  id: number;
  title: string;
  body: string;
}

const FetchPage: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useFetch<Post[]>(
    {
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
    },
    {
      enabled: true, // Auto-fetch on mount
      staleTime: 60000, // Mark as stale after 1 minute
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={refetch}>Refetch</button>
      {data &&
        data.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default FetchPage;
