import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/play", label: "Play" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo">
          W. Melo Doumani
        </Link>
        <nav className="site-header__nav" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="site-header__link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
