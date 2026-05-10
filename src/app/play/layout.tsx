import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Settings,
  Swords,
  MessageCircle,
  ArrowRightLeft,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NotificationBell from "@/components/NotificationBell";
import ThemeToggle from "@/components/ThemeToggle";

export default async function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const leagueId = session?.user ? (session.user as { leagueId?: string | null }).leagueId : null;

  const leagueBase = leagueId ? `/play/league/${leagueId}` : null;

  return (
    <div className="layout-container">
      {session && (
        <aside className="sidebar">
          <div className="sidebar-title">UFM</div>
          <nav style={{ flex: 1 }}>
            <ul className="nav-menu">
              <li>
                <Link href="/play" className="nav-item">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href={leagueBase ? `${leagueBase}/draft` : "/play"}
                  className="nav-item"
                >
                  <Users size={18} />
                  <span>Draft Room</span>
                </Link>
              </li>
              <li>
                <Link
                  href={leagueBase ? `${leagueBase}/standings` : "/play"}
                  className="nav-item"
                >
                  <Trophy size={18} />
                  <span>Standings</span>
                </Link>
              </li>
              <li>
                <Link
                  href={leagueBase ? `${leagueBase}/matchup` : "/play"}
                  className="nav-item"
                >
                  <Swords size={18} />
                  <span>Matchup</span>
                </Link>
              </li>
              <li>
                <Link
                  href={leagueBase ? `${leagueBase}/trade-block` : "/play"}
                  className="nav-item"
                >
                  <ArrowRightLeft size={18} />
                  <span>Transfer Market</span>
                </Link>
              </li>
              <li>
                <Link
                  href={leagueBase ? `${leagueBase}/messages` : "/play"}
                  className="nav-item"
                >
                  <MessageCircle size={18} />
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link href="/play/admin" className="nav-item">
                  <Settings size={18} />
                  <span>Admin</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--sidebar-border)",
              marginTop: "1rem",
            }}
          >
            <Link href="/" className="nav-item text-xs opacity-80">
              ← Site home
            </Link>
            <NotificationBell />
            <ThemeToggle />
          </div>
        </aside>
      )}
      <main className="main-content">{children}</main>
    </div>
  );
}
