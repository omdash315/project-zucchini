"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle, Clock, Crown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export type MunRegistration = {
  id: number;
  teamId: string | null;
  isTeamLeader: boolean;
  name: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE";
  studentType: "SCHOOL" | "COLLEGE";
  institute: string;
  city: string;
  state: string;
  committeeChoice:
    | "UNHRC"
    | "UNGA_DISEC"
    | "ECOSOC"
    | "AIPPM"
    | "IP_PHOTOGRAPHER"
    | "IP_JOURNALIST"
    | "UNSC_OVERNIGHT_CRISIS"
    | "AIPPM_OVERNIGHT_CRISIS"
    | "MOOT_COURT";
  isNitrStudent: boolean;
  isVerified: boolean;
  isPaymentVerified: boolean;
  registeredAt: string;
};

export const munColumns: ColumnDef<MunRegistration>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const isLeader = row.original.isTeamLeader;
      return (
        <div className="flex items-center gap-2">
          {isLeader && <Crown className="h-4 w-4 text-amber-400" />}
          <span className="font-medium text-zinc-100">{row.getValue("name")}</span>
        </div>
      );
    },
  },
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
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span className="tabular-nums text-zinc-300">{row.getValue("phone")}</span>,
  },
  {
    accessorKey: "committeeChoice",
    header: "Committee",
    cell: ({ row }) => {
      const committee = row.getValue("committeeChoice") as string;
      const isMootCourt = committee === "MOOT_COURT";
      const committeeLabels: Record<string, string> = {
        UNHRC: "UNHRC",
        UNGA_DISEC: "UNGA DISEC",
        ECOSOC: "ECOSOC",
        AIPPM: "AIPPM",
        IP_PHOTOGRAPHER: "IP - Photographer",
        IP_JOURNALIST: "IP - Journalist",
        UNSC_OVERNIGHT_CRISIS: "UNSC Crisis",
        AIPPM_OVERNIGHT_CRISIS: "AIPPM Crisis",
        MOOT_COURT: "Moot Court",
      };
      return (
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            isMootCourt ? "bg-purple-500/20 text-purple-400" : "bg-orange-500/20 text-orange-400"
          }`}
        >
          {committeeLabels[committee] || committee}
        </span>
      );
    },
  },
  {
    accessorKey: "studentType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("studentType") as string;
      return (
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            type === "COLLEGE" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
          }`}
        >
          {type}
        </span>
      );
    },
  },
  {
    accessorKey: "institute",
    header: "Institute",
    cell: ({ row }) => (
      <span className="text-zinc-400 max-w-[180px] truncate block">
        {row.getValue("institute")}
      </span>
    ),
  },
  {
    accessorKey: "teamId",
    header: "Team",
    cell: ({ row }) => {
      const teamId = row.getValue("teamId") as string | null;
      if (!teamId) return <span className="text-zinc-600">-</span>;
      return (
        <span className="text-xs font-mono bg-zinc-800 px-2 py-1 rounded text-zinc-400 flex items-center gap-1">
          <Users className="h-3 w-3" />
          {teamId.slice(0, 8)}
        </span>
      );
    },
  },
  {
    accessorKey: "isPaymentVerified",
    header: "Payment",
    cell: ({ row }) => {
      const isVerified = row.getValue("isPaymentVerified") as boolean;
      const isNitr = row.original.isNitrStudent;

      if (isNitr) {
        return (
          <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-700 text-zinc-300">
            N/A
          </span>
        );
      }

      return isVerified ? (
        <span className="text-xs font-medium px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Paid
        </span>
      ) : (
        <span className="text-xs font-medium px-2 py-1 rounded bg-amber-500/20 text-amber-400 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </span>
      );
    },
  },
  {
    accessorKey: "registeredAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-zinc-300 hover:text-white"
      >
        Registered
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("registeredAt"));
      return (
        <span className="text-zinc-400">
          {date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </span>
      );
    },
  },
];
