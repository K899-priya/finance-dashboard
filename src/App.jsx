import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      <Navbar page={page} setPage={setPage} />

      {page === "dashboard" ? <Dashboard /> : <Transactions />}
    </>
  );
}