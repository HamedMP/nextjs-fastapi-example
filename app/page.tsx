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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen p-4 text-red-600 font-medium">
        Error: {error}
      </div>
    );

  return (
    <main className="m-10 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 border-b pb-3">
          Next.js + FastAPI Integration
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fastApiData && (
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">
                FastAPI Response
              </h2>
              <pre className="bg-slate-50 p-4 rounded-md overflow-auto border border-slate-200 text-sm">
                {JSON.stringify(fastApiData, null, 2)}
              </pre>
            </div>
          )}
          {nextJsData && (
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-3 text-emerald-600">
                Next.js API Response
              </h2>
              <pre className="bg-slate-50 p-4 rounded-md overflow-auto border border-slate-200 text-sm">
                {JSON.stringify(nextJsData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
