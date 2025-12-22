"use client";

import { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  Gavel,
  Crown,
  ChevronDown,
  ChevronRight,
  User,
} from "lucide-react";
import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table/data-table";
import { munColumns, MunRegistration } from "@/components/ui/data-table/mun-columns";

type Stats = {
  total: number;
  male: number;
  female: number;
  verified: number;
  pending: number;
  teams: number;
};

type TeamMember = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  institute: string;
  city: string;
  state: string;
  isTeamLeader: boolean;
  studentType: string;
  committeeChoice: string;
  isNitrStudent: boolean;
  registeredAt: string;
};

type Team = {
  teamId: string;
  committeeChoice: string;
  studentType: string;
  isPaymentVerified: boolean;
  paymentAmount: number;
  members: TeamMember[];
};

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function TeamCard({
  team,
  isExpanded,
  onToggle,
}: {
  team: Team;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const leader = team.members.find((m) => m.isTeamLeader);
  const allNitrStudents = team.members.every((m) => m.isNitrStudent);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-zinc-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-zinc-400" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{leader?.name || "Team"}</span>
              <span className="text-xs font-mono bg-zinc-800 px-2 py-1 rounded text-zinc-400">
                {team.teamId.slice(0, 8)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                Moot Court
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  team.studentType === "COLLEGE"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {team.studentType}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">{team.members.length} members</span>
          {allNitrStudents ? (
            <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-700 text-zinc-300">
              N/A
            </span>
          ) : team.isPaymentVerified ? (
            <span className="text-xs font-medium px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Paid
            </span>
          ) : (
            <span className="text-xs font-medium px-2 py-1 rounded bg-amber-500/20 text-amber-400 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Pending
            </span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-zinc-800 divide-y divide-zinc-800">
          {team.members.map((member) => (
            <div key={member.id} className="p-4 bg-zinc-950/50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {member.isTeamLeader && <Crown className="h-4 w-4 text-amber-400" />}
                    <span className="font-medium text-zinc-100">{member.name}</span>
                    {member.isTeamLeader && (
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">
                        Leader
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">{member.email}</p>
                  <p className="text-sm text-zinc-500">{member.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">{member.institute}</p>
                  <p className="text-sm text-zinc-500">
                    {member.city}, {member.state}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function IndividualCard({ member }: { member: TeamMember }) {
  const committeeLabels: Record<string, string> = {
    UNHRC: "UNHRC",
    UNGA_DISEC: "UNGA DISEC",
    ECOSOC: "ECOSOC",
    AIPPM: "AIPPM",
    IP_PHOTOGRAPHER: "IP - Photo",
    IP_JOURNALIST: "IP - Journal",
    UNSC_OVERNIGHT_CRISIS: "UNSC Crisis",
    AIPPM_OVERNIGHT_CRISIS: "AIPPM Crisis",
  };
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-full p-2 bg-orange-500/20 text-orange-400">
            <User className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{member.name}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">
                {committeeLabels[member.committeeChoice] || member.committeeChoice}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  member.studentType === "COLLEGE"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {member.studentType}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">{member.email}</p>
            <p className="text-sm text-zinc-500">{member.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-400">{member.institute}</p>
          <p className="text-sm text-zinc-500">
            {member.city}, {member.state}
          </p>
          {member.isNitrStudent ? (
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-700 text-zinc-300 inline-block mt-2">
              NITR - N/A
            </span>
          ) : (
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 inline-block mt-2">
              Payment Required
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MunPage() {
  const [data, setData] = useState<MunRegistration[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [individuals, setIndividuals] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch team data
        const teamRes = await fetch("/api/registrations/mun?stats=true&groupByTeam=true");
        const teamJson = await teamRes.json();
        if (teamJson.success) {
          // Filter only Moot Court teams (teams with actual teamId)
          const mootCourtTeams = teamJson.data.teams.filter(
            (t: Team) => t.teamId && t.committeeChoice === "MOOT_COURT"
          );
          setTeams(mootCourtTeams);
          setStats(teamJson.data.stats);
        }

        // Fetch all registrations to get individuals
        const allRes = await fetch("/api/registrations/mun?stats=true&pageSize=1000");
        const allJson = await allRes.json();
        if (allJson.success) {
          // Filter Overnight Crisis individuals (no teamId or null)
          const crisisIndividuals = allJson.data.registrations.filter(
            (r: any) => !r.teamId || r.committeeChoice !== "MOOT_COURT"
          );
          setIndividuals(crisisIndividuals);
          setData(allJson.data.registrations);
        }
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleTeam = (teamId: string) => {
    setExpandedTeams((prev) => {
      const next = new Set(prev);
      if (next.has(teamId)) {
        next.delete(teamId);
      } else {
        next.add(teamId);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        title="MUN Registrations"
        subtitle={
          stats
            ? `Total: ${stats.total} | Teams: ${teams.length} | Individuals: ${individuals.length}`
            : undefined
        }
        Icon={Gavel}
      />

      <main className="mx-auto px-6 py-8">
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Participants"
              value={stats.total}
              icon={Users}
              color="bg-blue-500/20 text-blue-400"
            />
            <StatCard
              title="Moot Court Teams"
              value={teams.length}
              icon={Users}
              color="bg-purple-500/20 text-purple-400"
            />
            <StatCard
              title="Solo Registrations"
              value={individuals.length}
              icon={User}
              color="bg-orange-500/20 text-orange-400"
            />
            <StatCard
              title="Payment Pending"
              value={stats.pending}
              icon={Clock}
              color="bg-amber-500/20 text-amber-400"
            />
          </div>
        )}

        {/* Moot Court Teams Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            Moot Court Teams
          </h2>
          <div className="space-y-4">
            {teams.map((team) => (
              <TeamCard
                key={team.teamId}
                team={team}
                isExpanded={expandedTeams.has(team.teamId)}
                onToggle={() => toggleTeam(team.teamId)}
              />
            ))}
            {teams.length === 0 && (
              <div className="text-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                No Moot Court teams registered yet.
              </div>
            )}
          </div>
        </div>

        {/* Solo Registrations Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            Solo Registrations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {individuals.map((member) => (
              <IndividualCard key={member.id} member={member} />
            ))}
            {individuals.length === 0 && (
              <div className="text-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-xl col-span-2">
                No solo registrations yet.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
