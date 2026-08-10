"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { pubFullTitle, pubPages, type PubPage } from "@/data/cv";
import { useReveal } from "@/hooks/useReveal";

const TURN_MS = 800;
const TURN_EASE = "cubic-bezier(.4,.1,.3,1)";
const OPEN_MS = 320;
const AUTO_GAP_MS = 900;
const END_HOLD_MS = 1200;

function Emblem() {
  return (
    <svg width="60" height="60" viewBox="0 0 66 66" aria-hidden="true">
      <circle
        cx="33"
        cy="33"
        r="27"
        fill="none"
        stroke="#F2EDE4"
        strokeWidth="1.5"
      />
      <path
        d="M20 20 L13 30 L18 41 L30 43 L33 33 Z"
        fill="none"
        stroke="#F2EDE4"
        strokeWidth="1.5"
      />
      <path
        d="M20 20 L33 16 L33 33"
        fill="none"
        stroke="#F2EDE4"
        strokeWidth="1.5"
      />
      <path
        d="M40 24 H54 M40 33 H56 M40 42 H50"
        stroke="#F2EDE4"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="33"
        y1="3"
        x2="33"
        y2="63"
        stroke="#D8232A"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CoverFace({ radius = "3px" }: { radius?: string }) {
  return (
    <div className="book__cover-face" style={{ borderRadius: radius }}>
      <Emblem />
      <p className="book__cover-title">Written Works</p>
      <span className="book__cover-rule" aria-hidden="true" />
      <p className="book__cover-by">W. MELO DOUMANI</p>
    </div>
  );
}

function PageBody({
  page,
  linksLive,
  coverRadius,
}: {
  page: PubPage | undefined;
  linksLive: boolean;
  coverRadius?: string;
}) {
  if (!page) return null;

  if (page.kind === "cover") {
    return (
      <div className="book__page-cover">
        <CoverFace radius={coverRadius ?? "3px 0 0 3px"} />
      </div>
    );
  }

  if (page.kind === "end") {
    return <p className="book__end">{page.text}</p>;
  }

  return (
    <div className="book__work">
      <p className="book__label">{page.label}</p>
      <p className="book__title">{page.title}</p>
      <a
        className="book__outlet"
        href={page.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${pubFullTitle(page.href)} on ${page.outlet}`}
        tabIndex={linksLive ? 0 : -1}
        aria-disabled={!linksLive}
      >
        {page.outlet}
        <span aria-hidden="true"> ↗</span>
      </a>
    </div>
  );
}

function Controls({
  on,
  live,
  index,
  onPrev,
  onNext,
  onJump,
}: {
  on: boolean;
  live: boolean;
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onJump: (n: number) => void;
}) {
  const enabled = on && live;
  return (
    <div className={`book__ctl${on ? " is-on" : ""}`}>
      <button
        type="button"
        className="book__nav"
        aria-label="Previous page"
        disabled={!enabled}
        onClick={onPrev}
      >
        ‹
      </button>
      <div className="book__dots" role="tablist" aria-label="Pages">
        {pubPages.map((_, n) => (
          <button
            key={n}
            type="button"
            className="book__dot"
            aria-label={`Page ${n + 1}`}
            aria-current={n === index ? "true" : undefined}
            disabled={!enabled}
            onClick={() => onJump(n)}
          />
        ))}
      </div>
      <button
        type="button"
        className="book__nav"
        aria-label="Next page"
        disabled={!enabled}
        onClick={onNext}
      >
        ›
      </button>
    </div>
  );
}

export function PublishedBook() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [live, setLive] = useState(false);
  const [controlsOn, setControlsOn] = useState(false);
  const [flipContent, setFlipContent] = useState<PubPage | undefined>();
  const [flipping, setFlipping] = useState(false);
  const [flipAngle, setFlipAngle] = useState(0);
  const [flipTransition, setFlipTransition] = useState(false);
  const [rightPeek, setRightPeek] = useState<number | null>(null);
  const [leftPeek, setLeftPeek] = useState<number | null>(null);

  const busyRef = useRef(false);
  const indexRef = useRef(0);
  const openRef = useRef(false);
  const liveRef = useRef(false);
  const reduceRef = useRef(false);
  const timers = useRef<number[]>([]);
  const rafs = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const clearRafs = useCallback(() => {
    rafs.current.forEach((id) => cancelAnimationFrame(id));
    rafs.current = [];
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  const scheduleFlipTo = useCallback(
    (angle: number) => {
      clearRafs();
      const id1 = requestAnimationFrame(() => {
        const id2 = requestAnimationFrame(() => {
          setFlipTransition(true);
          setFlipAngle(angle);
        });
        rafs.current.push(id2);
      });
      rafs.current.push(id1);
    },
    [clearRafs],
  );

  const resetBook = useCallback(() => {
    clearTimers();
    clearRafs();
    busyRef.current = false;
    setFlipping(false);
    setFlipTransition(false);
    setFlipAngle(0);
    setRightPeek(null);
    setLeftPeek(null);
    setFlipContent(undefined);
    setIsOpen(false);
    openRef.current = false;
    setIndex(0);
    indexRef.current = 0;
    setLive(false);
    liveRef.current = false;
    setControlsOn(false);
  }, [clearRafs, clearTimers]);

  const becomeInteractive = useCallback(() => {
    setLive(true);
    liveRef.current = true;
    setControlsOn(true);
  }, []);

  const openBook = useCallback(
    (n: number, done?: () => void) => {
      setIsOpen(true);
      openRef.current = true;
      setIndex(n);
      indexRef.current = n;
      later(() => done?.(), OPEN_MS);
    },
    [later],
  );

  const closeBook = useCallback(
    (done?: () => void) => {
      setIsOpen(false);
      openRef.current = false;
      setIndex(0);
      indexRef.current = 0;
      later(() => done?.(), OPEN_MS);
    },
    [later],
  );

  const fwd = useCallback(
    (done?: () => void) => {
      if (busyRef.current) {
        done?.();
        return;
      }
      const i = indexRef.current;

      if (!openRef.current || i === 0) {
        openBook(1, done);
        return;
      }
      if (i >= pubPages.length - 1) {
        done?.();
        return;
      }

      if (reduceRef.current) {
        setIndex(i + 1);
        indexRef.current = i + 1;
        done?.();
        return;
      }

      busyRef.current = true;
      setRightPeek(i + 1);
      setFlipContent(pubPages[i]);
      setFlipping(true);
      setFlipTransition(false);
      setFlipAngle(0);
      scheduleFlipTo(-180);

      later(() => {
        setIndex(i + 1);
        indexRef.current = i + 1;
        setRightPeek(null);
        setFlipping(false);
        setFlipTransition(false);
        busyRef.current = false;
        done?.();
      }, TURN_MS + 20);
    },
    [later, openBook, scheduleFlipTo],
  );

  const back = useCallback(
    (done?: () => void) => {
      if (busyRef.current || indexRef.current <= 0) {
        done?.();
        return;
      }
      const i = indexRef.current;

      if (i === 1) {
        closeBook(done);
        return;
      }

      if (reduceRef.current) {
        setIndex(i - 1);
        indexRef.current = i - 1;
        done?.();
        return;
      }

      busyRef.current = true;
      setLeftPeek(i - 2);
      setFlipContent(pubPages[i - 1]);
      setFlipping(true);
      setFlipTransition(false);
      setFlipAngle(-180);
      scheduleFlipTo(0);

      later(() => {
        setIndex(i - 1);
        indexRef.current = i - 1;
        setLeftPeek(null);
        setFlipping(false);
        setFlipTransition(false);
        busyRef.current = false;
        done?.();
      }, TURN_MS + 20);
    },
    [closeBook, later, scheduleFlipTo],
  );

  const jump = useCallback(
    (n: number) => {
      if (busyRef.current || n === indexRef.current) return;
      if (n === 0) {
        if (openRef.current) closeBook();
        return;
      }
      if (!openRef.current) {
        if (reduceRef.current) {
          openBook(n);
          return;
        }
        openBook(1, () => jump(n));
        return;
      }
      const step = n > indexRef.current ? fwd : back;
      step(() => jump(n));
    },
    [back, closeBook, fwd, openBook],
  );

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceRef.current) {
      if (visible) becomeInteractive();
      return;
    }

    if (!visible) {
      resetBook();
      return () => {
        clearTimers();
        clearRafs();
      };
    }

    resetBook();
    later(() => {
      openBook(1, () => {
        const tick = () => {
          if (indexRef.current >= pubPages.length - 1) {
            later(() => closeBook(becomeInteractive), END_HOLD_MS);
            return;
          }
          fwd(() => later(tick, AUTO_GAP_MS));
        };
        later(tick, AUTO_GAP_MS);
      });
    }, 0);

    return () => {
      clearTimers();
      clearRafs();
      busyRef.current = false;
    };
  }, [
    visible,
    resetBook,
    openBook,
    closeBook,
    fwd,
    later,
    becomeInteractive,
    clearTimers,
    clearRafs,
  ]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!liveRef.current) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      fwd();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      back();
    }
  };

  const leftPage =
    leftPeek !== null
      ? pubPages[leftPeek]
      : isOpen && index >= 1
        ? pubPages[index - 1]
        : undefined;

  const rightPage =
    rightPeek !== null
      ? pubPages[rightPeek]
      : isOpen && index >= 1
        ? pubPages[index]
        : undefined;

  const mobilePage = rightPage;

  const flipStyle: CSSProperties = {
    display: flipping ? "block" : "none",
    transform: `rotateY(${flipAngle}deg)`,
    transition: flipTransition ? `transform ${TURN_MS}ms ${TURN_EASE}` : "none",
  };

  const controlsProps = {
    on: controlsOn,
    live,
    index,
    onPrev: () => back(),
    onNext: () => fwd(),
    onJump: jump,
  };

  return (
    <div
      ref={ref}
      className={`book${live ? " is-live" : ""}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-label="Published flip book"
    >
      <div className="layoutDesktop" aria-hidden="true">
        <div className="book__stage">
          <div
            className={`book__closed${isOpen ? " is-hidden" : ""}`}
            aria-hidden={isOpen}
          >
            <CoverFace />
          </div>

          <div
            className={`book__open${isOpen ? " is-shown" : ""}`}
            aria-hidden={!isOpen}
          >
            <div className="book__half book__half--left">
              <PageBody page={leftPage} linksLive={live} />
            </div>
            <div className="book__half book__half--right">
              <PageBody page={rightPage} linksLive={live} />
            </div>
            <div className="book__spine" aria-hidden="true" />
            <div className="book__flip" style={flipStyle}>
              <div className="book__face book__face--front">
                <PageBody page={flipContent} linksLive={false} />
              </div>
              <div className="book__face book__face--back">
                <PageBody page={flipContent} linksLive={false} />
              </div>
            </div>
          </div>
        </div>
        <Controls {...controlsProps} />
      </div>

      <div className="layoutMobile" aria-hidden="true">
        <div className="book__stage book__stage--mobile">
          <div
            className={`book__closed book__closed--mobile${isOpen ? " is-hidden" : ""}`}
            aria-hidden={isOpen}
          >
            <CoverFace />
          </div>

          <div
            className={`book__open book__open--mobile${isOpen ? " is-shown" : ""}`}
            aria-hidden={!isOpen}
          >
            <div className="book__page">
              <PageBody page={mobilePage} linksLive={live} coverRadius="3px" />
            </div>
            <div className="book__flip book__flip--mobile" style={flipStyle}>
              <div className="book__face book__face--front">
                <PageBody page={flipContent} linksLive={false} />
              </div>
              <div className="book__face book__face--back">
                <PageBody page={flipContent} linksLive={false} />
              </div>
            </div>
          </div>
        </div>
        <Controls {...controlsProps} />
      </div>
    </div>
  );
}
