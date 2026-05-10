import Link from "next/link";
import { MastheadPrinciplesAnim } from "./MastheadPrinciplesAnim";

export function PortfolioMasthead() {
  return (
    <div className="masthead">
      <p className="masthead-date">
        New York · London · Dubai · Rabat · Beirut · Riyadh · Geneva · Brighton
      </p>
      <h1 className="masthead-title">W. Melo Doumani</h1>
      <p className="masthead-tagline masthead-principles" id="masthead-principles">
        <span className="masthead-principles__frame">
          <span className="masthead-principles__viewport">
            <span className="masthead-principles__cycle" aria-hidden="true">
              <span className="masthead-principles__slide">
                <span className="masthead-principles__row-grid">
                  <span className="masthead-principles__l">Accuracy</span>
                  <span className="masthead-principles__over">Over</span>
                  <span className="masthead-principles__r">Politeness</span>
                </span>
              </span>
              <span className="masthead-principles__slide">
                <span className="masthead-principles__row-grid">
                  <span className="masthead-principles__l">Character</span>
                  <span className="masthead-principles__over">Over</span>
                  <span className="masthead-principles__r">Material</span>
                </span>
              </span>
              <span className="masthead-principles__slide">
                <span className="masthead-principles__row-grid">
                  <span className="masthead-principles__l">Truth</span>
                  <span className="masthead-principles__over">Over</span>
                  <span className="masthead-principles__r">Survival</span>
                </span>
              </span>
            </span>
            <span className="masthead-principles__final">
              <span className="masthead-principles__word">Accuracy.</span>
              <span className="masthead-principles__word">Character.</span>
              <span className="masthead-principles__word">Truth.</span>
            </span>
          </span>
        </span>
      </p>
      <MastheadPrinciplesAnim />
      <div className="masthead-toggle">
        <div className="masthead-toggle__row">
          <Link href="/writing" className="masthead-toggle__ufm">
            The Reflective
          </Link>
          <Link href="/play" className="masthead-toggle__ufm">
            UFM (Football Fantasy Game)
          </Link>
        </div>
      </div>
      <nav className="masthead-nav" aria-label="On this page">
        <Link href="/writing">Writer</Link>
        <Link href="/about">About</Link>
        <a href="#builder">Builder</a>
        <a href="#strategist">Strategist</a>
        <a href="#screenplays">Screenplays</a>
        <a href="#tools">Tools</a>
        <a href="#philosophy">Philosophy</a>
        <a
          href="https://x.com/wmelodoumani"
          target="_blank"
          rel="noopener noreferrer"
        >
          𝕏
        </a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  );
}
