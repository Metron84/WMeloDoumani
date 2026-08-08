import { identity } from "@/data/cv";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#traction", label: "Numbers" },
  { href: "#experience", label: "Experience" },
  { href: "#built", label: "Built" },
  { href: "#capability", label: "Capability" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <a href="#top" className="header__mark">
          {identity.name}
        </a>
        <nav className="header__nav" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${identity.email}?subject=${encodeURIComponent("CV request")}`}
          className="btn header__cv"
        >
          Request CV
        </a>
      </div>
    </header>
  );
}
