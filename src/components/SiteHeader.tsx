import { identity } from "@/data/cv";

const nav = [
  { href: "#work", label: "Work" },
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
        <details className="menu">
          <summary className="menu__toggle" aria-label="Sections menu">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </summary>
          <nav className="menu__panel" aria-label="Sections">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="menu__link">
                {item.label}
              </a>
            ))}
          </nav>
        </details>
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
