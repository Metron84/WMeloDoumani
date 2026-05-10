import { SiteHeader } from "@/components/SiteHeader";
import { MarketingBodyClass } from "@/components/MarketingBodyClass";
import "@/styles/portfolio-legacy.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="marketing-shell">
      <MarketingBodyClass />
      <SiteHeader />
      <div className="marketing-shell__main">{children}</div>
    </div>
  );
}
