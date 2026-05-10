import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-shell">
      <SiteHeader />
      <div className="marketing-shell__main">{children}</div>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <p className="site-footer__muted">
            Ultimate Fantasy Manager ·{" "}
            <Link href="/play">Enter the game</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
