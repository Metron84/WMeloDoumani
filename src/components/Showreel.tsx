"use client";

import { useRef, useState } from "react";

type Props = {
  /** Path to a compressed, self-hosted MP4 in /public/video. Omit to fall back
   *  to the poster frame plus an outbound link. */
  src?: string;
  poster: string;
  href: string;
  label: string;
  title: string;
  line: string;
};

function PlayGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5L8 5.5Z" fill="currentColor" />
    </svg>
  );
}

function SoundGlyph({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 3 4.5 6H2v4h2.5L8 13V3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="m11 6 4 4m0-4-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3 4.5 6H2v4h2.5L8 13V3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M11 6a3 3 0 0 1 0 4m2-6a6 6 0 0 1 0 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Showreel({ src, poster, href, label, title, line }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showPlay, setShowPlay] = useState(true);

  function toggleSound() {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    if (!el.muted) {
      void el.play();
      setShowPlay(false);
    }
    setMuted(el.muted);
  }

  function startWithSound() {
    const el = video.current;
    if (!el) return;
    el.muted = false;
    void el.play();
    setMuted(false);
    setShowPlay(false);
  }

  return (
    <div className="reel">
      <div className="reel__stage">
        {src ? (
          <video
            ref={video}
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt={title} />
        )}

        {src ? (
          <>
            {showPlay ? (
              <button
                type="button"
                className="reel__start"
                onClick={startWithSound}
                aria-label="Play promo with sound"
              >
                <PlayGlyph />
              </button>
            ) : null}

            <button
              type="button"
              className="reel__sound"
              onClick={toggleSound}
              aria-pressed={!muted}
              aria-label={muted ? "Unmute the promo" : "Mute the promo"}
            >
              <SoundGlyph muted={muted} />
            </button>
          </>
        ) : (
          <a
            className="reel__cta"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch the promo
          </a>
        )}
      </div>

      <a
        className="reel__yt"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch on YouTube
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
      </a>

      <div className="reel__caption">
        <p className="eyebrow">{label}</p>
        <h3 className="reel__title">{title}</h3>
        <p className="reel__line">{line}</p>
      </div>
    </div>
  );
}
