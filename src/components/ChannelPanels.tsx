"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { channels, type Channel } from "@/data/cv";
import { useReveal } from "@/hooks/useReveal";

function parseCountable(headline: string): number | null {
  const digits = headline.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function formatCounted(n: number, template: string): string {
  const withCommas = n.toLocaleString("en-US");
  if (template.includes(",")) return template.replace(/[\d,]+/, withCommas);
  return template.replace(/\d+/, String(n));
}

function CountHeadline({
  channel,
  active,
}: {
  channel: Channel;
  active: boolean;
}) {
  const countable = channel.key === "youtube" || channel.key === "instagram";
  const target = countable ? parseCountable(channel.headline) : null;
  const [text, setText] = useState(
    countable && target !== null
      ? formatCounted(0, channel.headline)
      : channel.headline,
  );

  useEffect(() => {
    if (!countable || target === null) {
      setText(channel.headline);
      return;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setText(channel.headline);
      return;
    }

    if (!active) {
      setText(formatCounted(0, channel.headline));
      return;
    }

    let frame = 0;
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      setText(formatCounted(value, channel.headline));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setText(channel.headline);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, channel.headline, countable, target]);

  return <p className="channel__headline">{text}</p>;
}

export function ChannelPanels() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`channels${visible ? " is-visible" : ""}`}>
      {channels.map((channel, i) => (
        <article
          key={channel.key}
          className="channel"
          style={{ "--channel-delay": `${i * 90}ms` } as CSSProperties}
        >
          <p className="channel__label">{channel.label}</p>
          <CountHeadline channel={channel} active={visible} />
          {channel.headlineNote ? (
            <p className="channel__note">{channel.headlineNote}</p>
          ) : null}
          <ul className="channel__points">
            {channel.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          {channel.organic ? (
            <p className="channel__organic">{channel.organic}</p>
          ) : null}
          <a
            className="channel__cta"
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {channel.cta}
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
        </article>
      ))}
    </div>
  );
}
