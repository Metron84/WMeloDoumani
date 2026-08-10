"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { capabilityTree, stack } from "@/data/cv";
import { useReveal } from "@/hooks/useReveal";

const toolkitLine = stack.flatMap((g) => g.items).join(" · ");
const languagesLine = "EN native · AR, FR fluent · ES, IT conversational";

function TitleBlock() {
  return (
    <div className="blueprint__titleblock">
      <div className="blueprint__cell">
        <p className="blueprint__cell-label">Toolkit</p>
        <p className="blueprint__cell-value">{toolkitLine}</p>
      </div>
      <div className="blueprint__cell">
        <p className="blueprint__cell-label">Languages</p>
        <p className="blueprint__cell-value">{languagesLine}</p>
      </div>
      <div className="blueprint__cell">
        <p className="blueprint__cell-label">Drawn by</p>
        <p className="blueprint__cell-value blueprint__cell-value--red">
          W. MELO DOUMANI · DUBAI
        </p>
      </div>
    </div>
  );
}

export function CapabilityBlueprint() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (visible) setSelected(0);
  }, [visible]);

  function onBranchKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const len = capabilityTree.length;
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % len
        : (index - 1 + len) % len;
    setSelected(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <div ref={ref} className={`blueprint${visible ? " is-visible" : ""}`}>
      <div className="blueprint__mobile">
        <div className="blueprint__spine" aria-hidden="true" />
        <div className="blueprint__root">One operator</div>
        <ul className="blueprint__branches">
          {capabilityTree.map((branch, bi) => (
            <li
              key={branch.key}
              className="blueprint__branch"
              style={{ "--branch-delay": `${bi * 60}ms` } as CSSProperties}
            >
              <span className="blueprint__connector" aria-hidden="true" />
              <div className="blueprint__box">
                <h3 className="blueprint__branch-title">{branch.title}</h3>
                <p className="blueprint__summary">{branch.summary}</p>
                <ul className="blueprint__outputs">
                  {branch.outputs.map((out, oi) => (
                    <li
                      key={out}
                      className="blueprint__output"
                      style={
                        {
                          "--output-delay": `${400 + bi * 60 + oi * 80}ms`,
                        } as CSSProperties
                      }
                    >
                      <span className="blueprint__tick" aria-hidden="true" />
                      {out}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <TitleBlock />
      </div>

      <div className="blueprint__desktop">
        <div className="blueprint__desk-stage">
          <svg
            className="blueprint__svg"
            viewBox="0 0 1000 220"
            preserveAspectRatio="xMidYMin meet"
            aria-hidden="true"
          >
            <path className="blueprint__draw blueprint__draw--trunk" d="M500 42 V90" />
            <path className="blueprint__draw blueprint__draw--bus" d="M125 90 H875" />
            <path className="blueprint__draw blueprint__draw--drop" d="M125 90 V140" />
            <path className="blueprint__draw blueprint__draw--drop" d="M375 90 V140" />
            <path className="blueprint__draw blueprint__draw--drop" d="M625 90 V140" />
            <path className="blueprint__draw blueprint__draw--drop" d="M875 90 V140" />
          </svg>

          <div className="blueprint__root blueprint__root--desk">One operator</div>

          <div
            className="blueprint__desk-branches"
            role="group"
            aria-label="Capability branches"
          >
            {capabilityTree.map((branch, bi) => {
              const isSelected = selected === bi;
              return (
                <div
                  key={branch.key}
                  className={`blueprint__desk-col${isSelected ? " is-selected" : ""}`}
                  style={{ "--branch-delay": `${bi * 60}ms` } as CSSProperties}
                >
                  <button
                    type="button"
                    ref={(el) => {
                      buttonRefs.current[bi] = el;
                    }}
                    className={`blueprint__box blueprint__box--desk${isSelected ? " is-selected" : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelected(bi)}
                    onFocus={() => setSelected(bi)}
                    onKeyDown={(event) => onBranchKeyDown(event, bi)}
                  >
                    <h3 className="blueprint__branch-title">{branch.title}</h3>
                  </button>
                  <div className="blueprint__leaf">
                    <div className="blueprint__leaf-spine" aria-hidden="true" />
                    <ul className="blueprint__outputs blueprint__outputs--desk">
                      {branch.outputs.map((out, oi) => (
                        <li
                          key={out}
                          className="blueprint__output"
                          style={
                            {
                              "--output-delay": `${520 + bi * 60 + oi * 80}ms`,
                            } as CSSProperties
                          }
                        >
                          <span className="blueprint__tick" aria-hidden="true" />
                          {out}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="blueprint__detail"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="blueprint__detail-stack">
            {capabilityTree.map((branch, bi) => {
              const isActive = selected === bi;
              return (
                <div
                  key={branch.key}
                  className={`blueprint__detail-item${isActive ? " is-active" : ""}`}
                  aria-hidden={!isActive}
                >
                  <p className="blueprint__detail-title">{branch.title}</p>
                  <p className="blueprint__detail-summary">{branch.summary}</p>
                </div>
              );
            })}
          </div>
        </div>

        <TitleBlock />
      </div>
    </div>
  );
}
