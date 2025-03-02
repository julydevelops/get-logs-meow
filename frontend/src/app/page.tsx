"use client";

import { useState } from "react";
import LogForm from "./components/LogForm";
import Logs from "./components/Logs";

export default function Home() {
  const [logs, setLogs] = useState<string[] | null>(null);

  return <>{!logs ? <LogForm setLogs={setLogs} /> : <Logs lines={logs} setLogs={setLogs}/>}</>;
}
