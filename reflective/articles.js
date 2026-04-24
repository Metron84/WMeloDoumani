/*
 * The Reflective — article data
 * Plain script loaded via <script src="./reflective/articles.js" defer>.
 * Populates window.ARTICLES; index.html renders the grid and modal from it.
 *
 * Card order on the grid follows the array order below, not the `id`.
 * The first entry is always the lead hero. New dispatches: prepend at the
 * top of the array (everyone else shifts down). Cover files in reflective/covers/.
 * Optional: `topics` (string[]), `topicSeries` (string id for the homepage strip),
 * `relatedSlugs` (manual boosts for related picks). Share-CTA is appended by the modal.
 */

(function () {
  'use strict';

  /* ---------- Article 1 — book cover + editorial bands + nominee blocks ---------- */
  var catalystContent =
    '<div class="reflective-article-modal catalyst-metric-article">' +
      '<div class="catalyst-metric-article__cover">' +
        '<img src="./reflective/covers/01-catalyst.png" alt="The Catalyst Metric: Redefining the Premier League MVP" class="catalyst-metric-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Catalyst Metric: Redefining the Premier League MVP</h1>' +

    '<div class="reflective-prose">' +
      '<p class="reflective-lede">Not by who scores the most or is the most liked. But by who is the ultimate catalyst for their club — a player the team cannot function without.</p>' +
      '<p>Everything below is based on research and data from Metron Ventures. No personal attachment or favourite player.</p>' +
      '<p>The Catalyst Metric is built on six clear pillars:</p>' +
      '<ul>' +
        '<li>Tactical and structural importance</li>' +
        '<li>Leadership and dressing-room influence</li>' +
        '<li>Consistency over time</li>' +
        '<li>Direct impact on team results</li>' +
        '<li>Ability to elevate teammates</li>' +
        '<li>The measurable difference the team makes when the player is absent</li>' +
      '</ul>' +
    '</div>' +

    '<figure class="reflective-band reflective-band--season" role="img" aria-label="A pitch split between rain-soaked collapse and floodlit triumph — the Catalyst Metric visualised as with-him versus without-him.">' +
      '<div class="reflective-band__veil"></div>' +
      '<figcaption>' +
        '<span class="reflective-band__eyebrow">Season</span>' +
        '<h2 class="reflective-band__heading">2025/26 Nominees</h2>' +
      '</figcaption>' +
    '</figure>' +

    '<div class="nominee" data-nominee="bruno-fernandes" data-section="2025-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Bruno Fernandes <span class="nominee__club">Manchester United</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>Leads the Premier League with 18 assists while dictating every final-third entry.</li>' +
          '<li>When he is absent, United\u2019s expected threat (xT) and goal conversion metrics collapse.</li>' +
          '<li>As club captain, he dragged a fragile squad from a disastrous 15th-place finish last season up to 3rd place.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">18 assists</span> — league leader, final-third orchestrator.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="viktor-gyokeres" data-section="2025-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Viktor Gyökeres <span class="nominee__club">Arsenal</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>12 goals from an expected goals (xG) of 10.37 in just 1,990 minutes.</li>' +
          '<li>Wins 55% of ground duels in transition, acting as the first line of defence.</li>' +
          '<li>Arsenal\u2019s high-press regains and shots from within ten metres spike when he is on the pitch.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">12 goals · 10.37 xG</span> — converts scarcity into points.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="antoine-semenyo" data-section="2025-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Antoine Semenyo <span class="nominee__club">Bournemouth → Manchester City</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>Directly involved in 81.8% of Bournemouth\u2019s goals before his mid-season move.</li>' +
          '<li>13 goals and 4 assists; currently the number-one ranked winger in the league.</li>' +
          '<li>Scored in his first two games for City, reducing the team\u2019s over-reliance on Haaland.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">81.8% goal involvement</span> — pre-move, at Bournemouth.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="bryan-mbeumo" data-section="2025-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Bryan Mbeumo <span class="nominee__club">Brentford</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>14 goals alongside 126 crosses and 45 key passes.</li>' +
          '<li>Sets the physical and pressing standard that makes Thomas Frank\u2019s counter-attacking system function.</li>' +
          '<li>Kept Brentford pushing high in 7th place despite losing their star striker.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">14 goals · 126 crosses</span> — the system\u2019s tempo.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="mohamed-salah-2526" data-section="2025-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Mohamed Salah <span class="nominee__club">Liverpool</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>6 goals and 6 assists while operating in a more creative role.</li>' +
          '<li>Mere presence forces opponents into deep, asymmetrical low blocks.</li>' +
          '<li>Without him, Liverpool\u2019s attacking sequences lose their primary point of penetration.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">Primary penetration</span> — the axis defences bend around.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee-rollup" data-article="catalyst-metric" data-section="2025-26" aria-live="polite"></div>' +

    '<figure class="reflective-band reflective-band--three-year" role="img" aria-label="Three versions of a player across time — the catalyst as an evolving archetype.">' +
      '<div class="reflective-band__veil"></div>' +
      '<figcaption>' +
        '<span class="reflective-band__eyebrow">3-Year Span</span>' +
        '<h2 class="reflective-band__heading">2023–2026 Nominees</h2>' +
      '</figcaption>' +
    '</figure>' +

    '<div class="nominee" data-nominee="rodri" data-section="2023-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Rodri <span class="nominee__club">Manchester City</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>When absent, Manchester City\u2019s win probability drops by 16.5 percentage points.</li>' +
          '<li>Embarked on a club-record 52-game unbeaten streak while averaging over 100 passes per 90 minutes at 94.5% completion.</li>' +
          '<li>Acts as the central processing unit — absorbs pressing triggers, gives the attackers geometric freedom.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">−16.5 pp win probability</span> — without him on the pitch.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="martin-odegaard" data-section="2023-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Martin Ødegaard <span class="nominee__club">Arsenal</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>Without him, Arsenal\u2019s win percentage drops by 14 percentage points and sequence retention collapses.</li>' +
          '<li>86% physical availability over four-and-a-half years; 77 goal involvements.</li>' +
          '<li>Primary trigger for Arsenal\u2019s suffocating high press.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">−14 pp win rate</span> — the nervous system of the side.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="declan-rice" data-section="2023-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Declan Rice <span class="nominee__club">Arsenal</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>Elite recovery pace virtually eliminates counter-attack vulnerabilities.</li>' +
          '<li>Integration elevated Arsenal to title-contending standard with a 75% win rate in evaluated matches.</li>' +
          '<li>Liberates the creative players by shouldering the defensive burden alone.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">75% win rate</span> — since arrival.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="mohamed-salah-2326" data-section="2023-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Mohamed Salah <span class="nominee__club">Liverpool</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>Liverpool\u2019s win rate plummets to 44% in matches where Salah plays but fails to register a goal or assist.</li>' +
          '<li>Dictates spatial geometry, forcing opposing left-backs into deep positions.</li>' +
          '<li>282 direct goal involvements for Liverpool during this period.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">282 goal involvements</span> — the period\u2019s single largest output.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="kevin-de-bruyne-2326" data-section="2023-26">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Kevin De Bruyne <span class="nominee__club">Manchester City</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>Consistently elite in Europe — 1.43 expected threat (xT) per 100 passes.</li>' +
          '<li>Routinely creates over a third of Manchester City\u2019s big chances.</li>' +
          '<li>In 2021/22 he scored 15 goals from an xG of just 5.95 — a massive overperformance.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">1.43 xT / 100 passes</span> — elite in Europe.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee-rollup" data-article="catalyst-metric" data-section="2023-26" aria-live="polite"></div>' +

    '<figure class="reflective-band reflective-band--decades" role="img" aria-label="Three era-defining figures connected by a golden ribbon — the catalyst across generations.">' +
      '<div class="reflective-band__veil"></div>' +
      '<figcaption>' +
        '<span class="reflective-band__eyebrow">Eras</span>' +
        '<h2 class="reflective-band__heading">Decade-by-Decade Catalysts (1992–Present)</h2>' +
      '</figcaption>' +
    '</figure>' +

    '<div class="nominee" data-nominee="eric-cantona" data-section="decades">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Eric Cantona <span class="nominee__club">Manchester United · 1992–2002</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>The transformative variable who ended Manchester United\u2019s 26-year title drought and delivered four titles in five seasons.</li>' +
          '<li>115 direct goal involvements (64 goals, 51 assists) in just 143 Premier League appearances.</li>' +
          '<li>63.24% overall win percentage and a +197 goal difference while on the pitch.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">4 titles in 5 seasons</span> — ended the 26-year drought.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="thierry-henry" data-section="decades">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Thierry Henry <span class="nominee__club">Arsenal · 2002–2012</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>Redefined the modern forward role, drifting into the left half-space and dismantling defensive structures.</li>' +
          '<li>44 goal involvements (24 goals, 20 assists) in just 37 matches during the 2002/03 season.</li>' +
          '<li>Four Golden Boots; absolute talisman of the Invincibles.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">The Invincibles</span> — talisman of an unbeaten season.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee" data-nominee="kevin-de-bruyne-decade" data-section="decades">' +
      '<div class="nominee__veil"></div>' +
      '<div class="nominee__content">' +
        '<h3 class="nominee__name">Kevin De Bruyne <span class="nominee__club">Manchester City · 2012–2022</span></h3>' +
        '<ul class="nominee__bullets">' +
          '<li>Systemic master of positional dominance — two Player of the Season awards.</li>' +
          '<li>69.1% all-time Premier League win percentage over 288 matches.</li>' +
          '<li>Bypasses deep defensive blocks with high-velocity, bending crosses from the right half-space.</li>' +
        '</ul>' +
        '<p class="nominee__stat"><span class="nominee__stat-key">69.1% career PL win rate</span> — the architect of an era.</p>' +
      '</div>' +
    '</div>' +

    '<div class="nominee-rollup" data-article="catalyst-metric" data-section="decades" aria-live="polite"></div>' +

    '<figure class="reflective-band reflective-band--synthesis" role="img" aria-label="A single player stripped to silhouette, the signal every catalyst carries across eras.">' +
      '<div class="reflective-band__veil"></div>' +
      '<figcaption>' +
        '<span class="reflective-band__eyebrow">Synthesis</span>' +
        '<h2 class="reflective-band__heading">The Common Thread</h2>' +
      '</figcaption>' +
    '</figure>' +

    '<figure class="reflective-band reflective-band--reflection" role="img" aria-label="A lone player in an empty stadium, threads of influence trailing from him.">' +
      '<div class="reflective-band__veil"></div>' +
      '<figcaption class="reflective-band__figcaption--centered">' +
        '<p class="reflective-band__close"><em>I see it.</em></p>' +
        '<p class="reflective-band__attribution">— W. Melo Doumani</p>' +
      '</figcaption>' +
    '</figure>' +

    '<div class="reflective-prose reflective-prose--pullquote">' +
      '<p>Awards are based on likability.<br>These are based on accuracy of the total footballer.</p>' +
      '<p>The data is clear. The players who have mattered most are rarely the ones with the highest individual ceiling. They are the ones the system could not function without.</p>' +
    '</div>' +
    '</div>';

  /* ---------- Brentford — lead feature (classes styled in index.html; share CTA appended by modal) ---------- */
  var brentfordContent =
    '<div class="reflective-article-modal brentford-article">' +
      '<div class="brentford-article__cover-clip">' +
        '<img src="./Brentford/image13.jpg" alt="Brentford FC and Mouftimatics: A Match Made in Appreciation" class="article-book-cover" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title" class="brentford-article__title">Brentford FC and Mouftimatics: A Match Made in Appreciation</h1>' +
      '<p class="brentford-article__p">In the glittering distraction economy of modern football, where clubs are valued by transfer spectacle and owners flex through nine-figure spending sprees, a different truth quietly asserts itself on the banks of the Thames. The greatest pleasure in the game no longer belongs to price or prestige. It belongs to perceived value. And no club on earth proves this more elegantly than Brentford FC.</p>' +
      '<p class="brentford-article__p">Mouftimatics, Omar Moufti\u2019s personal credo and ideology — coined by Doumani — rewires enjoyment at its root. Here the deepest dopamine does not flow from the object itself — the luxury car, the five-star seat, the superstar signing — but from the delta: the deal, the waste saved, the clever arbitrage between what is paid and what is gained. High earners happily choose the cheap, the leftover, the seemingly suboptimal, because the joy of the value gap eclipses comfort itself. Six precise layers complete the mindset: Value-High, Waste-Hack, Status-Subversion, Temporal Arbitrage, Meta-Network, and Thermokid Ascetic. This is not thrift. This is a philosophy of appreciation — raw, intelligent, and profoundly human.</p>' +
      '<p class="brentford-article__p">Now watch Brentford FC.</p>' +
      '<p class="brentford-article__p">Sitting 7th in the Premier League with five games remaining in the 2025/26 season, the Bees are on the verge of something historic: European qualification for the first time in their existence. While the Cushion Economy clubs chase Champions League guarantees with billionaire cheques, Brentford has achieved this ascent with ruthless efficiency. From 2021/22 to 2025/26, their total expenditure of \u20AC366.90 million ranks among the lowest of all clubs that have remained in the Premier League across those five consecutive seasons — a fraction of Chelsea\u2019s \u20AC1.828 billion, Arsenal\u2019s \u20AC992.4 million, or even mid-table peers like Aston Villa\u2019s \u20AC639 million. In the same period they generated \u20AC248.11 million from player sales — outpacing Arsenal\u2019s \u20AC222.49 million — resulting in a net spend of just \u20AC118.79 million. This is not survival. This is mastery.</p>' +
      '<p class="brentford-article__p">Data-driven recruitment that finds diamonds in lower leagues. Smart arbitrage on player contracts. Profitable sales of Bryan Mbeumo, Yoane Wissa, and Ivan Toney. A model that sells high and buys low without apology. Moneyball efficiency translated into the beautiful game. The club does not pretend to match the financial muscle of its neighbours. It does not need to. It wins by seeing value where others see only cost.</p>' +
      '<p class="brentford-article__p">This is no coincidence. It is convergence.</p>' +
      '<p class="brentford-article__p">Brentford\u2019s Finance Bro soul — competitive, bargain-hunting, obsessed with the delta — mirrors the Moufti Maddox archetype exactly. Its viral smart-underdog narrative feeds the Social Flexer layer. Its heavy analytics culture is pure Data Optimizer. In a league that rewards wasteful excess, Brentford chooses the harder path of disciplined appreciation. They reject the commodified illusion that more money equals better football. They prove, week after week, that character, systems, and intelligent mindset still matter more than the size of the cheque.</p>' +
      '<p class="brentford-article__p">In doing so they expose the deeper lie of our age: the belief that football, like life, must be won through accumulation and display. Mouftimatics and Brentford together offer the antidote — a Reflective Economy of sport where the joy lives in the craft of seeing clearly, acting wisely, and extracting maximum meaning from minimum waste. This is football returned to authenticity. This is character made visible on the pitch.</p>' +
      '<p class="brentford-article__callout">The game does not need more money.</p>' +
      '<p class="brentford-article__callout brentford-article__callout--tight">It needs more appreciation.</p>' +
      '<p class="brentford-article__iseeit"><strong>I see it.</strong></p>' +
    '</div>';

  var grassCeilingContent =
    '<div class="reflective-article-modal grass-ceiling-article">' +
      '<div class="grass-ceiling-article__cover">' +
        '<img src="./reflective/covers/14-grass-ceiling.png" alt="The Grass Ceiling: How Football\u2019s Invisible Barrier Keeps True Character Out of the Elite Dugout" class="grass-ceiling-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Grass Ceiling: How Football\u2019s Invisible Barrier Keeps True Character Out of the Elite Dugout</h1>' +
      '<p>In the glittering distraction economy of modern football, the pitch is sold as the ultimate meritocracy. Yet above the touchline there exists an invisible, ironclad barrier — the <strong>Grass Ceiling</strong>. It is not made of glass. It is made of networks, pedigree, fast-tracked credentials, and the quiet, institutional assumption that only those who once wore the shirt can truly lead from the dugout.</p>' +
      '<p>This is the Grass Ceiling.</p>' +
      '<p>It is the systemic gatekeeping that allows former professional players to bypass the hardest years of the UEFA Pro Licence pathway while non-players are forced to labour through unpaid experience, lost wages, and decades of invisible qualification.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 3</strong><br>' +
        'Globally, roughly 67% of all head coaches are former professional players; in the Big Five European leagues that figure rises to between 75% and 85%.' +
      '</div>' +
      '<p>It is the network effect that grants ex-players instant access to sporting directors, player agencies, and media power brokers — connections no amount of tactical brilliance or inner work can replicate for outsiders.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 4</strong><br>' +
        'The network effect gives ex-players preferential access to job interviews, backroom endorsements, and media influence that non-players, regardless of tactical brilliance or formal qualifications, simply cannot replicate.' +
      '</div>' +
      '<p>And it is the racial disparity that keeps Black talent on the pitch but rarely in the technical area.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 1</strong><br>' +
        'Black players constitute over 40% of the Premier League and nearly 35% of the English Football League, yet remain radically underrepresented in managerial positions.' +
      '</div>' +
      '<div class="fact-callout">' +
        '<strong>Fact 2</strong><br>' +
        'White or non-Black ex-players are 50% more likely to transition into management than Black ex-players possessing equivalent playing credentials and equivalent UEFA qualifications (Black Footballers Partnership / University of Liverpool study).' +
      '</div>' +
      '<p>These are not anomalies. They are the architecture of the Grass Ceiling. The system does not merely prefer ex-players — it is engineered to protect them. The UEFA Pro Licence pathway, the fast-track admissions, the unspoken requirement of \u201cdressing-room credibility\u201d — all of it functions as an institutional cartel that commodifies playing pedigree while punishing the very character, discipline, and reflective intelligence the game claims to celebrate.</p>' +
      '<p>They will tell you this is merit. They will say former players bring authority, leadership, and an instinctive understanding of the dressing room. We anticipate the objection. And we reject it. Character is not inherited from a playing CV. Tactical mastery is not absorbed through shin pads. The data proves that a generalised elite playing career is not a reliable predictor of managerial success. What the system truly rewards is familiarity, not excellence; bloodline, not brilliance.</p>' +
      '<p>The Grass Ceiling is not accidental. It is the logical endpoint of a sport that has surrendered to the Cushion Economy — where risk is outsourced to the familiar face, where boards protect themselves with recognisable names rather than betting on the unknown mind that has done the deeper inner work.</p>' +
      '<p>Yet the antidote is already visible. The laptop managers, the video analysts, the self-taught tacticians who enter through the side door are proving, match after match, that inner clarity and systemic intelligence can outperform inherited status. The revolution is quiet. It is data-driven. It is character-led. And it is inevitable.</p>' +
      '<p>Football does not need more ex-players in the dugout.</p>' +
      '<p>It needs more authentic leaders on the touchline.</p>' +
      '<p>To shatter the Grass Ceiling we must:</p>' +
      '<ul class="grass-ceiling-reforms">' +
        '<li>Adopt the Spanish subsidisation model across Europe so that talent, not wealth, determines access to the Pro Licence.</li>' +
        '<li>Decouple playing CVs from admission and hiring priorities — replace them with blinded tactical and pedagogical examinations.</li>' +
        '<li>Enforce a European Rooney Rule equivalent: every head-coach vacancy must include at least one qualified candidate from an underrepresented background.</li>' +
        '<li>Ring-fence broadcasting revenues for targeted scholarships aimed at non-playing, minority-ethnic, and lower-socioeconomic coaches.</li>' +
      '</ul>' +
      '<p>The game that claims to be the most beautiful on earth cannot continue to operate as the most exclusive syndicate behind the scenes. The Grass Ceiling must fall.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var laptopManagersContent =
    '<div class="reflective-article-modal laptop-managers-article">' +
      '<div class="laptop-managers-article__cover">' +
        '<img src="./reflective/covers/15-laptop-managers.png" alt="The Laptop Managers Are Coming: How Non-Players Are Quietly Proving That Inner Work Beats Playing Pedigree" class="laptop-managers-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Laptop Managers Are Coming: How Non-Players Are Quietly Proving That Inner Work Beats Playing Pedigree</h1>' +
      '<p>In the glittering distraction economy of modern football, the dugout has long been the private preserve of those who once wore the shirt. Yet a silent revolution is underway. A new archetype is rising from the shadows of the video room and the glow of the laptop screen.</p>' +
      '<p>This is the Laptop Manager.</p>' +
      '<p>They never played at the elite level. They did not inherit dressing-room authority or fast-tracked UEFA Pro Licences. They entered through the side door — through relentless study, data, video analysis, and the deep inner work that the system never required of them.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 5</strong><br>' +
        'Econometric studies from the University of Liverpool prove that a generalised elite playing career is not a reliable predictor of managerial success.' +
      '</div>' +
      '<p>Julian Nagelsmann never made a senior appearance. Brendan Rodgers retired from non-league football at twenty due to injury. Will Still taught himself tactics through the video game Football Manager. Arrigo Sacchi was a shoe salesman who played only amateur football. Yet each of them has managed at the highest level and won major trophies.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 6</strong><br>' +
        'The modern game\u2019s heavy reliance on data analytics, video scouting, and tactical periodization has carved out a new entry pipeline for non-players — the \u201claptop manager\u201d who enters through the video analysis room rather than the dressing room.' +
      '</div>' +
      '<p>They will tell you this cannot last. They will say the dressing room demands credibility that only former players possess. We anticipate the objection. And we reject it. Character is not inherited from shin pads. Tactical mastery is not absorbed through muscle memory. The data is clear: inner clarity, reflective intelligence, and relentless systems thinking now outperform inherited status.</p>' +
      '<p>The Laptop Managers are not anomalies. They are the future. They expose the deeper lie of the Grass Ceiling — that football must remain the private syndicate of the playing aristocracy. They prove that the game still belongs to those willing to do the deeper inner work.</p>' +
      '<p>Football does not need more ex-players in the dugout.</p>' +
      '<p>It needs more minds that have done the real work.</p>' +
      '<p>The revolution is quiet. It is data-driven. It is character-led. And it is inevitable.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var pricedOutTouchlineContent =
    '<div class="reflective-article-modal priced-out-touchline-article">' +
      '<div class="priced-out-touchline-article__cover">' +
        '<img src="./reflective/covers/16-priced-out-touchline.png" alt="Priced Out of the Touchline: The \u20AC100,000 Barrier That Keeps Authentic Coaches Trapped in the Distraction Economy" class="priced-out-touchline-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Priced Out of the Touchline: The \u20AC100,000 Barrier That Keeps Authentic Coaches Trapped in the Distraction Economy</h1>' +
      '<p>In the glittering distraction economy of modern football, the pitch is sold as open to anyone with talent. The dugout tells a different story. There is a price tag on entry — and it is deliberately exorbitant.</p>' +
      '<p>This is the price barrier.</p>' +
      '<p>The UEFA Pro Licence pathway is not merely a qualification. It is a financial endurance test designed to filter out all but the wealthy, the sponsored, or the already-rich ex-player.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 7</strong><br>' +
        'Spain offers the most accessible pathway in Europe with a total C-to-Pro cost of roughly \u20AC3,500.' +
      '</div>' +
      '<p>Contrast this with England (\u00A315,000\u2013\u00A318,000), Germany (~\u20AC22,000), and France (~\u20AC25,000). The disparity is not accidental. It is structural.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 8</strong><br>' +
        'For non-players the true cost is not just tuition — it is the \u20AC50,000 to \u20AC100,000 in lost wages and opportunity costs over the five-to-seven-year journey, while ex-players retire with wealth that insulates them entirely from this macroeconomic friction.' +
      '</div>' +
      '<p>There are no student loans, no corporate sponsorship pipelines, no safety nets. Only those who can afford to disappear from the workforce for years can complete the journey.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 9</strong><br>' +
        'The English FA charges \u00A33,645 for the A Licence and \u00A39,890\u2013\u00A312,000 for the Pro Licence alone. Germany\u2019s Pro Licence recently soared to \u20AC19,000.' +
      '</div>' +
      '<p>They will tell you this is necessary to maintain standards. We anticipate the objection. And we reject it. Standards are not protected by price. They are protected by rigour. What this system truly protects is the Cushion Economy — the quiet preservation of power for those who already possess capital and pedigree.</p>' +
      '<p>The price barrier does not select for the best coaches. It selects for the richest — or the luckiest ex-players. It keeps the reflective, the hungry, the self-taught minds locked outside the touchline.</p>' +
      '<p>Football does not need more expensive credentials.</p>' +
      '<p>It needs more authentic leaders on the touchline.</p>' +
      '<p>To tear down the price barrier we must:</p>' +
      '<ul class="reflective-article-reforms">' +
        '<li>Adopt the Spanish subsidisation model continent-wide, treating coach education as a public good rather than a luxury product.</li>' +
        '<li>Introduce structured scholarships and low-interest pathways for non-playing and lower-socioeconomic candidates.</li>' +
        '<li>Decouple financial status from admission entirely.</li>' +
        '<li>Ring-fence a portion of broadcasting revenues specifically for democratising the Pro Licence pathway.</li>' +
      '</ul>' +
      '<p>The game that claims to be the most beautiful on earth cannot continue to price its future out of existence. The barrier must fall.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var dugoutAristocracyContent =
    '<div class="reflective-article-modal dugout-aristocracy-article">' +
      '<div class="dugout-aristocracy-article__cover">' +
        '<img src="./reflective/covers/17-dugout-aristocracy.png" alt="The Dugout Aristocracy: How UEFA Engineered a Coaching Pathway That Rewards Pedigree Over Character" class="dugout-aristocracy-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Dugout Aristocracy: How UEFA Engineered a Coaching Pathway That Rewards Pedigree Over Character</h1>' +
      '<p>In the glittering distraction economy of modern football, the pitch is sold as the ultimate meritocracy. The dugout tells a different story. It is a closed aristocracy — engineered by design.</p>' +
      '<p>This is the Dugout Aristocracy.</p>' +
      '<p>The UEFA Pro Licence pathway is not a neutral qualification system. It is a multi-year endurance test deliberately structured to protect those who already possess playing pedigree while making entry almost impossible for everyone else.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 10</strong><br>' +
        'The full pathway from UEFA C to Pro Licence demands a minimum of 720 hours of formal instruction — plus hundreds more hours of independent study, match analysis, and mandatory practical experience.' +
      '</div>' +
      '<p>The structure is strictly linear. Each tier must be completed before the next. Waiting periods, full seasons of club-based experience, and gated admissions create a five-to-seven-year obstacle course.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 11</strong><br>' +
        'National associations explicitly grant priority admissions and fast-tracked routes to candidates with significant professional playing experience.' +
      '</div>' +
      '<p>The English FA, the German DFB, and the Scottish FA all openly prioritise former players, allowing them to bypass practical experience thresholds that non-players must labour through for years.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 12</strong><br>' +
        'To even be admitted onto the UEFA Pro Diploma course, a candidate must already hold a UEFA A Licence and have completed at least one full year of elite-level coaching experience after obtaining it.' +
      '</div>' +
      '<p>They will tell you this is about maintaining standards and protecting player welfare. We anticipate the objection. And we reject it. Standards are not preserved by pedigree. They are preserved by rigour, reflection, and character. What this system truly preserves is the aristocracy — the quiet, institutional guarantee that the dugout remains the inheritance of those who once played the game.</p>' +
      '<p>The Dugout Aristocracy does not select for the best coaches. It selects for the most familiar faces. It commodifies playing history while punishing the very inner work and reflective intelligence the modern game demands.</p>' +
      '<p>Football does not need more inherited authority in the dugout.</p>' +
      '<p>It needs more character on the touchline.</p>' +
      '<p>To dismantle the Dugout Aristocracy we must:</p>' +
      '<ul class="reflective-article-reforms">' +
        '<li>Abolish all fast-track privileges based on playing CVs.</li>' +
        '<li>Replace experience gates with blinded tactical and pedagogical entrance examinations.</li>' +
        '<li>Make the entire pathway accessible through universal subsidisation, modelled on Spain\u2019s approach.</li>' +
        '<li>Decouple admission entirely from prior playing status.</li>' +
      '</ul>' +
      '<p>The game that claims to be the most beautiful on earth cannot continue to operate as an inherited syndicate. The aristocracy must fall.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var reclaimingTouchlineContent =
    '<div class="reflective-article-modal reclaiming-touchline-article">' +
      '<div class="reclaiming-touchline-article__cover">' +
        '<img src="./reflective/covers/18-reclaiming-touchline.png" alt="Reclaiming the Touchline: Why Football Must Burn the UEFA Pro Licence Cartel and Build a Reflective Coaching Economy" class="reclaiming-touchline-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Reclaiming the Touchline: Why Football Must Burn the UEFA Pro Licence Cartel and Build a Reflective Coaching Economy</h1>' +
      '<p>In the glittering distraction economy of modern football, the pitch is sold as the ultimate meritocracy. The dugout tells a different story. It is a closed aristocracy — engineered by design.</p>' +
      '<p>This is the moment of reclamation.</p>' +
      '<p>The UEFA Pro Licence system is not broken. It is working exactly as designed — to protect pedigree, preserve the Cushion Economy, and keep the touchline as an inherited privilege rather than a meritocratic space.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 13</strong><br>' +
        'Spain\u2019s heavily subsidised model produces over 15,000 UEFA A and Pro Licence holders — the deepest, most educated coaching talent pool in Europe.' +
      '</div>' +
      '<p>Contrast this with the United States, where the USSF Pro License costs a staggering $10,000 in base tuition alone, and with many other confederations that mirror UEFA\u2019s prohibitive pricing.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 14</strong><br>' +
        'CONMEBOL has introduced monthly instalment payments and hybrid models, softening the financial shock and opening the pathway to a wider pool of candidates.' +
      '</div>' +
      '<p>The evidence is overwhelming. When education is treated as a public good rather than a luxury product, the talent pool deepens dramatically. When barriers of pedigree and price are lowered, character and reflective intelligence finally have room to breathe.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 15</strong><br>' +
        'The most effective reform proposals include universal adoption of the Spanish subsidisation model, decoupling playing CVs from admission, mandatory bursaries, and a European equivalent of the Rooney Rule.' +
      '</div>' +
      '<p>They will tell you radical reform is unrealistic. We anticipate the objection. And we reject it. The current cartel is not inevitable. It is a choice. A choice that commodifies ambition and starves the game of its most reflective minds. We have the models. We have the data. We have the moral imperative.</p>' +
      '<p>The time has come to burn the cartel and build a Reflective Coaching Economy — one where access is determined by talent, inner work, and character, not by wealth or inherited status.</p>' +
      '<p>Football does not belong to the aristocracy.</p>' +
      '<p>It belongs to those willing to do the deeper work.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var uefaFinesBloodlineContent =
    '<div class="reflective-article-modal uefa-fines-bloodline-article">' +
      '<div class="uefa-fines-bloodline-article__cover">' +
        '<img src="./reflective/covers/19-uefa-fines-bloodline.png" alt="\u20AC25,000 Fines for the Wrong Bloodline: UEFA\u2019s Rigid Rules, Emergency Loopholes, and the Institutional Cartel That Protects Ex-Players" class="uefa-fines-bloodline-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">\u20AC25,000 Fines for the Wrong Bloodline: UEFA\u2019s Rigid Rules, Emergency Loopholes, and the Institutional Cartel That Protects Ex-Players</h1>' +
      '<p>In the glittering distraction economy of modern football, the rules are clear — until they are not. The UEFA Pro Licence is not a suggestion. It is a non-negotiable legal prerequisite for managing in European competition.</p>' +
      '<p>This is the rule.</p>' +
      '<p>Under Article 47 of the UEFA Club Licensing and Financial Sustainability Regulations, the head coach of any team in the Champions League, Europa League or Conference League must hold the full UEFA Pro Diploma. Fail to comply and the club is ineligible — no matter how well they performed on the pitch.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 16</strong><br>' +
        'The Pro Licence is an absolute requirement for club competition entry. Without it, a club fails the licensing audit and is barred from UEFA competitions regardless of sporting qualification.' +
      '</div>' +
      '<p>Assistant coaches are increasingly required to hold at least a UEFA A Licence, with top clubs now demanding Pro Licences across the entire senior staff. The system is watertight — except when it is not.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 17</strong><br>' +
        'When Will Still was appointed head coach of Stade de Reims in Ligue 1 while still completing his Pro Licence, the French Football Federation fined the club \u20AC25,000 for every single match he managed.' +
      '</div>' +
      '<p>Yet the system has always kept a back door open for the right bloodline. In 2006, Gareth Southgate was granted a full-season dispensation by the Premier League after Middlesbrough lobbied on his behalf — despite holding neither the A nor the Pro Licence.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 18</strong><br>' +
        'Emergency dispensations are granted for short 12-week periods when a caretaker is promoted mid-season, but long-term exceptions remain rare, controversial, and almost exclusively awarded to high-profile former players.' +
      '</div>' +
      '<p>They will tell you these loopholes are pragmatic necessities in a volatile industry. We anticipate the objection. And we reject it. The rigidity is merciless for outsiders and miraculously flexible for insiders. This is not pragmatism. This is an institutional cartel that protects the playing aristocracy at all costs.</p>' +
      '<p>The rules do not exist to guarantee quality. They exist to guarantee continuity of power.</p>' +
      '<p>Football does not need more loopholes for the chosen few.</p>' +
      '<p>It needs one rule that applies to everyone.</p>' +
      '<p>To end the cartel we must:</p>' +
      '<ul class="reflective-article-reforms">' +
        '<li>Remove all emergency dispensations and fast-track exceptions based on playing pedigree.</li>' +
        '<li>Enforce the Pro Licence requirement with absolute consistency — no lobbying, no exceptions.</li>' +
        '<li>Make the entire licensing process transparent and subject to independent audit.</li>' +
        '<li>Replace the current system with a truly merit-based framework that values character and competence above inherited status.</li>' +
      '</ul>' +
      '<p>The game that claims to be the most beautiful on earth cannot continue to operate with two sets of rules. The cartel must fall.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var positionalCasteDugoutContent =
    '<div class="reflective-article-modal positional-caste-dugout-article">' +
      '<div class="positional-caste-dugout-article__cover">' +
        '<img src="./reflective/covers/20-positional-caste-dugout.png" alt="Why Midfielders Rule the Dugout and Goalkeepers Never Will: The Hidden Positional Caste System in Elite Coaching" class="positional-caste-dugout-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Why Midfielders Rule the Dugout and Goalkeepers Never Will: The Hidden Positional Caste System in Elite Coaching</h1>' +
      '<p>In the glittering distraction economy of modern football, the Grass Ceiling has many layers. One of the most invisible — and most revealing — is positional.</p>' +
      '<p>This is the positional caste system.</p>' +
      '<p>Even among former professional players, not all positions are created equal when it comes to reaching the elite dugout. Some histories open doors. Others are quietly shut.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 19</strong><br>' +
        'Globally, roughly 67% of all head coaches are former professional players; in the Big Five European leagues that figure rises to between 75% and 85%.' +
      '</div>' +
      '<p>Within that ex-player majority, a clear hierarchy emerges.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 20</strong><br>' +
        'Midfielders make up 42.4% of coaches, defenders 34.5%, forwards 19.6%, and goalkeepers only 3.5%.' +
      '</div>' +
      '<p>Midfielders and defenders are significantly overrepresented relative to their playing population. Goalkeepers are the most severely underrepresented group of all.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 21</strong><br>' +
        'Midfielders (+4.3%) and defenders (+4.2%) are overrepresented, while goalkeepers are underrepresented by -5.7%.' +
      '</div>' +
      '<p>They will tell you this is natural — that central midfielders develop the tactical vision and leadership required to manage. We anticipate the objection. And we reject it. The data proves that a generalised elite playing career is not a reliable predictor of managerial success. What we are seeing is not merit. It is another layer of the Grass Ceiling — a hidden positional caste system that decides who is allowed to lead before they ever step onto the touchline.</p>' +
      '<p>Non-players already face the financial and network barriers. Goalkeepers face an additional, almost invisible one. The system does not select for the best minds. It selects for the most familiar archetypes.</p>' +
      '<p>Football does not need more midfielders in the dugout.</p>' +
      '<p>It needs every position — and every background — to have a real chance.</p>' +
      '<p>To break the positional caste system we must:</p>' +
      '<ul class="reflective-article-reforms">' +
        '<li>Actively recruit and develop goalkeepers and non-players into senior coaching pathways.</li>' +
        '<li>Remove all positional bias from hiring and promotion criteria.</li>' +
        '<li>Expand the definition of \u201crelevant experience\u201d beyond traditional playing pedigrees.</li>' +
        '<li>Create targeted programmes that identify and fast-track talent from underrepresented positions and backgrounds.</li>' +
      '</ul>' +
      '<p>The game that claims to be the most beautiful on earth cannot continue to operate with invisible hierarchies. The positional caste must fall.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var wrexhamExceptionContent =
    '<div class="reflective-article-modal wrexham-exception-article">' +
      '<div class="wrexham-exception-article__cover">' +
        '<img src="./reflective/covers/09-wrexham.png" alt="Wrexham Ownership Exception" class="wrexham-exception-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Wrexham Ownership Exception</h1>' +
      '<p>There is a fundamental misunderstanding across industries and the sports sector is another cog or marionette.</p>' +
      '<p>Leaders today in sports are often criticised for ticket prices, ignoring the culture of their football club, reckless spending, poor decisions concerning staff, and the fans are correct at pointing the finger at leadership.</p>' +
      '<p>While most leaders in sport are focusing on the business bottom line they disregard the quality of life for their fans even with the Orwellian doublespeak of "football is nothing without fans". What they really want to say is that "football is nothing without fans with buckets of cash."</p>' +
      '<p>There are, of course, exceptions and it has been documented at Wrexham. Ownership have consistently communicated the value of the community and always take into consideration their fan base while making business decisions.</p>' +
      '<p>The owners at Wrexham, although labelled derogatorily as "Hollywood ownership" because they have Hollywood money, also possess creative-arts sensibilities. Their empathy and business acumen has lifted a whole town back to life. And this is not hyperbole. Wrexham was bleak but now the spotlight is casting rays of hope that are putting the other owners to shame.</p>' +
      '<p>It\u2019s one thing to say "football is nothing without fans" and it is another to mean it. The Wrexham owners have given a roadmap that it is possible to make money while improving the quality of life of a city and football fans.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var polySupportRevolutionContent =
    '<div class="reflective-article-modal poly-support-revolution-article">' +
      '<div class="poly-support-revolution-article__cover">' +
        '<img src="./reflective/covers/22-poly-support-revolution.png" alt="The Poly-Support Revolution: How Female Fans Are Quietly Dismantling the Toxic Tribalism of Modern Football" class="poly-support-revolution-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Poly-Support Revolution: How Female Fans Are Quietly Dismantling the Toxic Tribalism of Modern Football</h1>' +
      '<p>In the glittering distraction economy of modern football, the terraces have long been ruled by a single, rigid commandment: one club, one loyalty, one tribe. This is the old Grass Ceiling of fandom — toxic, male, territorial, and increasingly brittle.</p>' +
      '<p>A new force is rising beneath it.</p>' +
      '<p>It does not chant the same songs. It does not wear the same blind allegiance. It arrives through TikTok, through player stories, through joy rather than inherited hatred. It is the Poly-Support Revolution — led by female fans who refuse the old rules.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 25</strong><br>' +
        'Globally, 49% of women now express an active interest in football, with one in five identifying as \u201cstrongly enthusiastic.\u201d' +
      '</div>' +
      '<p>These fans are younger, digitally native, and fundamentally different in how they consume the game.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 26</strong><br>' +
        '35% of female fans practice poly-support — they actively care about multiple teams within the same league, rejecting the rigid, singular tribalism that has defined male fandom for generations.' +
      '</div>' +
      '<p>They discover clubs through storytelling, behind-the-scenes content, and individual players rather than inherited geography or historical hatred. TikTok is their primary gateway — used almost twice as much by women as by men.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 27</strong><br>' +
        'The rise of the Women\u2019s Super League is creating a massive halo effect: five of the top 25 most-followed sports teams in the UK are now women\u2019s squads, drawing new, less toxic audiences into the broader football ecosystem.' +
      '</div>' +
      '<p>They will tell you these fans are \u201ccasual,\u201d \u201cnot real,\u201d or \u201cjust in it for the aesthetics.\u201d We anticipate the objection. And we reject it. What they call casual is actually reflective. What they dismiss as disloyalty is actually freedom from the old commodified tribalism. The data proves that this new audience is younger, more diverse, more engaged — and far less prone to the toxicity that has poisoned the terraces for decades.</p>' +
      '<p>The Poly-Support Revolution is not a threat to football. It is the antidote. It dismantles the last Grass Ceiling of the sport — the one that said loyalty must be singular, blind, and inherited. In its place it offers something far more human: choice, joy, and genuine connection.</p>' +
      '<p>Football does not need more single-club warriors.</p>' +
      '<p>It needs more minds capable of loving the game without hating the other side.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var tacticalMirrorContent =
    '<div class="reflective-article-modal tactical-mirror-article">' +
      '<div class="tactical-mirror-article__cover">' +
        '<img src="./reflective/covers/23-tactical-mirror.png" alt="The Tactical Mirror: How a Nation\u2019s Playing Style Forges the Soul of Its Fans" class="tactical-mirror-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Tactical Mirror: How a Nation\u2019s Playing Style Forges the Soul of Its Fans</h1>' +
      '<p>In the glittering distraction economy of modern football, we are told that fans are simply consumers of spectacle. The truth is deeper. Every nation\u2019s historical playing style acts as a mirror that reveals the very soul of its supporters.</p>' +
      '<p>This is the Tactical Mirror.</p>' +
      '<p>The way a country plays on the pitch unconsciously shapes how its people behave on the terraces. Tactical philosophy becomes cultural psychology. Style becomes character.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 28</strong><br>' +
        'Japanese and Senegalese fans are universally recognised as the most respectful and sincere, systematically cleaning stadiums after matches regardless of victory or defeat.' +
      '</div>' +
      '<p>Scotland stands as the most fun and friendly fan base, maintaining celebratory, inclusive atmospheres even in heavy defeat.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 29</strong><br>' +
        'Dutch fans self-identify as the most \u201coutgoing,\u201d a direct psychological reflection of the expansive, fluid, creative \u201cTotal Football\u201d philosophy their nation pioneered.' +
      '</div>' +
      '<p>Spain\u2019s fans describe themselves as perfectionist yet insecure — the exact emotional echo of tiki-taka\u2019s demand for geometric precision and absolute possession.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 30</strong><br>' +
        'Italian fans are statistically the most likely to call themselves \u201cdullest\u201d or \u201cboring,\u201d the natural inheritance of a defensive, risk-averse catenaccio tradition.' +
      '</div>' +
      '<p>They will tell you these are mere stereotypes. We anticipate the objection. And we reject it. The data is clear: tactical identity does not stop at the final whistle. It lives on in the stands. The way a nation plays becomes the way its people feel, celebrate, suffer, and behave.</p>' +
      '<p>This Tactical Mirror exposes the deeper truth of the distraction economy: football has never been just about results. It has always been about identity. The style on the pitch forges the character on the terraces.</p>' +
      '<p>The game does not only shape players.</p>' +
      '<p>It shapes entire peoples.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var hotSauceParadigmContent =
    '<div class="reflective-article-modal hot-sauce-paradigm-article">' +
      '<div class="hot-sauce-paradigm-article__cover">' +
        '<img src="./reflective/covers/24-hot-sauce-paradigm.png" alt="The Hot Sauce Paradigm: The Biochemical Truth Behind Football\u2019s Most Violent and Irritable Fan Bases" class="hot-sauce-paradigm-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Hot Sauce Paradigm: The Biochemical Truth Behind Football\u2019s Most Violent and Irritable Fan Bases</h1>' +
      '<p>In the glittering distraction economy of modern football, we speak of passion on the terraces as if it were always noble. We rarely admit the darker truth: some fan bases are wired for violence.</p>' +
      '<p>This is the Hot Sauce Paradigm.</p>' +
      '<p>Controlled laboratory experiments have proven that football fandom is not merely emotional. It is biochemical. When fans watch their team lose to a rival, a measurable spike in proactive aggression occurs — especially when they perceive systemic injustice, such as a biased referee.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 31</strong><br>' +
        'In the \u201chot sauce paradigm\u201d study, fans with lower baseline cortisol levels administered significantly more punishment to rival supporters after a loss, proving that a portion of football aggression is proactive and deeply anti-social rather than purely reactive.' +
      '</div>' +
      '<p>This biological vulnerability collides with specific cultural and socio-economic conditions to produce the most violent fan bases on earth.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 32</strong><br>' +
        'Polish hooligan factions, Western Balkan ultras, and certain South American barras bravas are widely recognised by law enforcement as among the most organised, combative, and violent in the world.' +
      '</div>' +
      '<p>In Turkey, clinical aggression scores among Be\u015Fikta\u015F, Fenerbah\u00E7e, and Galatasaray fans are the highest recorded, driven by youth unemployment and fierce territorial rivalries.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 33</strong><br>' +
        'In the 2023/24 English football season, arrests rose 14%, with a 42% spike in public disorder. 99.4% of Football Banning Orders were issued to males, 68% aged 18\u201334. Cocaine use now accounts for 19% of all arrests.' +
      '</div>' +
      '<p>They will tell you this is just \u201cpassion.\u201d We anticipate the objection. And we reject it. Passion does not require premeditated violence, organised crime links, or biochemical triggers. What we are witnessing is the toxic collision of evolutionary bonding rituals, perceived injustice, low cortisol, and socio-economic despair — all commodified and amplified by the distraction economy.</p>' +
      '<p>The terraces have become a pressure valve for deeper societal fractures. The game did not create this violence. It simply gave it a stage.</p>' +
      '<p>Football does not need more \u201cpassionate\u201d ultras.</p>' +
      '<p>It needs fewer excuses for proactive hatred.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var plFanbaseCasteContent =
    '<div class="reflective-article-modal pl-fanbase-caste-article">' +
      '<div class="pl-fanbase-caste-article__cover">' +
        '<img src="./reflective/covers/25-pl-fanbase-caste.png" alt="Wolves Are the Most Toxic, Chelsea the Least Patient: The Hidden Caste System of Premier League Fanbases" class="pl-fanbase-caste-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Wolves Are the Most Toxic, Chelsea the Least Patient: The Hidden Caste System of Premier League Fanbases</h1>' +
      '<p>In the glittering distraction economy of modern football, we pretend that all supporters are equal. The data tells a different story. Within the Premier League there exists a hidden caste system — not of wealth or status, but of collective character.</p>' +
      '<p>This is the Caste System of the Terraces.</p>' +
      '<p>Some fanbases are wired for toxicity. Others for impatience. A rare few for rationality and sincerity. The differences are not accidental. They are the living expression of each club\u2019s culture, ownership, and recent history.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 34</strong><br>' +
        'Wolverhampton Wanderers fans record the highest proportion of vulgar, hostile, and aggressive online comments (7.43%) among all Premier League clubs.' +
      '</div>' +
      '<p>Everton\u2019s supporters, trapped in prolonged institutional mismanagement and relegation battles, have developed a highly volatile stadium atmosphere that can turn overtly hostile toward their own players and board.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 35</strong><br>' +
        'Chelsea possesses the least patient fan base in the Premier League, with permanent managers surviving an average of just 623 days in the modern era.' +
      '</div>' +
      '<p>In stark contrast, Aston Villa fans rank as the happiest and most rational, elevated by genuine tactical progress rather than financial doping.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 36</strong><br>' +
        'Fulham, Ipswich Town, and Brentford fans are among the most sincere and respectful, recording the lowest rates of digital toxicity and grounded appreciation for mere Premier League survival.' +
      '</div>' +
      '<p>They will tell you these differences are trivial or merely the product of recent results. We anticipate the objection. And we reject it. The data reveals something deeper: each club\u2019s fanbase is a living reflection of its ownership philosophy, tactical identity, and institutional stability. The terraces do not lie. They expose the true character of the institution they support.</p>' +
      '<p>This hidden caste system is the final frontier of the Grass Ceiling in football. It shows that fandom itself has become stratified — some clubs breed entitlement and rage, others breed reflection and sincerity.</p>' +
      '<p>Football does not need more toxic or impatient supporters.</p>' +
      '<p>It needs more fanbases capable of genuine rationality and respect.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var playerDrivenFandomContent =
    '<div class="reflective-article-modal player-driven-fandom-article">' +
      '<div class="player-driven-fandom-article__cover">' +
        '<img src="./reflective/covers/26-player-driven-fandom.png" alt="Son Heung-min Owns South Korea and Mitoma Owns Japan: The Rise of Player-Driven Fandom and the Death of Traditional Tribal Loyalty" class="player-driven-fandom-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Son Heung-min Owns South Korea and Mitoma Owns Japan: The Rise of Player-Driven Fandom and the Death of Traditional Tribal Loyalty</h1>' +
      '<p>In the glittering distraction economy of modern football, we still pretend that club loyalty is rooted in geography, history, and local blood. The data reveals a quieter, more radical truth: loyalty is increasingly tethered to a single player.</p>' +
      '<p>This is the rise of Player-Driven Fandom.</p>' +
      '<p>In certain global markets, fans no longer pledge allegiance to a crest or a city. They pledge to a person. The player has become the club.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 37</strong><br>' +
        'An extraordinary 42.3% of all football fans in South Korea actively support Tottenham Hotspur solely because of their national captain, Son Heung-min.' +
      '</div>' +
      '<p>In Japan, Brighton &amp; Hove Albion — a club with modest domestic history — has rapidly acquired a substantial following driven almost exclusively by the success of winger Kaoru Mitoma.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 38</strong><br>' +
        'In these Asian markets, 58% of South Korean fans and 49% of Japanese fans openly admit their club support is contingent upon the presence of a national star player.' +
      '</div>' +
      '<p>This is not traditional tribalism. This is fluid, individualistic, player-centric loyalty. The crest is secondary. The human story is primary.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 39</strong><br>' +
        'Globally, an estimated 86.6% of football fans actively follow clubs outside their domestic leagues, and 33% consider a foreign team their absolute primary club.' +
      '</div>' +
      '<p>They will tell you this is shallow, temporary, or \u201cnot real fandom.\u201d We anticipate the objection. And we reject it. What they call shallow is actually reflective. What they dismiss as disloyalty is the natural evolution of a globalised game. The old model of inherited, territorial, often toxic tribalism is being replaced by something more human: choice based on inspiration, excellence, and personal connection.</p>' +
      '<p>Player-Driven Fandom is not the death of loyalty. It is the birth of a more honest, more meritocratic, and ultimately more sustainable form of love for the game.</p>' +
      '<p>The future of football does not belong to the crest.</p>' +
      '<p>It belongs to the player who earns it.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var ritualBeforeKickoffContent =
    '<div class="reflective-article-modal ritual-before-kickoff-article">' +
      '<div class="ritual-before-kickoff-article__cover">' +
        '<img src="./reflective/covers/27-ritual-before-kickoff.png" alt="The Ritual Before the Kick-Off: How Football Fandom Became the Last True Religion in the Distraction Economy" class="ritual-before-kickoff-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Ritual Before the Kick-Off: How Football Fandom Became the Last True Religion in the Distraction Economy</h1>' +
      '<p>In the glittering distraction economy of modern football, the match itself is increasingly secondary. The real event happens before a single ball is kicked.</p>' +
      '<p>This is the Ritual Before the Kick-Off.</p>' +
      '<p>Football fandom has become the last true religion of our age — a primal, communal ceremony that delivers endorphins, belonging, and meaning in a world stripped of them by commodification and screens.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 40</strong><br>' +
        'Evolutionary neuroscience shows that the low-scoring, highly variable outcomes of football trigger profound reward prediction errors in the human brain, creating intense motivation and emotional investment.' +
      '</div>' +
      '<p>The matchday experience functions as a modern ritualistic practice — one that releases endorphins, reduces baseline anxiety, and fosters \u201ccollective effervescence,\u201d the powerful sociological phenomenon of shared emotional arousal.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 41</strong><br>' +
        'In the \u201cRua de Fogo\u201d (Street of Fire) ritual in Brazil, physiological monitoring revealed that fan arousal actually peaked during the pre-match gathering with flares and chants — not during the game itself.' +
      '</div>' +
      '<p>The communal ritual of belonging has become more biologically rewarding than the sporting contest. The game is now merely the excuse for the deeper human need: to stand shoulder to shoulder, to feel part of something ancient and alive.</p>' +
      '<div class="fact-callout">' +
        '<strong>Fact 42</strong><br>' +
        'This in-group bonding inevitably engenders out-group hostility — the same evolutionary mechanism that once protected tribes now fuels terrace conflict, online toxicity, and hooliganism.' +
      '</div>' +
      '<p>They will tell you this is just entertainment. We anticipate the objection. And we reject it. Entertainment does not require flares at 3 a.m., stadium-cleaning rituals after defeat, or biochemical spikes that surpass the game itself. What we are witnessing is the last surviving form of uncommodified communal transcendence in a world engineered to isolate and distract us.</p>' +
      '<p>In the age of the distraction economy, football fandom remains the final ritual where millions still gather, feel, and belong — raw, imperfect, and profoundly human.</p>' +
      '<p>The pitch is the altar.</p>' +
      '<p>The terraces are the congregation.</p>' +
      '<p><strong>So be it.</strong></p>' +
    '</div>';

  var como1907MiracleContent =
    '<div class="reflective-article-modal como-1907-miracle-article">' +
      '<div class="como-1907-miracle-article__cover">' +
        '<img src="./reflective/covers/12-como-1907.png" alt="The Como 1907 Miracle: Patience, Intelligence, and the Quiet Alchemy of Cesc Fàbregas" class="como-1907-miracle-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Como 1907 Miracle: Patience, Intelligence, and the Quiet Alchemy of Cesc Fàbregas</h1>' +
      '<p>While Inter Milan, Juventus, and Napoli continue their familiar battle for the Scudetto, the defining story of the 2025/26 Serie A season unfolds quietly by the lake in Como. Hovering between 4th and 6th place, actively threatening a Champions League spot, Como 1907 have produced something far more profound than a typical newly-promoted surge.</p>' +
      '<p>This is not merely an underdog tale fueled by money. It is a study in intelligent transformation, and at its center stands head coach and minority partner Cesc Fàbregas — the single most important reason for Como\u2019s rise.</p>' +
      '<p>Fàbregas has rejected the reactive, low-block pragmatism that often defines sides like Como. Instead, he has instilled a hyper-modern, possession-based philosophy: meticulous build-up from the back, disciplined ball retention, and creative freedom for attacking midfielders. The results have been striking — a commanding 2-0 win over Juventus, a resilient draw at Napoli\u2019s Diego Armando Maradona Stadium, and in January 2026, a historic 6-0 demolition of Torino, the club\u2019s biggest-ever Serie A victory.</p>' +
      '<p>Yet tactics alone do not explain the depth of this progress. Fàbregas has cultivated a psychological environment of patience and trust, where talented young players can express themselves without the fear of instant judgment that stifles growth at bigger clubs. This environment produced the season\u2019s breakout star: 21-year-old Nico Paz. Signed from Real Madrid, Paz has become the central engine of Como\u2019s attack. In one seven-game stretch he contributed four goals and four assists — directly involved in eight of the team\u2019s nine goals in that period. His market value now sits at €65 million, with Real Madrid holding buy-back options that will dominate the next transfer window.</p>' +
      '<p>The financial backing from the Djarum Group is undeniable. As the wealthiest owners in Italian football, they have driven an aggressive summer 2025 spending spree that lifted the squad\u2019s value from €60 million to €352 million. Yet money buys players; it does not automatically create cohesion, identity, or sustained high-level execution. That alchemy belongs to Fàbregas.</p>' +
      '<p>His success flows from a rare combination of formation, intelligence, and environment. A product of the Arsène Wenger academy at Arsenal, he absorbed a rigorous education in technical precision, positional understanding, and long-term player development. Layered onto this is Fàbregas\u2019s own sharp football intelligence and a personal life shaped by marriage to a Lebanese woman — an experience that has widened his cultural lens, deepened his emotional intelligence, and strengthened his ability to build genuine harmony within a diverse squad.</p>' +
      '<p>This blend has given him the character, mindset, and skillset required for sustained success in one of Europe\u2019s most demanding leagues. It demands patience when results take time to form, determination to resist simpler defensive setups, and a continuous willingness to learn and refine. Fàbregas has shown all three qualities in abundance.</p>' +
      '<p>Como\u2019s story, then, is less about financial disruption and more about reflective leadership. In a league still defined by traditional powerhouses, a lakeside club is proving that intelligent, patient management — rooted in deep professional formation and a rich personal environment — can reshape expectations and redefine what success looks like.</p>' +
      '<p>The Djarum millions provided the canvas. Cesc Fàbregas is painting the masterpiece.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var actorsPanelsContent =
    '<div class="reflective-article-modal actors-panels-article">' +
      '<div class="actors-panels-article__cover">' +
        '<img src="./reflective/covers/11-actors-panels.png" alt="Actors on Sports Panels: Why the Panel Should Be Performers, Not Ex-Players" class="actors-panels-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Actors on Sports Panels: Why the Panel Should Be Performers, Not Ex-Players</h1>' +
      '<p>Broadcasters in sports media are missing a huge market which is the entertainment industry.</p>' +
      '<p>They know celebrities — whether A, B, C, D or E level — are fans of sports teams. Some are actual fans who watch every game. Actors and performers know how to be engaging. They know how to attract viewers. They understand drama, timing, emotion, and narrative tension.</p>' +
      '<p>Yet the panels remain filled with ex-footballers.</p>' +
      '<p>My theory is simple and urgent: the panel shouldn\u2019t be ex-footballers. It should be actors.</p>' +
      '<p>Let\u2019s face it — footballers who are naturally eloquent are in the minority. Most of them were trained to play, not to perform in front of cameras with charisma and presence. Actors live for performance. They understand how to turn analysis into theatre. They know how to make the viewer feel something, not just hear tactical breakdowns.</p>' +
      '<p>The sports broadcasters are ignoring the real war for attention.</p>' +
      '<p>The entertainment industry already understands what the cold numbers try to hide: in the end, it is all about sentiment and charisma, not just cold tactical breakdowns.</p>' +
      '<p>The modern viewer does not want another ex-pro saying "he needs to drop deeper and receive on the half-turn." They want someone who can make the match feel alive, who can tell the story, who can turn 90 minutes of football into compelling human drama.</p>' +
      '<p>The panel should be actors.</p>' +
      '<p>Because the game itself is already entertainment. The only question is whether the people talking about it understand how to entertain.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var playerManagerDisconnectContent =
    '<div class="reflective-article-modal player-manager-disconnect-article">' +
      '<div class="player-manager-disconnect-article__cover">' +
        '<img src="./reflective/covers/10-player-manager.png" alt="Player-Manager Disconnect: When Words No Longer Reach the Dressing Room" class="player-manager-disconnect-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Player-Manager Disconnect: When Words No Longer Reach the Dressing Room</h1>' +
      '<p>There is a growing disconnect between modern player mentality and traditional managerial authority in the Premier League.</p>' +
      '<p>At its root is something simple: accuracy. Accuracy equates to trust. And trust breaks the moment there is no transparency in how the message is delivered.</p>' +
      '<p>The manager can say one thing, but then behave in a way that is different, and that contradiction travels straight into the dressing room.</p>' +
      '<p>Today\u2019s players live inside a constant stream of social media and media consumption. They are heavily influenced by what they see and hear, yet many are not fully aware of how that influence shapes them. The old model of "manager speaks, player obeys" no longer holds when the player\u2019s mind is already crowded with other voices.</p>' +
      '<p>What is missing is deeper. Clubs need psychologists who can teach players the foundations of philosophy — to become better people, not just better players. Managers themselves need training not just in communication, but in philosophy, so they understand the basic foundations of trust.</p>' +
      '<p>The work is continuous. Individuals should never stop working on the self — take breaks, take little pauses, but the inner work never stops if we want to become our most optimal version.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var gamblingFanAbuseContent =
    '<div class="reflective-article-modal gambling-fan-abuse-article">' +
      '<div class="gambling-fan-abuse-article__cover">' +
        '<img src="./reflective/covers/07-gambling-fan-abuse.png" alt="Gambling &amp; Fan Abuse: The System That Profits From Rage" class="gambling-fan-abuse-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Gambling &amp; Fan Abuse: The System That Profits From Rage</h1>' +
      '<p>The trendy topic right now is punishing individuals for abusive language on social media when it concerns attacking athletes.</p>' +
      '<p>Everyone is outraged. Everyone points the finger at the fans, the users, the "toxic" people.</p>' +
      '<p>But I see it differently. The system is actually passing the responsibility. Or lying to itself.</p>' +
      '<p>Sports is no longer viewed just for fandom. It is viewed for monetary gain through gambling.</p>' +
      '<p>Gambling is promoted everywhere, convenient, pushed as a way to chase comforts and luxuries. The "gamble responsibly" slogan is quietly ignored when the money flows in.</p>' +
      '<p>When an athlete is judged responsible for a lost bet, the outrage explodes on social media. Reactions are angry, urgent, human.</p>' +
      '<p>It is a natural sequence of events.</p>' +
      '<p>The system architected this map — sports plus gambling plus easy access plus ignored responsibility — yet the blame falls on the individual user rather than the architects.</p>' +
      '<p>The outrage is not the problem. The map the system created is.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var commodificationBeautifulGameContent =
    '<div class="reflective-article-modal commodification-article">' +
      '<div class="commodification-article__cover">' +
        '<img src="./reflective/covers/02-commodification.png" alt="The Commodification of the Beautiful Game: Record Revenues, Empty Soul" class="commodification-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">The Commodification of the Beautiful Game: Record Revenues, Empty Soul</h1>' +
      '<p>Despite record revenues and unprecedented commercial success, modern football is quietly stripping the humanity out of the sport.</p>' +
      '<p>The premise is clear. Modern elite football has become a highly efficient wealth-extraction machine. It generates staggering sums of money while systematically removing the very soul that made the game worth loving.</p>' +
      '<p>The facts are undeniable. The 2026 FIFA World Cup is projected to generate nearly $8.9 billion in direct revenue, delivering a clean net profit of approximately $4 billion to FIFA. The European football market has reached a record valuation of €38 billion. Real Madrid has become the first club in history to surpass the €1 billion revenue milestone in a single season. Stadiums operate at near-maximum capacity. Broadcasting rights continue to break records.</p>' +
      '<p>On paper, the sport has never been more successful. Yet beneath this glittering surface lies a growing, measurable cultural alienation.</p>' +
      '<p>This is designed commodification. Players are told what to say. Managers are told how to behave. Everything is scripted, controlled, sanitised.</p>' +
      '<p>This system punishes character. It rewards compliance. Compliance means you are owned. You are bought. You are nothing without us.</p>' +
      '<p>Look at those who dared to be authentic. Patrice Evra spoke his mind and was praised when it suited the narrative, then torn down when it no longer did. Mario Balotelli showed unfiltered character and was labelled a problem child, a distraction, a liability. Marcelo Bielsa and Diego Simeone built their entire identities on intensity and honesty, only to be celebrated in victory and criticised in defeat for the very traits that made them compelling.</p>' +
      '<p>The media props them up when it serves the story, then tears them down when it no longer fits the brand. This is the system at work.</p>' +
      '<p>If you want players to show character on the pitch, you must allow them to show their character everywhere they are. If their character becomes a problem, then the people who were supposed to act as role models have failed. The schools failed. The coaches failed. Everyone failed.</p>' +
      '<p>Either we lift each other up as if we are climbing together towards the summit, or we point the finger and say: "I own you. I paid for you. You do as you\u2019re told."</p>' +
      '<p><em>That is the fucking conclusion.</em></p>' +
      '<p>The machine is running perfectly. The only question left is whether we will continue accepting the illusion, or finally acknowledge that the beautiful game has been reduced to just another product.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var womensSponsorshipBoomContent =
    '<div class="reflective-article-modal womens-sponsorship-article">' +
      '<div class="womens-sponsorship-article__cover">' +
        '<img src="./reflective/covers/03-womens-sponsorship.png" alt="Women\u2019s Soccer Sponsorship Boom: The Smartest, Most Undervalued Play in Modern Sport" class="womens-sponsorship-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Women\u2019s Soccer Sponsorship Boom: The Smartest, Most Undervalued Play in Modern Sport</h1>' +
      '<p>Big brands are rushing into women\u2019s soccer league sponsorships and TV rights while men\u2019s elite leagues stay locked into long-term, sky-high contracts.</p>' +
      '<p>The women\u2019s game remains one of the smartest, most undervalued plays in sport.</p>' +
      '<p>The numbers tell part of the story, but the deeper truth is more profound.</p>' +
      '<p>Men\u2019s Premier League TV rights are locked at £6.7 billion over four years. The women\u2019s WSL just signed a new £65 million five-year TV deal plus a £15 million-a-year title sponsor from Barclays. The NWSL has already attracted $75 million in team sponsorship in 2024 alone, with league-wide sponsors expanding rapidly. Women\u2019s sponsorship is growing at 12% year-on-year — fifty percent faster than the major men\u2019s leagues.</p>' +
      '<p>Why is this happening?</p>' +
      '<p>Because the women\u2019s game is still fresh. It has not yet been fully commodified. It still carries genuine sentiment, genuine growth, genuine hunger. Brands see an audience that is not yet exhausted by the same old narratives, the same scripted interviews, the same distraction-economy machine that has swallowed men\u2019s elite football.</p>' +
      '<p>They tap into something real: women make 75–85% of household spending decisions globally. When she is interested, the household often follows. This is not just sponsorship. This is access to the true decision-makers of modern life.</p>' +
      '<p>The men\u2019s game has become a closed loop of long-term contracts and diminishing returns. The women\u2019s game is still open, still growing, still capable of surprise. It offers brands fresh visibility in a market projected to reach 800 million fans by 2030.</p>' +
      '<p>This is the quiet truth no one says out loud: the women\u2019s game is winning not because it copies the men\u2019s model, but because it has not yet been ruined by it.</p>' +
      '<p>Less is still more here. The product still feels rare. The emotion still feels authentic. The growth still feels organic.</p>' +
      '<p>The distraction economy has not yet fully swallowed it.</p>' +
      '<p>And that is exactly why the smart money is moving in now.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var threeLionsDelusionContent =
    '<div class="reflective-article-modal three-lions-article">' +
      '<div class="three-lions-article__cover">' +
        '<img src="./reflective/covers/04-three-lions.png" alt="Three Lions Delusion: The Dangerous Myth of English Superiority in a Global Game" class="three-lions-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Three Lions Delusion: The Dangerous Myth of English Superiority in a Global Game</h1>' +
      '<p>There is a conditioned belief that runs deep in English football. England should be, must be, the king of the jungle.</p>' +
      '<p>The Three Lions emblem itself does not help. One lion is the king, but three lions make a pack. It sets unrealistic expectations in a league that long ago stopped being British.</p>' +
      '<p>Look at the money now. Saudi Arabia is pouring in investments, poaching talent from leagues that already have the infrastructure, even if their method is not yet perfect. The Premier League has become this global stage, yet the philosophy and mindset of the British English manager often remains counterproductive to what is actually needed.</p>' +
      '<p>The successful ones understood this. Roy Hodgson travelled, spoke multiple languages, moved through countries and still got results. Gary Neville tried at Valencia and it did not work — he became a pundit instead.</p>' +
      '<p>The British press and the British pundits keep inculcating these false narratives of superiority. They nag and create this deception that England is the best.</p>' +
      '<p>The skill set is there. What is broken is the mindset. It is inflated, burdened by the lie. If that mindset were calibrated instead of inflated, the burden would lift and there would be freedom. The skill would show.</p>' +
      '<p>The real work is simpler: do things well, enjoy the work, re-establish the work ethic. The approach should be humility. The mindset should be "Teach Me."</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var fifa4BillionWorldCupContent =
    '<div class="reflective-article-modal fifa-4-billion-article">' +
      '<div class="fifa-4-billion-article__cover">' +
        '<img src="./reflective/covers/05-fifa-4bn.png" alt="FIFA to Make $4 Billion Net Profit from the 2026 World Cup: The Machine That Turned the People\u2019s Game into Pure Extraction" class="fifa-4-billion-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">FIFA to Make $4 Billion Net Profit from the 2026 World Cup: The Machine That Turned the People\u2019s Game into Pure Extraction</h1>' +
      '<p>While fans are sold the dream of "more football," FIFA quietly runs an antiquated business model that treats the supporter as a revenue source rather than a human being.</p>' +
      '<p>The 2026 FIFA World Cup is not a festival of football. It is a machine. A machine engineered with surgical precision to extract nearly $8.9 billion in direct revenue from a single month-long tournament — and to deliver a clean net profit of approximately $4 billion to FIFA itself.</p>' +
      '<p>Let that number settle. Four billion dollars in pure profit.</p>' +
      '<p>This is not sport. This is low-level capitalism wearing the mask of the beautiful game.</p>' +
      '<p>FIFA, a Swiss non-profit in name only, commands the monopolistic power of a global corporation while enjoying the tax exemptions and legal immunities of a sovereign state. It privatises the gains with ruthless efficiency and socialises the costs onto host cities, taxpayers, and smaller federations.</p>' +
      '<p>The money flows in at a scale never seen before. Broadcasting rights alone approach $4 billion. Sponsorships bring in nearly $1.8 billion. Ticketing and hospitality are projected near $3 billion.</p>' +
      '<p>Yet here is the deeper truth that FIFA never utters: their business model is antiquated. It does not consider the quality of life of the football fan. It only considers the quantity of revenue that can be extracted from him.</p>' +
      '<p>By expanding the tournament to 48 teams and 104 matches, FIFA frames this as "inclusivity" — giving more nations a chance, giving fans "more football." They forget the ancient truth: less is more.</p>' +
      '<p>More matches do not mean better football. More matches mean diluted quality, exhausted players, and a product that loses its rarity, its magic, its soul. The fan is left with quantity at the expense of meaning.</p>' +
      '<p>I am not against making money. I am against making money while dismissing society.</p>' +
      '<p>FIFA has turned the people\u2019s game into a Cushion Economy spectacle — convenient, comfortable, and profoundly extractive. The fans pay with their money, their time, their emotional energy. FIFA pays with nothing but the illusion of belonging.</p>' +
      '<p>Products do not fill the void. They decorate it.</p>' +
      '<p>So here is the question we must finally ask, without sentiment or illusion: is FIFA actually making the game better, or is it simply another organisation making its stakeholders and shareholders more comfortable?</p>' +
      '<p>And if the answer is the latter — as the numbers coldly prove — then is it not time the fans took back the people\u2019s game by setting up their own institution? One rooted in a Reflective Economy, where the game serves the soul of the sport rather than the balance sheet of the governing body.</p>' +
      '<p>The machine is already running. The only question left is whether we will continue feeding it, or finally dare to dismantle it.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var culturedManagersContent =
    '<div class="reflective-article-modal cultured-managers-article">' +
      '<div class="cultured-managers-article__cover">' +
        '<img src="./reflective/covers/06-cultured-managers.png" alt="Cultured Managers: The Invisible Requirement for Success in the Global Premier League" class="cultured-managers-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Cultured Managers: The Invisible Requirement for Success in the Global Premier League</h1>' +
      '<p>There is a fundamental misunderstanding in the Premier League.</p>' +
      '<p>The league itself has become this global influx of foreigners, different cultures, different mindsets, different ways of seeing the game. The days when a purely British approach could dominate are long gone.</p>' +
      '<p>For a manager to be truly successful here he has to be a cultured manager. Not just tactically sharp, but able to cross those invisible lines of language, communication, and cultural understanding.</p>' +
      '<p>Look at the ones who make it work. Roy Hodgson — British but cultured, spoke multiple languages, moved through countries and still got results. Pep Guardiola — he played in Italy, managed in Germany, built his whole philosophy across borders before coming to England. These men compartmentalised their mindset so they could actually reach the players in front of them.</p>' +
      '<p>Then you have someone like Sean Dyche. He got the jobs, but his most successful stint was at Burnley — and it doesn\u2019t get more British than Burnley. Outside that very specific world he has struggled to sustain anything.</p>' +
      '<p>Owners keep criticising managers for poor decisions, but the real question is this: are you hiring someone who can actually speak to the squad you have given him? Or are you just hoping the British way still works in a league that long ago stopped being British?</p>' +
      '<p>Unless you give the manager full licence to recruit his own players, the onus is on you to pick someone who understands the map you created.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  var salahHeartContent =
    '<div class="reflective-article-modal salah-heart-article">' +
      '<div class="salah-heart-article__cover">' +
        '<img src="./reflective/covers/08-salah-heart.png" alt="Mohamed Salah Follows His Heart: A Story of Heart Over Reason" class="salah-heart-article__cover-img" loading="lazy" decoding="async">' +
      '</div>' +
      '<h1 id="reflective-modal-title">Mohamed Salah Follows His Heart: A Story of Heart Over Reason</h1>' +
      '<p>Mohamed Salah has always been a man who follows his sentiment, not cold reason.</p>' +
      '<p>Look at December. He didn\u2019t calculate. He felt it. Benched. Promises broken. He came out raw and said the relationship with Slot was gone, that it felt like someone didn\u2019t want him at the club anymore. That is pure heart talking, no filter, no pretending, no corporate shield.</p>' +
      '<p>Now he is leaving at the end of the season.</p>' +
      '<p>Yes, Liverpool will forever live in his nostalgia bank — the city, the fans, the trophies, the spirit he says became part of his life and his family\u2019s home. He poured his soul into this club. He gave them everything a man can give.</p>' +
      '<p>But that love and those memories are not enough to make him want to remain.</p>' +
      '<p>When the emotional connections that truly anchor a man like Salah fade, sentiment pulls him elsewhere. The official reasons may speak of fresh starts or finances, yet at his core he is all heart. He is not a machine optimising a contract. He is a human being following the pull he feels in his chest.</p>' +
      '<p>This is the deeper truth the modern game tries to hide: the best players are rarely driven by spreadsheets. They are driven by feeling. By loyalty that must be reciprocated. By the invisible thread that either binds them to a place or gently lets them go.</p>' +
      '<p>The system wants us to believe everything is rational. Contracts. Numbers. Fresh starts. But Salah reminds us that football, at its highest level, is still a game of the heart.</p>' +
      '<p>And when the heart no longer feels at home, no amount of money or nostalgia can force it to stay.</p>' +
      '<p><strong>I see it.</strong></p>' +
    '</div>';

  /* ---------- Remaining articles — straight prose, share-cta stripped ---------- */

  window.ARTICLES = [
    {
      id: 27,
      category: 'opinion',
      slug: 'ritual-before-kickoff',
      title: 'The Ritual Before the Kick-Off: How Football Fandom Became the Last True Religion in the Distraction Economy',
      summary:
        'The real religion of football is not the match — it is the primal pre-match ritual. Fandom has become the last surviving form of collective transcendence in a commodified world.',
      cover: './reflective/covers/27-ritual-before-kickoff.png',
      readTime: '8 min read',
      topics: ['fandom', 'ritual', 'neuroscience', 'terrace-culture'],
      relatedSlugs: ['player-driven-fandom', 'hot-sauce-paradigm', 'tactical-mirror'],
      content: ritualBeforeKickoffContent
    },
    {
      id: 26,
      category: 'opinion',
      slug: 'player-driven-fandom',
      title: 'Son Heung-min Owns South Korea and Mitoma Owns Japan: The Rise of Player-Driven Fandom and the Death of Traditional Tribal Loyalty',
      summary:
        'Club loyalty is no longer about the crest or the city. In Asia and beyond, fans pledge to the player. Son and Mitoma have proven that individual brilliance now forges global allegiance.',
      cover: './reflective/covers/26-player-driven-fandom.png',
      readTime: '8 min read',
      topics: ['fandom', 'asia', 'players', 'global-fandom'],
      relatedSlugs: ['ritual-before-kickoff', 'poly-support-revolution', 'tactical-mirror'],
      content: playerDrivenFandomContent
    },
    {
      id: 25,
      category: 'opinion',
      slug: 'pl-fanbase-caste',
      title: 'Wolves Are the Most Toxic, Chelsea the Least Patient: The Hidden Caste System of Premier League Fanbases',
      summary:
        'The Premier League has its own invisible hierarchy on the terraces: some fanbases breed toxicity and impatience, others rationality and sincerity. The data exposes the hidden caste system of modern fandom.',
      cover: './reflective/covers/25-pl-fanbase-caste.png',
      readTime: '8 min read',
      topics: ['premier-league', 'fans', 'toxicity', 'grass-ceiling'],
      relatedSlugs: ['player-driven-fandom', 'grass-ceiling', 'hot-sauce-paradigm'],
      content: plFanbaseCasteContent
    },
    {
      id: 24,
      category: 'opinion',
      slug: 'hot-sauce-paradigm',
      title: 'The Hot Sauce Paradigm: The Biochemical Truth Behind Football\u2019s Most Violent and Irritable Fan Bases',
      summary:
        'Controlled experiments prove football aggression is partly proactive and biochemical. When combined with cultural and economic despair, it creates the most dangerous fan bases on earth.',
      cover: './reflective/covers/24-hot-sauce-paradigm.png',
      readTime: '8 min read',
      topics: ['fans', 'violence', 'biochemistry', 'terrace-culture'],
      relatedSlugs: ['ritual-before-kickoff', 'pl-fanbase-caste', 'gambling-fan-abuse'],
      content: hotSauceParadigmContent
    },
    {
      id: 23,
      category: 'opinion',
      slug: 'tactical-mirror',
      title: 'The Tactical Mirror: How a Nation\u2019s Playing Style Forges the Soul of Its Fans',
      summary:
        'Japan cleans the stadium. Scotland celebrates in defeat. Italy calls itself boring. A nation\u2019s historic tactical philosophy does not end at full time — it lives on in the soul of its supporters.',
      cover: './reflective/covers/23-tactical-mirror.png',
      readTime: '8 min read',
      topics: ['tactics', 'national-identity', 'fans', 'culture'],
      relatedSlugs: ['ritual-before-kickoff', 'player-driven-fandom', 'poly-support-revolution'],
      content: tacticalMirrorContent
    },
    {
      id: 22,
      category: 'opinion',
      slug: 'poly-support-revolution',
      title: 'The Poly-Support Revolution: How Female Fans Are Quietly Dismantling the Toxic Tribalism of Modern Football',
      summary:
        '49% of women now love football. 35% support multiple clubs. They reject the old rules of singular, toxic tribalism — and in doing so they are breaking the last Grass Ceiling of the game.',
      cover: './reflective/covers/22-poly-support-revolution.png',
      readTime: '8 min read',
      topics: ['poly-support', 'women-fans', 'wsl', 'fandom'],
      relatedSlugs: ['player-driven-fandom', 'womens-sponsorship', 'commodification'],
      content: polySupportRevolutionContent
    },
    {
      id: 20,
      category: 'opinion',
      slug: 'positional-caste-dugout',
      title: 'Why Midfielders Rule the Dugout and Goalkeepers Never Will: The Hidden Positional Caste System in Elite Coaching',
      summary:
        'Even among ex-players, a hidden caste system exists: midfielders dominate coaching while goalkeepers are almost invisible. The Grass Ceiling has layers — and this is one of the most insidious.',
      cover: './reflective/covers/20-positional-caste-dugout.png',
      readTime: '8 min read',
      topicSeries: 'dugout-pedigree',
      topics: ['dugout-pedigree', 'positional-caste', 'grass-ceiling'],
      relatedSlugs: ['grass-ceiling', 'laptop-managers', 'dugout-aristocracy'],
      content: positionalCasteDugoutContent
    },
    {
      id: 19,
      category: 'opinion',
      slug: 'uefa-fines-bloodline',
      title: '\u20AC25,000 Fines for the Wrong Bloodline: UEFA\u2019s Rigid Rules, Emergency Loopholes, and the Institutional Cartel That Protects Ex-Players',
      summary:
        'The Pro Licence is mandatory for European competition — until a famous ex-player needs a loophole. \u20AC25,000 fines for outsiders, season-long dispensations for insiders: this is the cartel at work.',
      cover: './reflective/covers/19-uefa-fines-bloodline.png',
      readTime: '9 min read',
      topicSeries: 'dugout-pedigree',
      topics: ['dugout-pedigree', 'uefa', 'licensing'],
      relatedSlugs: ['dugout-aristocracy', 'reclaiming-touchline', 'grass-ceiling'],
      content: uefaFinesBloodlineContent
    },
    {
      id: 18,
      category: 'opinion',
      slug: 'reclaiming-touchline',
      title: 'Reclaiming the Touchline: Why Football Must Burn the UEFA Pro Licence Cartel and Build a Reflective Coaching Economy',
      summary:
        'The cartel has been exposed. The Grass Ceiling named. Now the only question left is action — how we dismantle the system and build a coaching economy rooted in talent, character, and inner work.',
      cover: './reflective/covers/18-reclaiming-touchline.png',
      readTime: '8 min read',
      topicSeries: 'dugout-pedigree',
      topics: ['dugout-pedigree', 'reflective-coaching', 'reform'],
      relatedSlugs: ['dugout-aristocracy', 'priced-out-touchline', 'grass-ceiling'],
      content: reclaimingTouchlineContent
    },
    {
      id: 17,
      category: 'opinion',
      slug: 'dugout-aristocracy',
      title: 'The Dugout Aristocracy: How UEFA Engineered a Coaching Pathway That Rewards Pedigree Over Character',
      summary:
        'The UEFA Pro Licence is not a neutral qualification — it is a deliberately constructed aristocracy that fast-tracks ex-players while locking out everyone else through time, money, and institutional gatekeeping.',
      cover: './reflective/covers/17-dugout-aristocracy.png',
      readTime: '9 min read',
      topicSeries: 'dugout-pedigree',
      topics: ['dugout-pedigree', 'pro-licence', 'uefa-pathway'],
      relatedSlugs: ['priced-out-touchline', 'grass-ceiling'],
      content: dugoutAristocracyContent
    },
    {
      id: 16,
      category: 'opinion',
      slug: 'priced-out-touchline',
      title: 'Priced Out of the Touchline: The \u20AC100,000 Barrier That Keeps Authentic Coaches Trapped in the Distraction Economy',
      summary:
        'The UEFA Pro Licence is not a qualification — it is a wealth test. Non-players pay \u20AC50,000\u2013\u20AC100,000 in lost wages while ex-players glide through, exposing how the system commodifies ambition itself.',
      cover: './reflective/covers/16-priced-out-touchline.png',
      readTime: '9 min read',
      topicSeries: 'dugout-pedigree',
      topics: ['dugout-pedigree', 'pro-licence', 'price-barrier'],
      relatedSlugs: ['grass-ceiling', 'laptop-managers'],
      content: pricedOutTouchlineContent
    },
    {
      id: 15,
      category: 'opinion',
      slug: 'laptop-managers',
      title: 'The Laptop Managers Are Coming: How Non-Players Are Quietly Proving That Inner Work Beats Playing Pedigree',
      summary:
        'While the Grass Ceiling protects ex-players, a new archetype rises from the video room — the Laptop Manager — proving that inner work, data, and reflective intelligence now outperform inherited pedigree.',
      cover: './reflective/covers/15-laptop-managers.png',
      readTime: '9 min read',
      topicSeries: 'dugout-pedigree',
      topics: ['dugout-pedigree', 'laptop-managers', 'inner-work'],
      relatedSlugs: ['grass-ceiling'],
      content: laptopManagersContent
    },
    {
      id: 14,
      category: 'opinion',
      slug: 'grass-ceiling',
      title: 'The Grass Ceiling: How Football\u2019s Invisible Barrier Keeps True Character Out of the Elite Dugout',
      summary:
        'Black players dominate the pitch yet remain locked out of the dugout — a systemic Grass Ceiling built on networks, pedigree, and silent gatekeeping rather than merit, inner work, or authentic leadership.',
      cover: './reflective/covers/14-grass-ceiling.png',
      readTime: '10 min read',
      topicSeries: 'dugout-pedigree',
      topics: ['dugout-pedigree', 'grass-ceiling', 'managers'],
      relatedSlugs: ['pl-fanbase-caste', 'laptop-managers'],
      content: grassCeilingContent
    },
    {
      id: 1,
      category: 'feature',
      slug: 'brentford-mouftimatics',
      title: 'Brentford FC and Mouftimatics: A Match Made in Appreciation',
      summary: 'In the distraction economy of modern football, perceived value beats prestige — and no club proves it like Brentford FC.',
      cover: './Brentford/image13.jpg',
      content: brentfordContent
    },
    {
      id: 2,
      category: 'feature',
      slug: 'catalyst-metric',
      title: 'The Catalyst Metric',
      summary: 'Redefining the Premier League MVP by who the team literally cannot function without.',
      cover: './reflective/covers/01-catalyst.png',
      content: catalystContent
    },
    {
      id: 3,
      category: 'opinion',
      slug: 'commodification',
      title: 'The Commodification of the Beautiful Game',
      summary: 'Record profits. Record alienation. Football is being stripped of its soul.',
      cover: './reflective/covers/02-commodification.png',
      content: commodificationBeautifulGameContent
    },
    {
      id: 4,
      category: 'feature',
      slug: 'womens-sponsorship',
      title: 'Women\u2019s Soccer Sponsorship Boom',
      summary: 'Big brands are making one of the smartest bets in sport right now — women\u2019s football.',
      cover: './reflective/covers/03-womens-sponsorship.png',
      content: womensSponsorshipBoomContent
    },
    {
      id: 5,
      category: 'opinion',
      slug: 'three-lions',
      title: 'Three Lions Delusion',
      summary: 'The inflated English mindset and Three Lions emblem are holding the game back.',
      cover: './reflective/covers/04-three-lions.png',
      content: threeLionsDelusionContent
    },
    {
      id: 6,
      category: 'opinion',
      slug: 'fifa-4-billion',
      title: 'FIFA to Make $4 Billion Net Profit',
      summary: 'FIFA\u2019s antiquated model extracts billions while giving fans diluted football.',
      cover: './reflective/covers/05-fifa-4bn.png',
      content: fifa4BillionWorldCupContent
    },
    {
      id: 7,
      category: 'opinion',
      slug: 'cultured-managers',
      title: 'Cultured Managers',
      summary: 'In today\u2019s multicultural Premier League only managers who can truly communicate across cultures succeed.',
      cover: './reflective/covers/06-cultured-managers.png',
      content: culturedManagersContent
    },
    {
      id: 8,
      category: 'opinion',
      slug: 'gambling-fan-abuse',
      title: 'Gambling & Fan Abuse',
      summary: 'The system created the anger — then blamed the fans for it.',
      cover: './reflective/covers/07-gambling-fan-abuse.png',
      content: gamblingFanAbuseContent
    },
    {
      id: 9,
      category: 'profile',
      slug: 'salah-heart',
      title: 'Mohamed Salah Follows His Heart',
      summary: 'Mohamed Salah is leaving Liverpool because he follows sentiment, not cold reason.',
      cover: './reflective/covers/08-salah-heart.png',
      content: salahHeartContent
    },
    {
      id: 10,
      category: 'profile',
      slug: 'wrexham-exception',
      title: 'Wrexham Ownership Exception',
      summary: 'Wrexham proves you can make serious money while genuinely improving fans\u2019 quality of life.',
      cover: './reflective/covers/09-wrexham.png',
      content: wrexhamExceptionContent
    },
    {
      id: 11,
      category: 'opinion',
      slug: 'player-manager-disconnect',
      title: 'Player-Manager Disconnect',
      summary: 'The old "manager speaks, player obeys" model is dead. Modern football needs philosophy and inner work.',
      cover: './reflective/covers/10-player-manager.png',
      content: playerManagerDisconnectContent
    },
    {
      id: 12,
      category: 'the-game',
      slug: 'actors-panels',
      title: 'Actors on Sports Panels',
      summary: 'Sports broadcasters are missing the obvious: panels should be filled with actors, not ex-footballers.',
      cover: './reflective/covers/11-actors-panels.png',
      content: actorsPanelsContent
    },
    {
      id: 13,
      category: 'profile',
      slug: 'como-1907-miracle',
      title: 'The Como 1907 Miracle',
      summary: 'While the big clubs fight for the Scudetto, Como 1907\u2019s quiet revolution under Cesc Fàbregas is the real story of 2025/26 Serie A.',
      cover: './reflective/covers/12-como-1907.png',
      content: como1907MiracleContent
    }
  ];
})();
