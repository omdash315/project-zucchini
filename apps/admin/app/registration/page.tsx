"use client";

import * as React from "react";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

import { ShieldCheck, Users } from "lucide-react";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "1",
      name: "Shuvam Satapathi",
      email: "shuvam@gmail.com",
      phone: "9876543210",
      college: "NIT Rourkela",
      registeredAt: "2024-10-12",
      status: "success",
      amount: 499,
    },
    {
      id: "2",
      name: "Aman Verma",
      email: "aman.verma@gmail.com",
      phone: "9123456780",
      college: "IIT Bhubaneswar",
      registeredAt: "2024-10-13",
      status: "processing",
      amount: 399,
    },
    {
      id: "3",
      name: "Riya Sharma",
      email: "riya.sharma@gmail.com",
      phone: "9988776655",
      college: "NIT Trichy",
      registeredAt: "2024-10-14",
      status: "failed",
      amount: 499,
    },
    {
      id: "4",
      name: "Kunal Das",
      email: "kunal.das@gmail.com",
      phone: "9090909090",
      college: "JU Kolkata",
      registeredAt: "2024-10-15",
      status: "pending",
      amount: 299,
    },
  ];
}

/* ================= PAGE ================= */

export default function DemoPage() {
  const [data, setData] = React.useState<Payment[]>([]);

  React.useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-red-500" />
            <h1 className="text-2xl font-semibold tracking-tight">Admin Dashboard</h1>
          </div>

          <p className="mt-1 text-sm text-zinc-400">
            Manage registrations, payments, and admin notes
          </p>
        </div>
      </header>

      {/* ===== CONTENT ===== */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Section Header */}
        <div className="mb-6 flex items-center gap-2">
          <Users className="h-5 w-5 text-zinc-400" />
          <h2 className="text-lg font-medium">Registration Records</h2>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={data} />
      </main>
    </div>
  );
}
