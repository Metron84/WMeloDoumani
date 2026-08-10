"use client";

import type { CSSProperties } from "react";
import { built } from "@/data/cv";
import { useReveal } from "@/hooks/useReveal";

export function BuiltTerminal() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`term${visible ? " is-visible" : ""}`}>
      <div className="term__bar">
        <span className="term__dot term__dot--red" aria-hidden="true" />
        <span className="term__dot" aria-hidden="true" />
        <span className="term__dot" aria-hidden="true" />
        <span className="term__title">melo@dubai ~ /built</span>
      </div>

      <div className="term__body">
        {built.map((entry, i) => {
          const content = (
            <>
              <p className="term__cmd">
                <span className="term__prompt">&gt;</span> {entry.command}
              </p>
              <p className="term__desc">{entry.blurb}</p>
              <p className="term__stack"># {entry.stack}</p>
            </>
          );

          const style = { "--term-delay": `${i * 220}ms` } as CSSProperties;

          if (entry.href) {
            return (
              <a
                key={entry.title}
                className="term__entry"
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                style={style}
              >
                {content}
              </a>
            );
          }

          return (
            <div key={entry.title} className="term__entry" style={style}>
              {content}
            </div>
          );
        })}

        <p className="term__cursor-line" aria-hidden="true">
          <span className="term__prompt">&gt;</span>
          <span className="term__cursor" />
        </p>
      </div>
    </div>
  );
}
