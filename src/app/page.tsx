import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { Showreel } from "@/components/Showreel";
import {
  books,
  built,
  capability,
  experience,
  films,
  formats,
  funnel,
  identity,
  languages,
  links,
  papers,
  reel,
  reels,
  stack,
  traction,
  type Credit,
} from "@/data/cv";

function CreditRow({ credit }: { credit: Credit }) {
  return (
    <div className="credit">
      <p className="credit__period">{credit.period}</p>
      <div>
        <h3 className="credit__role">{credit.role}</h3>
        <p className="credit__org">{credit.org}</p>
      </div>
      <ul className="credit__detail">
        {credit.detail.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        {/* HERO */}
        <section className="hero" id="top">
          <div className="wrap hero__grid">
            <div>
              <p className="eyebrow">
                {identity.location} · {identity.visa}
              </p>
              <h1 className="hero__name">{identity.name}</h1>
              <p className="hero__role">{identity.role}</p>
              <p className="hero__summary">{identity.summary}</p>
              <div className="hero__actions">
                <a
                  href={`mailto:${identity.email}?subject=${encodeURIComponent("CV request")}`}
                  className="btn"
                >
                  Request CV
                </a>
                <a href="#work" className="btn btn--ghost">
                  See the work
                </a>
              </div>
            </div>
            <div>
              <div className="hero__portrait">
                <Image
                  src="/melo-portrait.jpg"
                  alt={identity.name}
                  width={1024}
                  height={1008}
                  priority
                  sizes="(max-width: 60rem) 100vw, 40vw"
                />
              </div>
              <p className="hero__caption">Dubai, United Arab Emirates</p>
            </div>
          </div>
        </section>

        {/* THE WORK */}
        <section className="section section--alt" id="work">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">See it first</p>
              <h2 className="section__title">The work</h2>
            </div>

            <Showreel
              src={reel.video || undefined}
              poster={reel.image}
              href={reel.href}
              label={reel.label}
              title={reel.title}
              line={reel.line}
            />

            <div className="rack">
              {films.map((f) => (
                <a
                  key={f.club}
                  className="film"
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="film__frame">
                    {f.image ? (
                      <Image
                        src={f.image}
                        alt={f.club}
                        width={1600}
                        height={900}
                        sizes="(max-width: 40rem) 100vw, (max-width: 66rem) 50vw, 33vw"
                      />
                    ) : null}
                    <span className="film__format">{f.format}</span>
                    <span className="film__club">{f.club}</span>
                  </div>
                  <div className="film__body">
                    <p className="film__title">{f.title}</p>
                    <p className="film__blurb">{f.blurb}</p>
                    <p className="film__venue">{f.venue}</p>
                    <span className="film__cta">
                      View episode
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 11 11 3M11 3H4.5M11 3v6.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="formats">
              {formats.map((f) => (
                <div className="format" key={f.name}>
                  <p className="format__name">{f.name}</p>
                  <p className="format__detail">{f.detail}</p>
                </div>
              ))}
            </div>

            <h3 className="subhead subhead--spaced">On Instagram</h3>
            <p className="funnel">{funnel}</p>
            <div className="reels">
              {reels.map((r) => (
                <a
                  key={r.headline}
                  className="reelcard"
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="reelcard__when">{r.when}</p>
                  <p className="reelcard__views">{r.views}</p>
                  <p className="reelcard__unit">Views</p>
                  <p className="reelcard__headline">{r.headline}</p>
                  <p className="reelcard__note">{r.note}</p>
                  <ul className="reelcard__stats">
                    {r.stats.map((st) => (
                      <li key={st.label}>
                        <span>{st.label}</span>
                        <b>{st.value}</b>
                      </li>
                    ))}
                  </ul>
                  <span className="reelcard__cta">
                    View reel
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 11 11 3M11 3H4.5M11 3v6.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="traction" id="traction">
          <div className="wrap">
            <div className="traction__head">
              <p className="eyebrow eyebrow--light">The Reflective Football</p>
              <h2 className="traction__title">{traction.since}</h2>
              <p className="traction__note">{traction.window}</p>
            </div>
            <div className="traction__grid">
              {traction.metrics.map((m) => (
                <div className="metric" key={m.label}>
                  <p className="metric__value">{m.value}</p>
                  <p className="metric__label">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="markets">
              <span className="markets__label">Top markets</span>
              <span>{traction.markets}</span>
            </p>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">Credits</p>
              <h2 className="section__title">Experience</h2>
            </div>
            <div>
              {experience.map((c) => (
                <CreditRow key={c.role + c.org} credit={c} />
              ))}
            </div>
          </div>
        </section>

        {/* BUILT */}
        <section className="section section--alt" id="built">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">Products, platforms and games, all shipped</p>
              <h2 className="section__title">Built</h2>
            </div>
            <div className="builds">
              {built.map((b) => {
                const inner = (
                  <>
                    <p className="build__kind">{b.kind}</p>
                    <div>
                      <span className="build__title">{b.title}</span>
                    </div>
                    <div>
                      <p className="build__blurb">{b.blurb}</p>
                      <p className="build__stack">{b.stack}</p>
                    </div>
                  </>
                );
                return b.href ? (
                  <a
                    key={b.title}
                    className="build"
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="build" key={b.title}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPABILITY */}
        <section className="section" id="capability">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">Strategy, research, tools, languages</p>
              <h2 className="section__title">Capability</h2>
            </div>

            <div className="caps">
              {capability.map((c) => (
                <div className="cap" key={c.name}>
                  <h3 className="cap__name">{c.name}</h3>
                  <p className="cap__detail">{c.detail}</p>
                </div>
              ))}
            </div>

            <div className="split" style={{ marginTop: "3.5rem" }}>
              <div>
                <h3 className="subhead">Toolkit</h3>
                {stack.map((g) => (
                  <div className="stackgroup" key={g.group}>
                    <p className="stackgroup__name">{g.group}</p>
                    <ul className="chips">
                      {g.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="subhead">Languages</h3>
                <ul className="linelist">
                  {languages.map((l) => (
                    <li key={l.name}>
                      <span>{l.name}</span>
                      <span className="linelist__meta">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PUBLISHED */}
        <section className="section section--alt" id="published">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">In print and on record</p>
              <h2 className="section__title">Published</h2>
            </div>
            <div className="split">
              <div>
                <h3 className="subhead">Books</h3>
                <ul className="linelist">
                  {books.map((b) => (
                    <li key={b.title}>
                      <a href={b.href} target="_blank" rel="noopener noreferrer">
                        {b.title}
                      </a>
                      <span className="linelist__meta">{b.meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="subhead">Papers</h3>
                <ul className="linelist">
                  {papers.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} target="_blank" rel="noopener noreferrer">
                        {p.title}
                      </a>
                      <span className="linelist__meta">{p.meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <div className="wrap">
            <p className="eyebrow eyebrow--light">Get in touch</p>
            <h2 className="contact__title">Request CV</h2>
            <a href={`mailto:${identity.email}`} className="contact__mail">
              {identity.email}
            </a>
            <div className="contact__links">
              {links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot__inner">
          <span>© 2026 {identity.name}</span>
          <span>melodoumani.com</span>
        </div>
      </footer>
    </>
  );
}
