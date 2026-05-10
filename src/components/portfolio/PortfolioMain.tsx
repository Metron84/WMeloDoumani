import Image from "next/image";
import Link from "next/link";

export function PortfolioMain() {
  return (
    <main id="portfolio-view" tabIndex={-1}>
      <section className="hero-primary" aria-label="Latest book">
        <a
          href="https://www.amazon.com/dp/B0GX34LWQ6"
          className="hero-primary__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/hero-book-cover.jpg"
            alt="The Smudge on the Canvas by W. Melo Doumani"
            className="hero-primary__img"
            width={1360}
            height={768}
            priority
            sizes="100vw"
          />
          <div className="hero-primary__plaque">
            <span className="hero-primary__kicker">Latest Work — Now on Kindle</span>
            <span className="hero-primary__cta">Read on Kindle →</span>
          </div>
        </a>
      </section>

      <section className="hero-pillars" aria-label="Metron and Ethical Futures">
        <a
          href="https://www.metronventures.com/tpd-studio"
          className="pillar-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/studio-hero.jpg"
            alt="Metron TPD Studio"
            className="pillar-bg"
            width={1200}
            height={800}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pillar-overlay">
            <span className="pillar-label">The Platform</span>
            <h2 className="pillar-title">
              Metron
              <br />
              TPD Studio
            </h2>
          </div>
        </a>
        <a
          href="https://ethicalfutures.institute"
          className="pillar-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/efi-hero.jpg"
            alt="Ethical Futures Institute"
            className="pillar-bg"
            width={1200}
            height={800}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pillar-overlay">
            <span className="pillar-label">The Institution</span>
            <h2 className="pillar-title">
              Ethical Futures
              <br />
              Institute
            </h2>
          </div>
        </a>
      </section>

      <section className="promo-columns">
        <div className="promo-col">
          <p className="promo-kicker">New Book</p>
          <h3 className="promo-headline">The Smudge on the Canvas</h3>
          <p className="promo-body">
            From the Cushion Economy to the Reflective Path and the Home of Peace. A quiet
            reckoning with the mark we leave when comfort is no longer enough.
          </p>
          <a href="#books" className="promo-cta">
            See all books →
          </a>
        </div>
        <div className="promo-col">
          <p className="promo-kicker">The Platform</p>
          <h3 className="promo-headline">Metron TPD Studio</h3>
          <p className="promo-body">
            Strategic intelligence that runs locally. 350 thinkers. Complete privacy.
            Nothing leaves your machine.
          </p>
          <a
            href="https://www.metronventures.com/tpd-studio"
            className="promo-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enter the studio →
          </a>
        </div>
        <div className="promo-col">
          <p className="promo-kicker">The Institution</p>
          <h3 className="promo-headline">Ethical Futures Institute</h3>
          <p className="promo-body">
            Training judgment for complex worlds — where philosophy, writing, and media become
            one craft.
          </p>
          <a
            href="https://ethicalfutures.institute"
            className="promo-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discover EFI →
          </a>
        </div>
      </section>

      <div className="section-rule" id="writing">
        <span className="section-rule-label">The Writer</span>
        <span className="section-rule-line" />
        <span className="section-rule-label">Books · Frameworks · Archive</span>
      </div>

      <section className="bio-section" id="about">
        <div className="bio-col">
          <p className="bio-kicker">A note from the author</p>
          <h2 className="bio-headline">On imagination, fear, and honest guides.</h2>
          <p className="bio-body bio-body--dropcap">
            What I imagine rarely feels noteworthy — not even in the dreaming state of those
            around me. When I try to build with logic, reason, nobility, clarity, and love —
            when my words carry the promise of peace and plant a seed of conviction — they are
            often met with objection. There is a quiet necessity to shut down imagination
            simply because it is affiliated with the unknown.
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
            fullest, while simultaneously being taught never to step beyond what feels safe.
            This is the irony we prefer not to reflect upon — because reflection demands we look at
            our flaws.
          </p>
          <p className="bio-body">
            Let us accept the flaw, then. Let us acknowledge the shortcomings. Flaws are not
            curses we must eradicate in pursuit of perfection. They are reminders of our
            humanity. What we lack today are honest guides — not those who promise flawlessness,
            but those who offer timeless knowledge, methods, and reasoning as solid foundations we
            can build upon.
          </p>
          <p className="bio-body">
            That is my definition of innovation within humanity: to stand on what endures, and
            become the role model the next generation needs.
          </p>
        </div>
        <div className="bio-col">
          <div className="bio-portrait">
            <Image
              src="/melo-portrait.jpg"
              alt="W. Melo Doumani"
              width={1024}
              height={1008}
              sizes="(max-width: 768px) 100vw, 50vw"
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
          </div>
        </div>
      </section>

      <div className="editorial-strip">
        <img
          src="https://images.unsplash.com/photo-1538061879026-7703d25d483c?w=2000&q=85"
          alt="Cities that shaped the work"
          width={2000}
          height={1200}
          loading="lazy"
          decoding="async"
        />
        <p className="editorial-strip-caption">
          New York · London · Dubai · Rabat · Beirut · Riyadh · Geneva · Brighton — Cities that
          shaped the work
        </p>
      </div>

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

      <section className="writing-section" id="books" aria-labelledby="books-h">
        <div className="section-header">
          <h2 className="section-title" id="books-h">
            Books
          </h2>
          <span className="section-sub">Available on Amazon Kindle</span>
        </div>
        <div className="three-cards">
          <div className="card">
            <p className="card-type">Latest — Kindle</p>
            <h3 className="card-title">The Smudge on the Canvas</h3>
            <p className="card-body">
              From the Cushion Economy to the Reflective Path and the Home of Peace. The book that
              completes the Melonomics arc.
            </p>
            <p className="card-meta">A reflective journey into what remains</p>
            <a
              href="https://www.amazon.com/dp/B0GX34LWQ6"
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get the book →
            </a>
          </div>
          <div className="card">
            <p className="card-type">Book — Kindle</p>
            <h3 className="card-title">The Cold War in Your Head</h3>
            <p className="card-body">
              The divide they keep showing you isn’t the real one. Psychological sovereignty and
              the quiet war for your attention.
            </p>
            <a
              href="https://www.amazon.com/Cold-War-Your-Head-Actual/dp/B0GVRZ8Y9Q"
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get the book →
            </a>
          </div>
          <div className="card">
            <p className="card-type">Book — Kindle</p>
            <h3 className="card-title">Perspectives: Melo or Cypher</h3>
            <p className="card-body">
              One hundred quotes. A philosophical provocation on authorship, originality, and the
              boundary between human and machine thought.
            </p>
            <a
              href="https://a.co/d/07UjKXPv"
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get the book →
            </a>
          </div>
        </div>
      </section>

      <div className="section-rule" id="builder">
        <span className="section-rule-label">The Builder</span>
        <span className="section-rule-line" />
        <span className="section-rule-label">Platforms · Institutions · Tools</span>
      </div>

      <section className="story-arc" id="strategist">
        <p className="arc-label">The strategist’s arc</p>
        <div className="arc-timeline" role="list">
          <div className="arc-step" role="listitem">
            <div className="arc-dot" aria-hidden="true" />
            <p className="arc-year">Formed</p>
            <p className="arc-title">Cities &amp; questions</p>
            <p className="arc-body">Voice shaped by place — never a borrowed accent.</p>
          </div>
          <div className="arc-step" role="listitem">
            <div className="arc-dot" aria-hidden="true" />
            <p className="arc-year">On paper</p>
            <p className="arc-title">Books &amp; scripts</p>
            <p className="arc-body">
              Fiction, essays, and screenplays in one long argument with the age.
            </p>
          </div>
          <div className="arc-step" role="listitem">
            <div className="arc-dot" aria-hidden="true" />
            <p className="arc-year">In systems</p>
            <p className="arc-title">Frameworks</p>
            <p className="arc-body">
              Melonomics, maps, and the discipline of saying what is true before what is easy.
            </p>
          </div>
          <div className="arc-step" role="listitem">
            <div className="arc-dot" aria-hidden="true" />
            <p className="arc-year">Now</p>
            <p className="arc-title">The Smudge</p>
            <p className="arc-body">The latest work — the mark that stays when the cushion thins.</p>
          </div>
        </div>
      </section>

      <section className="screenplays" id="screenplays">
        <p className="small-label">Screenplays — features &amp; series</p>
        <div className="screenplay-list" aria-label="Screenplay titles">
          <span className="screenplay-item">On Balconies</span>
          <span className="screenplay-item">Map of Your Head</span>
          <span className="screenplay-item">Knowing You Before You Move On</span>
          <span className="screenplay-item">Wanting the Moon</span>
          <span className="screenplay-item">The Villager’s Tumble</span>
          <span className="screenplay-item">A Devastating Journey</span>
          <span className="screenplay-item">P.L.U.R.</span>
          <span className="screenplay-item">The Imam Who Knew Too Little</span>
          <span className="screenplay-item">Don’t Touch My Tiramisu</span>
        </div>
        <div className="screenplay-meta">
          <a
            className="platform-btn platform-btn-spotify"
            href="https://open.spotify.com/show/1UXVnQgicG0S7plZX8eUIL"
            target="_blank"
            rel="noopener noreferrer"
          >
            Listen on Spotify
          </a>
          <a
            className="platform-btn platform-btn-youtube"
            href="https://www.youtube.com/@mrmelo.comPortfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube portfolio
          </a>
        </div>
      </section>

      <section className="tools-section" id="tools">
        <div className="tools-intro">
          <p className="tools-intro-label">Built with intention</p>
          <h2 className="tools-intro-headline">Private tools for serious thinking.</h2>
          <p className="tools-intro-body">
            Metron TPD Studio runs locally with 350 thinkers. Ethical Futures Institute trains
            judgment across disciplines. Nothing is mined. Everything is yours.
          </p>
        </div>
        <div className="tools-grid">
          <div className="tool-card">
            <p className="tool-tag">Flagship</p>
            <h3 className="tool-name">Metron TPD Studio</h3>
            <p className="tool-desc">Strategic intelligence that stays on your machine.</p>
            <a
              href="https://www.metronventures.com/tpd-studio"
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open studio →
            </a>
          </div>
          <div className="tool-card">
            <p className="tool-tag">Institution</p>
            <h3 className="tool-name">Ethical Futures Institute</h3>
            <p className="tool-desc">Philosophy, writing, and media as one craft of judgment.</p>
            <a
              href="https://ethicalfutures.institute"
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit EFI →
            </a>
          </div>
          <div className="tool-card">
            <p className="tool-tag">Venture</p>
            <h3 className="tool-name">Metron Ventures</h3>
            <p className="tool-desc">The home for what ships and what is still in the lab.</p>
            <a
              href="https://metronventures.com"
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              metronventures.com →
            </a>
          </div>
        </div>
      </section>

      <section className="philosophy-section" id="philosophy" aria-labelledby="philo-h">
        <div className="section-header philosophy-header">
          <h2 className="section-title philosophy-title" id="philo-h">
            Philosophy &amp; Melonomics
          </h2>
          <span className="section-sub">Cushion economy · reflective path · home of peace</span>
        </div>
        <p className="bio-body philosophy-body">
          Melonomics names the tension between a Cushion Economy and the work of a Reflective Path
          — and what it might mean to find a Home of Peace without lying to yourself.{" "}
          <em>The Smudge on the Canvas</em> is where that line of thought meets narrative. For a
          formal line of argument, the Zenodo paper in the archive remains the right citation.
        </p>
        <p className="philosophy-cta">
          <a
            href="https://doi.org/10.5281/zenodo.18357660"
            className="card-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Academic paper (Zenodo) →
          </a>
        </p>
      </section>

      <div className="melonomics-img-banner" aria-label="Melonomics visual themes">
        <figure className="melonomics-img-panel">
          <img
            src="https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80"
            alt="The Metron framework — timeless excellence"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
          />
          <figcaption>The Metron Framework — Timeless Excellence</figcaption>
        </figure>
        <figure className="melonomics-img-panel">
          <img
            src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80"
            alt="Map of Existence"
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
          />
          <figcaption>Map of Existence — Movement · Framework · Protection</figcaption>
        </figure>
        <figure className="melonomics-img-panel">
          <img
            src="https://images.unsplash.com/photo-1514678740932-c28a2a8d57da?w=1200&q=85"
            alt="Cushion vs harmony economy"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
          />
          <figcaption>Cushion vs. Harmony Economy — The Bridge Is the Work</figcaption>
        </figure>
      </div>

      <footer className="site-footer" id="contact">
        <div className="footer-col">
          <p className="footer-label">The Byline</p>
          <h2 className="footer-name">W. Melo Doumani</h2>
          <p className="footer-sub">
            Writer. Thinker. Builder.
            <br />
            Dubai, United Arab Emirates.
          </p>
          <p className="footer-byline-italic">
            &quot;Character is the root that directs the path for growth.&quot;
          </p>
        </div>
        <div className="footer-col">
          <p className="footer-label">Reach</p>
          <ul className="footer-links">
            <li>
              <a href="mailto:doumani@metronventures.com">doumani@metronventures.com</a>
            </li>
            <li>
              <a href="https://metronventures.com" target="_blank" rel="noopener noreferrer">
                metronventures.com
              </a>
            </li>
            <li>
              <a href="https://mrmelo.com" target="_blank" rel="noopener noreferrer">
                mrmelo.com
              </a>
            </li>
            <li>
              <a href="https://x.com/wmelodoumani" target="_blank" rel="noopener noreferrer">
                𝕏 @wmelodoumani
              </a>
            </li>
            <li>
              <a
                href="https://www.meer.com/en/authors/1698-melo-wajed-doumani"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meer Author Page
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="footer-label">The Archive</p>
          <ul className="footer-links">
            <li>
              <a
                href="https://www.amazon.com/dp/B0GX34LWQ6"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Smudge on the Canvas
              </a>
            </li>
            <li>
              <a
                href="https://www.amazon.com/Cold-War-Your-Head-Actual/dp/B0GVRZ8Y9Q"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Cold War in Your Head
              </a>
            </li>
            <li>
              <a href="https://a.co/d/07UjKXPv" target="_blank" rel="noopener noreferrer">
                Perspectives: Melo or Cypher
              </a>
            </li>
            <li>
              <a href="https://doi.org/10.5281/zenodo.18357660" target="_blank" rel="noopener noreferrer">
                Academic Paper (Zenodo)
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@mrmelo.comPortfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube Portfolio
              </a>
            </li>
            <li>
              <a
                href="https://open.spotify.com/show/1UXVnQgicG0S7plZX8eUIL"
                target="_blank"
                rel="noopener noreferrer"
              >
                Screenplay Podcast (Spotify)
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <p className="footer-ufm-line" role="status">
        <Link href="/play" id="ufm-footer-link">
          Ultimate Fantasy Manager (UFM)
        </Link>
        <span> — fantasy football leagues.</span>
      </p>
      <div className="footer-bottom">
        <span>
          © 2026 <strong>W. Melo Doumani</strong> · melodoumani.com
        </span>
        <span>I write with intention. I build things that work.</span>
      </div>
    </main>
  );
}
