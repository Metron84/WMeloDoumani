"use client";

import type { CSSProperties, ReactNode } from "react";
import { experienceStages } from "@/data/cv";
import { useReveal } from "@/hooks/useReveal";

const LABEL_X = [90, 220, 350, 480, 605] as const;
const DELAYS = [".5s", ".68s", ".86s", "1.04s", "1.22s"] as const;
const FIGURE_TRANSFORMS = [
  "translate(90,200) rotate(-14) scale(.88)",
  "translate(220,200) rotate(-10) scale(.92)",
  "translate(350,200) rotate(-6) scale(.96)",
  "translate(480,200) rotate(-2) scale(1)",
  "translate(605,200) rotate(0) scale(1.06)",
] as const;
const MOBILE_TRANSFORMS = [
  "translate(28,100) rotate(-14) scale(.88)",
  "translate(28,100) rotate(-10) scale(.92)",
  "translate(28,100) rotate(-6) scale(.96)",
  "translate(28,100) rotate(-2) scale(1)",
  "translate(28,100) rotate(0) scale(1.06)",
] as const;

function Figure0() {
  return (
    <>
      <path d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z" fill="#0A111F" />
      <path d="M-15 -32 L-15 -70 Q0 -78 15 -70 L15 -32 Z" fill="#0A111F" />
      <path d="M-6 -71 L0 -60 L6 -71" fill="#F2EDE4" />
      <path
        d="M-14 -66 L-24 -48 M14 -66 L22 -54"
        stroke="#0A111F"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="0" cy="-88" r="10" fill="#F2EDE4" stroke="#0A111F" strokeWidth="2" />
      <path d="M-11 -92 Q0 -104 11 -92 L15 -90 L-13 -90 Z" fill="#0A111F" />
      <rect x="18" y="-68" width="13" height="17" rx="1" fill="#F2EDE4" stroke="#0A111F" strokeWidth="2" />
    </>
  );
}

function Figure1() {
  return (
    <>
      <path d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z" fill="#0A111F" />
      <ellipse cx="0" cy="-84" rx="16" ry="14" fill="#0A111F" />
      <path d="M-17 -32 L-17 -70 Q0 -79 17 -70 L17 -32 Z" fill="#0A111F" />
      <circle cx="0" cy="-86" r="10" fill="#F2EDE4" stroke="#0A111F" strokeWidth="2" />
      <path
        d="M-5 -70 L-4 -60 M5 -70 L4 -60"
        stroke="#F2EDE4"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M-9 -46 Q0 -42 9 -46" stroke="#F2EDE4" strokeWidth="1.5" fill="none" />
      <path
        d="M-15 -64 L-25 -48 M15 -64 L23 -54"
        stroke="#0A111F"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="19" y="-64" width="12" height="17" rx="2" fill="#F2EDE4" stroke="#0A111F" strokeWidth="2" />
    </>
  );
}

function Figure2() {
  return (
    <>
      <path d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z" fill="#0A111F" />
      <path d="M-16 -32 L-16 -71 Q0 -79 16 -71 L16 -32 Z" fill="#0A111F" />
      <path d="M-7 -73 L0 -54 L7 -73 Z" fill="#F2EDE4" />
      <path d="M-2 -66 L0 -52 L2 -66 Z" fill="#D8232A" />
      <path
        d="M-15 -65 L-25 -48 M15 -65 L24 -52"
        stroke="#0A111F"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="0" cy="-88" r="10" fill="#F2EDE4" stroke="#0A111F" strokeWidth="2" />
      <rect x="18" y="-52" width="20" height="14" rx="2" fill="#F2EDE4" stroke="#0A111F" strokeWidth="2" />
      <path d="M24 -52 L24 -56 L32 -56 L32 -52" stroke="#0A111F" strokeWidth="2" fill="none" />
    </>
  );
}

