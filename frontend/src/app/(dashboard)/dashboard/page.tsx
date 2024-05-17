"use client";

import { gql, useQuery } from "@apollo/client";

const GET_HELLO_WORLD = gql`
  query HelloWorld {
    root
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_HELLO_WORLD);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Hello World!
      </h1>
      {data && data.root && (
        <p className="text-center text-gray-600 mt-4">
          The query result (if any) will be displayed here: {data.root}
        </p>
      )}
    </div>
  );
};

export default Dashboard;
