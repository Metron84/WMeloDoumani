"use client";

import type { CSSProperties } from "react";
import { experienceStages } from "@/data/cv";
import { useReveal } from "@/hooks/useReveal";

const DELAYS = [".5s", ".68s", ".86s", "1.04s", "1.22s"] as const;

const FIGURE_TRANSFORMS = [
  "rotate(-14) scale(.88)",
  "rotate(-10) scale(.92)",
  "rotate(-6) scale(.96)",
  "rotate(-2) scale(1)",
  "rotate(0) scale(1.06)",
] as const;

type FigureIndex = 0 | 1 | 2 | 3 | 4;

function FigureBody({ index }: { index: FigureIndex }) {
  switch (index) {
    case 0:
      return (
        <>
          <path
            d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z"
            fill="#0A111F"
          />
          <path d="M-15 -32 L-15 -70 Q0 -78 15 -70 L15 -32 Z" fill="#0A111F" />
          <path d="M-6 -71 L0 -60 L6 -71" fill="#F2EDE4" />
          <path
            d="M-14 -66 L-24 -48 M14 -66 L22 -54"
            stroke="#0A111F"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <circle
            cx="0"
            cy="-88"
            r="10"
            fill="#F2EDE4"
            stroke="#0A111F"
            strokeWidth="2"
          />
          <path d="M-11 -95 Q0 -107 11 -95 L16 -93 L-13 -93 Z" fill="#0A111F" />
          <rect
            x="18"
            y="-68"
            width="13"
            height="17"
            rx="1"
            fill="#F2EDE4"
            stroke="#0A111F"
            strokeWidth="2"
          />
        </>
      );
    case 1:
      return (
        <>
          <path
            d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z"
            fill="#0A111F"
          />
          <ellipse cx="0" cy="-84" rx="16" ry="14" fill="#0A111F" />
          <path d="M-17 -32 L-17 -70 Q0 -79 17 -70 L17 -32 Z" fill="#0A111F" />
          <circle
            cx="0"
            cy="-86"
            r="10"
            fill="#F2EDE4"
            stroke="#0A111F"
            strokeWidth="2"
          />
          <path
            d="M-5 -70 L-4 -60 M5 -70 L4 -60"
            stroke="#F2EDE4"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M-9 -46 Q0 -42 9 -46"
            stroke="#F2EDE4"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M-15 -64 L-25 -48 M15 -64 L23 -54"
            stroke="#0A111F"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="19"
            y="-64"
            width="12"
            height="17"
            rx="2"
            fill="#F2EDE4"
            stroke="#0A111F"
            strokeWidth="2"
          />
        </>
      );
    case 2:
      return (
        <>
          <path
            d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z"
            fill="#0A111F"
          />
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
          <circle
            cx="0"
            cy="-88"
            r="10"
            fill="#F2EDE4"
            stroke="#0A111F"
            strokeWidth="2"
          />
          <rect
            x="18"
            y="-52"
            width="20"
            height="14"
            rx="2"
            fill="#F2EDE4"
            stroke="#0A111F"
            strokeWidth="2"
          />
          <path
            d="M24 -52 L24 -56 L32 -56 L32 -52"
            stroke="#0A111F"
            strokeWidth="2"
            fill="none"
          />
        </>
      );
    case 3:
      return (
        <>
          <path
            d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z"
            fill="#0A111F"
          />
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
          <circle
            cx="0"
            cy="-88"
            r="10"
            fill="#F2EDE4"
            stroke="#0A111F"
            strokeWidth="2"
          />
          <path
            d="M22 -58 L22 -66 M29 -58 L29 -72 M36 -58 L36 -80"
            stroke="#0A111F"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    case 4:
      return (
        <>
          <path
            d="M-13 0 L-13 -34 L13 -34 L13 0 L4 0 L4 -26 L-4 -26 L-4 0 Z"
            fill="#0A111F"
          />
          <path
            d="M-14 -32 L-14 -72 Q0 -80 14 -72 L14 -32 Z"
            fill="#F2EDE4"
            stroke="#0A111F"
            strokeWidth="2"
          />
          <path d="M-16 -32 L-16 -71 Q-8 -77 -5 -73 L-7 -32 Z" fill="#0A111F" />
          <path d="M16 -32 L16 -71 Q8 -77 5 -73 L7 -32 Z" fill="#0A111F" />
          <path
            d="M-15 -65 L-25 -50 M15 -66 L24 -54"
            stroke="#0A111F"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M12 -74 L2 -58"
            stroke="#0A111F"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="0"
            cy="-90"
            r="10"
            fill="#F2EDE4"
            stroke="#0A111F"
            strokeWidth="2"
          />
          <rect x="11" y="-89" width="24" height="15" rx="2" fill="#D8232A" />
          <circle cx="23" cy="-81" r="4.5" fill="#F2EDE4" />
        </>
      );
  }
}

function Figure({ index }: { index: FigureIndex }) {
  return (
    <svg
      viewBox="-34 -114 80 122"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <g transform={FIGURE_TRANSFORMS[index]}>
        <FigureBody index={index} />
      </g>
    </svg>
  );
}

function StageLabel({
  stage,
  variant,
}: {
  stage: (typeof experienceStages)[number];
  variant: "desk" | "row";
}) {
  const yearClass = variant === "desk" ? "march__desk-year" : "march__row-year";
  const orgClass = variant === "desk" ? "march__desk-org" : "march__row-org";
  const roleClass = variant === "desk" ? "march__desk-role" : "march__row-role";
  const noteClass = variant === "desk" ? "march__desk-note" : "march__row-note";

  return (
    <>
      <p className={yearClass}>{stage.year}</p>
      <p className={orgClass}>{stage.org}</p>
      {variant === "desk" ? (
        <>
          <p className={roleClass}>{stage.role || "\u00a0"}</p>
          <p className={noteClass}>{stage.note || "\u00a0"}</p>
        </>
      ) : (
        <>
          {stage.role ? <p className={roleClass}>{stage.role}</p> : null}
          {stage.note ? <p className={noteClass}>{stage.note}</p> : null}
        </>
      )}
    </>
  );
}

function DesktopMarch() {
  return (
    <div
      className="march__desk"
      role="img"
      aria-label="Twenty years of experience, five figures walking left to right"
    >
      <div className="march__desk-figures">
        {experienceStages.map((stage, i) => (
          <div
            key={stage.year}
            className="fg march__desk-fig-wrap"
            style={{ "--d": DELAYS[i] } as CSSProperties}
          >
            <div className="march__desk-fig">
              <Figure index={i as FigureIndex} />
            </div>
          </div>
        ))}
      </div>

      <svg
        className="march__ground"
        viewBox="0 0 1000 2"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          className="gl"
          pathLength={100}
          x1="0"
          y1="1"
          x2="1000"
          y2="1"
          stroke="rgba(10,17,31,.35)"
          strokeWidth="1"
        />
      </svg>

      <div className="march__desk-labels">
        {experienceStages.map((stage) => (
          <div key={stage.year} className="march__desk-label">
            <StageLabel stage={stage} variant="desk" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMarch() {
  return (
    <ul className="march__rows">
      {experienceStages.map((stage, i) => (
        <li
          key={stage.year}
          className="march__row"
          style={{ "--d": `${i * 90}ms` } as CSSProperties}
        >
          <div className="march__row-fig">
            <Figure index={i as FigureIndex} />
          </div>
          <div className="march__row-copy">
            <StageLabel stage={stage} variant="row" />
          </div>
        </li>
      ))}
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
