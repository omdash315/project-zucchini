"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";

/* ================= DATA TYPE ================= */

export type Payment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  registeredAt: string;
  status: "pending" | "processing" | "success" | "failed";
  amount: number;
};

/* ================= COLUMNS ================= */

export const columns: ColumnDef<Payment>[] = [
  /* ---------- SELECT ---------- */
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  /* ---------- NAME ---------- */
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium text-zinc-100">{row.getValue("name")}</span>,
  },

  /* ---------- EMAIL ---------- */
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-zinc-300 hover:text-white"
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span className="lowercase text-zinc-300">{row.getValue("email")}</span>,
  },

  /* ---------- PHONE ---------- */
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span className="tabular-nums text-zinc-300">{row.getValue("phone")}</span>,
  },

  /* ---------- COLLEGE ---------- */
  {
    accessorKey: "college",
    header: "College",
    cell: ({ row }) => <span className="text-zinc-400">{row.getValue("college")}</span>,
  },

  /* ---------- REGISTERED DATE ---------- */
  {
    accessorKey: "registeredAt",
    header: "Registered",
    cell: ({ row }) => {
      const date = new Date(row.getValue("registeredAt"));
      return <span className="text-zinc-400">{date.toLocaleDateString()}</span>;
    },
  },

  /* ---------- STATUS ---------- */
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const color =
        status === "success"
          ? "text-emerald-400"
          : status === "failed"
            ? "text-red-400"
            : status === "processing"
              ? "text-amber-400"
              : "text-zinc-400";

      return <span className={`capitalize font-medium ${color}`}>{status}</span>;
    },
  },

  /* ---------- AMOUNT ---------- */
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-semibold text-zinc-100">
        ₹{Number(row.getValue("amount"))}
      </div>
    ),
  },

  /* ---------- NOTE (ADMIN ONLY, CLIENT STATE) ---------- */
  {
    id: "note",
    header: "Note",
    enableHiding: false,
    cell: ({ row }) => {
      const [note, setNote] = React.useState("");

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="
                h-8 w-8 p-0
                text-zinc-400
                hover:text-white
              "
            >
              <FileText className="h-4 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent
            className="
              bg-zinc-900
              border-zinc-800
              text-white
            "
          >
            <DialogHeader>
              <DialogTitle>Admin Note — {row.original.name}</DialogTitle>
            </DialogHeader>

            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write a private admin note..."
              className="
                min-h-[120px]
                bg-zinc-950
                border-zinc-800
                text-white
                placeholder:text-zinc-500
                focus-visible:ring-zinc-700
              "
            />
          </DialogContent>
        </Dialog>
      );
    },
  },

  /* ---------- ACTIONS ---------- */
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-white">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Copy ID</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
