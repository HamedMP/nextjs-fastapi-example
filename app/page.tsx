"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [fastApiData, setFastApiData] = useState(null);
  const [nextJsData, setNextJsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call FastAPI endpoint (will use Next.js rewrites)
        const fastApiResponse = await fetch("/api/py/helloFastApi");
        if (!fastApiResponse.ok) throw new Error("FastAPI request failed");
        const fastApiResult = await fastApiResponse.json();
        setFastApiData(fastApiResult);

        // Call Next.js API route
        const nextJsResponse = await fetch("/api/helloNextJs");
        if (!nextJsResponse.ok) throw new Error("Next.js API request failed");
        const nextJsResult = await nextJsResponse.json();
        setNextJsData(nextJsResult);
      } catch (err: unknown) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hello World</h1>
      {fastApiData && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Response from FastAPI:</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(fastApiData, null, 2)}
          </pre>
        </div>
      )}
      {nextJsData && (
        <div>
          <h2 className="text-xl font-semibold">Response from Next.js API:</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(nextJsData, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
