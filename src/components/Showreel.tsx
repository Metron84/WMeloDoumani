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

export function Showreel({ src, poster, href, label, title, line }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggle() {
    const el = video.current;
    if (!el) return;
    el.muted = !el.muted;
    if (!el.muted) void el.play();
    setMuted(el.muted);
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
          <button
            type="button"
            className="reel__sound"
            onClick={toggle}
            aria-pressed={!muted}
            aria-label={muted ? "Unmute the promo" : "Mute the promo"}
          >
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
            )}
            {muted ? "Sound off" : "Sound on"}
          </button>
        ) : (
          <a
            className="reel__play"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch the promo
          </a>
        )}

        <a
          className="reel__yt"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube
        </a>
      </div>

      <div className="reel__caption">
        <p className="eyebrow">{label}</p>
        <h3 className="reel__title">{title}</h3>
        <p className="reel__line">{line}</p>
      </div>
    </div>
  );
}