function Figure3() {
  return (
    <>
      <path d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z" fill="#0A111F" />
      <path d="M-16 -32 L-16 -71 Q0 -79 16 -71 L16 -32 Z" fill="#0A111F" />
      <path d="M-7 -73 L0 -54 L7 -73 Z" fill="#F2EDE4" />
      <path d="M-2 -66 L0 -52 L2 -66 Z" fill="#D8232A" />
      <path
        d="M-15 -65 L-25 -48 M15 -65 L26 -62"
        stroke="#0A111F"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="0" cy="-88" r="10" fill="#F2EDE4" stroke="#0A111F" strokeWidth="2" />
      <path
        d="M22 -58 L22 -66 M29 -58 L29 -72 M36 -58 L36 -80"
        stroke="#0A111F"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

function Figure4() {
  return (
    <>
      <path d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z" fill="#0A111F" />
      <path
        d="M-14 -32 L-14 -72 Q0 -80 14 -72 L14 -32 Z"
        fill="#F2EDE4"
        stroke="#0A111F"
        strokeWidth="2"
      />
      <path d="M-16 -32 L-16 -71 Q-8 -77 -5 -73 L-7 -32 Z" fill="#0A111F" />
      <path d="M16 -32 L16 -71 Q8 -77 5 -73 L7 -32 Z" fill="#0A111F" />
      <path
        d="M-15 -65 L-25 -50 M15 -66 L20 -80"
        stroke="#0A111F"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="0" cy="-90" r="10" fill="#F2EDE4" stroke="#0A111F" strokeWidth="2" />
      <rect x="14" y="-100" width="26" height="17" rx="2" fill="#D8232A" />
      <circle cx="27" cy="-91" r="5" fill="#F2EDE4" />
    </>
  );
}

const FIGURES: (() => ReactNode)[] = [Figure0, Figure1, Figure2, Figure3, Figure4];

function DesktopLabels() {
  return (
    <g className="march__labels" fontFamily="var(--display), Archivo, sans-serif">
      {experienceStages.map((stage, i) => {
        const x = LABEL_X[i];
        if (i === 0) {
          return (
            <g key={stage.year}>
              <text
                x={x}
                y={224}
                textAnchor="middle"
                fontSize="11"
                fill="#D8232A"
                letterSpacing="1.5"
              >
                {stage.year}
              </text>
              <text x={x} y={244} textAnchor="middle" fontSize="12" fill="#0A111F">
                Sports journalist
              </text>
              <text x={x} y={261} textAnchor="middle" fontSize="12" fill="#0A111F">
                and writer
              </text>
              {stage.note ? (
                <text
                  x={x}
                  y={280}
                  textAnchor="middle"
                  fontSize="11"
                  fill="rgba(10,17,31,.6)"
                >
                  {stage.note}
                </text>
              ) : null}
            </g>
          );
        }

        return (
          <g key={stage.year}>
            <text
              x={x}
              y={224}
              textAnchor="middle"
              fontSize="11"
              fill="#D8232A"
              letterSpacing="1.5"
            >
              {stage.year}
            </text>
            <text x={x} y={244} textAnchor="middle" fontSize="12" fill="#0A111F">
              {stage.org}
            </text>
            {stage.role ? (
              <text
                x={x}
                y={261}
                textAnchor="middle"
                fontSize="11"
                fill="rgba(10,17,31,.6)"
              >
                {stage.role}
              </text>
            ) : null}
            {stage.note ? (
              <text
                x={x}
                y={280}
                textAnchor="middle"
                fontSize="11"
                fill="rgba(10,17,31,.6)"
              >
                {stage.note}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

function DesktopMarch() {
  return (
    <svg
      className="march__desk-svg"
      width="100%"
      viewBox="0 0 680 302"
      role="img"
      aria-label="Twenty years of experience, five figures walking left to right"
    >
      <line
        className="gl"
        x1="40"
        y1="200"
        x2="640"
        y2="200"
        stroke="rgba(10,17,31,.35)"
        strokeWidth="1"
      />

      {FIGURES.map((Figure, i) => (
        <g
          key={experienceStages[i].year}
          className="fg"
          style={{ "--d": DELAYS[i] } as CSSProperties}
        >
          <g transform={FIGURE_TRANSFORMS[i]}>
            <Figure />
          </g>
        </g>
      ))}

      <DesktopLabels />
    </svg>
  );
}

function MobileMarch() {
  return (
    <ul className="march__rows">
      {experienceStages.map((stage, i) => {
        const Figure = FIGURES[i];
        return (
          <li
            key={stage.year}
            className="march__row"
            style={{ "--d": `${i * 90}ms` } as CSSProperties}
          >
            <svg
              className="march__row-fig"
              width="56"
              height="112"
              viewBox="0 0 56 112"
              aria-hidden="true"
            >
              <g transform={MOBILE_TRANSFORMS[i]}>
                <Figure />
              </g>
            </svg>
            <div className="march__row-copy">
              <p className="march__row-year">{stage.year}</p>
              {i === 0 ? (
                <>
                  <p className="march__row-org">Sports journalist</p>
                  <p className="march__row-org">and writer</p>
                </>
              ) : (
                <p className="march__row-org">{stage.org}</p>
              )}
              {stage.role ? <p className="march__row-role">{stage.role}</p> : null}
              {stage.note ? <p className="march__row-note">{stage.note}</p> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ExperienceMarch() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`march${visible ? " is-visible" : ""}`}>
      <div className="layoutMobile" aria-hidden="true">
        <MobileMarch />
      </div>
      <div className="layoutDesktop" aria-hidden="true">
        <DesktopMarch />
      </div>
    </div>
  );
}
