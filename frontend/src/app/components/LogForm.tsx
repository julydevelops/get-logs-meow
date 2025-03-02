"use client";

import { useState } from "react";

interface LogFormProps {
  setLogs: (value: string[]) => void;
}

export default function LogForm({ setLogs }: LogFormProps) {
  const [filename, setFilename] = useState("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState("10");

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/logs?${new URLSearchParams({ filename, search, limit })}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setLogs(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
        <h1 className="text-xl font-semibold mb-4">Log Retrieval</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="filename"
              className="block text-sm font-medium text-gray-700"
            >
              Filename
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300
                         px-3 py-2 outline-none focus:border-indigo-500
                         focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. syslog"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Search Value
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300
                         px-3 py-2 outline-none focus:border-indigo-500
                         focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. error"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="limit"
              className="block text-sm font-medium text-gray-700"
            >
              Limit (Number of lines)
            </label>
            <input
              type="number"
              min="1"
              className="mt-1 block w-full rounded-md border border-gray-300
                         px-3 py-2 outline-none focus:border-indigo-500
                         focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. 20"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md
                       hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Retrieve Logs
          </button>
        </form>
      </div>
    </div>
  );
}
