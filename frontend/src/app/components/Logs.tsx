import React from "react";

interface LogViewerProps {
  lines: string[];
  setLogs: (value: string[] | null) => void;
}

export default function Logs({ lines, setLogs }: LogViewerProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full bg-white rounded shadow p-4">
        <h1 className="text-xl font-semibold mb-4">Log Output</h1>
        <div className="bg-gray-800 text-gray-100 rounded-md p-4">
          {lines.map((line, idx) => (
            <div key={idx} className="font-mono text-sm leading-tight">
              {line}
            </div>
          ))}
        </div>
        <button
          onClick={() => setLogs(null)}
          className="block mx-auto bg-indigo-600 hover:bg-indigo-700 text-white 
                     font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 
                     focus:ring-indigo-500 focus:ring-offset-2"
        >
          Search Again
        </button>
      </div>
    </div>
  );
}
