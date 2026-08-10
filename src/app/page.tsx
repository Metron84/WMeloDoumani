import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { Showreel } from "@/components/Showreel";
import { ChannelPanels } from "@/components/ChannelPanels";
import { ExperienceMarch } from "@/components/ExperienceMarch";
import { BuiltTerminal } from "@/components/BuiltTerminal";
import { CapabilityBlueprint } from "@/components/CapabilityBlueprint";
import { PublishedBook } from "@/components/PublishedBook";
import {
  identity,
  links,
  reel,
} from "@/data/cv";

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

            <ChannelPanels />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">Credits</p>
              <h2 className="section__title">Experience</h2>
            </div>
            <ExperienceMarch />
          </div>
        </section>

        {/* BUILT */}
        <section className="section section--alt" id="built">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">Products, platforms and games, all shipped</p>
              <h2 className="section__title">Built</h2>
            </div>
            <BuiltTerminal />
          </div>
        </section>

        {/* CAPABILITY */}
        <section className="section blueprint-band" id="capability">
          <div className="wrap">
            <div className="section__head section__head--on-ink">
              <p className="eyebrow eyebrow--light">Strategy, research, tools, languages</p>
              <h2 className="section__title">Capability</h2>
            </div>
            <CapabilityBlueprint />
          </div>
        </section>

        {/* PUBLISHED */}
        <section className="section" id="published">
          <div className="wrap">
            <div className="section__head">
              <p className="eyebrow">In print and on record</p>
              <h2 className="section__title">Published</h2>
            </div>
            <PublishedBook />
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
