import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Melo Doumani",
  description: "Writer, thinker, builder — books, frameworks, and biography.",
};

export default function AboutPage() {
  return (
    <article id="about-page">
      <div className="section-rule">
        <span className="section-rule-label">About</span>
        <span className="section-rule-line" />
        <span className="section-rule-label">Writer · Builder</span>
      </div>

      <section className="bio-section">
        <div className="bio-col">
          <p className="bio-kicker">A note from the author</p>
          <h1 className="bio-headline">On imagination, fear, and honest guides.</h1>
          <p className="bio-body bio-body--dropcap">
            What I imagine rarely feels noteworthy — not even in the dreaming state of those around
            me. When I try to build with logic, reason, nobility, clarity, and love — when my words
            carry the promise of peace and plant a seed of conviction — they are often met with
            objection. There is a quiet necessity to shut down imagination simply because it is
            affiliated with the unknown.
          </p>
          <p className="bio-body">
            We are not fearful out of cowardice. We are fearful because we have tasted
            disappointment and regret so often that we now treat them as inevitable. We have been
            conditioned to stay inside the safety zone. Conditioned to avoid risk. Conditioned to
            believe that the right move is the one that brings no headaches.
          </p>
          <p className="bio-body">
            And yet we still call life beautiful. Even when it is filled with uncertainty,
            anticipated pain, and dangers on every side. We are encouraged to live life to the
            fullest, while simultaneously being taught never to step beyond what feels safe. This is
            the irony we prefer not to reflect upon — because reflection demands we look at our
            flaws.
          </p>
          <p className="bio-body">
            Let us accept the flaw, then. Let us acknowledge the shortcomings. Flaws are not curses
            we must eradicate in pursuit of perfection. They are reminders of our humanity. What we
            lack today are honest guides — not those who promise flawlessness, but those who offer
            timeless knowledge, methods, and reasoning as solid foundations we can build upon.
          </p>
          <p className="bio-body">
            That is my definition of innovation within humanity: to stand on what endures, and become
            the role model the next generation needs.
          </p>
        </div>
        <div className="bio-col">
          <div className="bio-portrait">
            <Image
              src="/melo-portrait.jpg"
              alt="W. Melo Doumani"
              width={1024}
              height={1008}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <p className="bio-kicker bio-kicker--post-portrait">The work</p>
          <h2 className="bio-headline">Books, frameworks, and screenplays.</h2>
          <p className="bio-body">
            The Smudge on the Canvas. The Cold War in Your Head. Perspectives: Melo or Cypher.
            Melonomics. The Map of Existence.
          </p>
          <div className="bio-links">
            <a
              href="https://www.amazon.com/Cold-War-Your-Head-Actual/dp/B0GVRZ8Y9Q"
              className="bio-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Cold War in Your Head →
            </a>
            <Link href="/writing" className="bio-link">
              The Reflective (writing) →
            </Link>
            <Link href="/play" className="bio-link">
              Ultimate Fantasy Manager →
            </Link>
          </div>
        </div>
      </section>

      <section className="bio-facts-strip" aria-label="Biographical facts">
        <div>
          <p className="bio-kicker">Seventeen cumulative years in Beirut</p>
          <h2 className="bio-headline">
            Time and place forged a voice that moves between continents and ideas.
          </h2>
          <p className="bio-body">
            With stops in London, Brighton, Geneva, and Rabat, those years were spent writing —
            screenplays, essays, philosophy, and fiction. The questions were never small.
          </p>
          <div className="bio-links">
            <a
              href="https://www.meer.com/en/authors/1698-melo-wajed-doumani"
              className="bio-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meer Author Page →
            </a>
            <a
              href="https://x.com/wmelodoumani"
              className="bio-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              𝕏 @wmelodoumani →
            </a>
          </div>
        </div>
        <div>
          <div className="bio-facts">
            <span className="bio-fact">
              Born <strong>New York</strong>
            </span>
            <span className="bio-fact">
              Raised <strong>London</strong>
            </span>
            <span className="bio-fact">
              Formed <strong>Beirut</strong>
            </span>
            <span className="bio-fact">
              Based <strong>Dubai</strong>
            </span>
          </div>
        </div>
      </section>

      <footer className="marketing-minimal-footer">
        <p>
          <Link href="/">Home</Link>
          {" · "}
          <Link href="/writing">Writing</Link>
          {" · "}
          <Link href="/play">Play UFM</Link>
        </p>
      </footer>
    </article>
  );
}
