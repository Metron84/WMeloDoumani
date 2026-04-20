/*
 * The Reflective — article data
 * Plain script loaded via <script src="./reflective/articles.js" defer>.
 * Populates window.ARTICLES; index.html renders the grid and modal from it.
 *
 * Card order on the grid follows the array order below, not the `id`.
 * Share-CTA has been stripped from every body — it is appended once by the
 * modal chrome (see §6 of the spec).
 */

(function () {
  'use strict';

  /* ---------- Article 1 — hand-rendered with editorial bands + nominee blocks ---------- */
  var catalystContent =
    '<figure class="reflective-band reflective-band--hero" role="img" aria-label="A stadium at night; one illuminated player at centre with golden threads radiating to ghosted teammates — the catalyst as a network node.">' +
      '<div class="reflective-band__veil"></div>' +
      '<figcaption>' +
        '<span class="reflective-band__eyebrow">Featured · Football</span>' +
        '<h1 id="reflective-modal-title" class="reflective-band__title">The Catalyst Metric: Redefining the Premier League MVP</h1>' +
      '</figcaption>' +
    '</figure>' +

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
    '</div>';

  /* ---------- Articles 2–12 — straight prose, share-cta stripped ---------- */

  window.ARTICLES = [
    {
      id: 1,
      category: 'feature',
      slug: 'catalyst-metric',
      title: 'The Catalyst Metric',
      summary: 'Redefining the Premier League MVP by who the team literally cannot function without.',
      cover: './reflective/covers/01-catalyst.jpg',
      content: catalystContent
    },
    {
      id: 2,
      category: 'opinion',
      slug: 'commodification',
      title: 'The Commodification of the Beautiful Game',
      summary: 'Record profits. Record alienation. Football is being stripped of its soul.',
      cover: './reflective/covers/02-commodification.jpg',
      content:
        '<h1>The Commodification of the Beautiful Game</h1>' +
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
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 3,
      category: 'feature',
      slug: 'womens-sponsorship',
      title: 'Women\u2019s Soccer Sponsorship Boom',
      summary: 'Big brands are making one of the smartest bets in sport right now — women\u2019s football.',
      cover: './reflective/covers/03-womens-sponsorship.jpg',
      content:
        '<h1>Women\u2019s Soccer Sponsorship Boom</h1>' +
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
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 4,
      category: 'opinion',
      slug: 'three-lions',
      title: 'Three Lions Delusion',
      summary: 'The inflated English mindset and Three Lions emblem are holding the game back.',
      cover: './reflective/covers/04-three-lions.jpg',
      content:
        '<h1>Three Lions Delusion</h1>' +
        '<p>There is a conditioned belief that runs deep in English football. England should be, must be, the king of the jungle.</p>' +
        '<p>The Three Lions emblem itself does not help. One lion is the king, but three lions make a pack. It sets unrealistic expectations in a league that long ago stopped being British.</p>' +
        '<p>Look at the money now. Saudi Arabia is pouring in investments, poaching talent from leagues that already have the infrastructure, even if their method is not yet perfect. The Premier League has become this global stage, yet the philosophy and mindset of the British English manager often remains counterproductive to what is actually needed.</p>' +
        '<p>The successful ones understood this. Roy Hodgson travelled, spoke multiple languages, moved through countries and still got results. Gary Neville tried at Valencia and it did not work — he became a pundit instead.</p>' +
        '<p>The British press and the British pundits keep inculcating these false narratives of superiority. They nag and create this deception that England is the best.</p>' +
        '<p>The skill set is there. What is broken is the mindset. It is inflated, burdened by the lie. If that mindset were calibrated instead of inflated, the burden would lift and there would be freedom. The skill would show.</p>' +
        '<p>The real work is simpler: do things well, enjoy the work, re-establish the work ethic. The approach should be humility. The mindset should be "Teach Me."</p>' +
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 5,
      category: 'opinion',
      slug: 'fifa-4-billion',
      title: 'FIFA to Make $4 Billion Net Profit',
      summary: 'FIFA\u2019s antiquated model extracts billions while giving fans diluted football.',
      cover: './reflective/covers/05-fifa-4bn.jpg',
      content:
        '<h1>FIFA to Make $4 Billion Net Profit from the 2026 World Cup</h1>' +
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
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 6,
      category: 'opinion',
      slug: 'cultured-managers',
      title: 'Cultured Managers',
      summary: 'In today\u2019s multicultural Premier League only managers who can truly communicate across cultures succeed.',
      cover: './reflective/covers/06-cultured-managers.jpg',
      content:
        '<h1>Cultured Managers</h1>' +
        '<p>There is a fundamental misunderstanding in the Premier League.</p>' +
        '<p>The league itself has become this global influx of foreigners, different cultures, different mindsets, different ways of seeing the game. The days when a purely British approach could dominate are long gone.</p>' +
        '<p>For a manager to be truly successful here he has to be a cultured manager. Not just tactically sharp, but able to cross those invisible lines of language, communication, and cultural understanding.</p>' +
        '<p>Look at the ones who make it work. Roy Hodgson — British but cultured, spoke multiple languages, moved through countries and still got results. Pep Guardiola — he played in Italy, managed in Germany, built his whole philosophy across borders before coming to England. These men compartmentalised their mindset so they could actually reach the players in front of them.</p>' +
        '<p>Then you have someone like Sean Dyche. He got the jobs, but his most successful stint was at Burnley — and it doesn\u2019t get more British than Burnley. Outside that very specific world he has struggled to sustain anything.</p>' +
        '<p>Owners keep criticising managers for poor decisions, but the real question is this: are you hiring someone who can actually speak to the squad you have given him? Or are you just hoping the British way still works in a league that long ago stopped being British?</p>' +
        '<p>Unless you give the manager full licence to recruit his own players, the onus is on you to pick someone who understands the map you created.</p>' +
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 7,
      category: 'opinion',
      slug: 'gambling-fan-abuse',
      title: 'Gambling & Fan Abuse',
      summary: 'The system created the anger — then blamed the fans for it.',
      cover: './reflective/covers/07-gambling-fan-abuse.jpg',
      content:
        '<h1>Gambling & Fan Abuse</h1>' +
        '<p>The trendy topic right now is punishing individuals for abusive language on social media when it concerns attacking athletes.</p>' +
        '<p>Everyone is outraged. Everyone points the finger at the fans, the users, the "toxic" people.</p>' +
        '<p>But I see it differently. The system is actually passing the responsibility. Or lying to itself.</p>' +
        '<p>Sports is no longer viewed just for fandom. It is viewed for monetary gain through gambling.</p>' +
        '<p>Gambling is promoted everywhere, convenient, pushed as a way to chase comforts and luxuries. The "gamble responsibly" slogan is quietly ignored when the money flows in.</p>' +
        '<p>When an athlete is judged responsible for a lost bet, the outrage explodes on social media. Reactions are angry, urgent, human.</p>' +
        '<p>It is a natural sequence of events.</p>' +
        '<p>The system architected this map — sports plus gambling plus easy access plus ignored responsibility — yet the blame falls on the individual user rather than the architects.</p>' +
        '<p>The outrage is not the problem. The map the system created is.</p>' +
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 8,
      category: 'profile',
      slug: 'salah-heart',
      title: 'Mohamed Salah Follows His Heart',
      summary: 'Mohamed Salah is leaving Liverpool because he follows sentiment, not cold reason.',
      cover: './reflective/covers/08-salah-heart.jpg',
      content:
        '<h1>Mohamed Salah Follows His Heart</h1>' +
        '<p>Mohamed Salah has always been a man who follows his sentiment, not cold reason.</p>' +
        '<p>Look at December. He didn\u2019t calculate. He felt it. Benched. Promises broken. He came out raw and said the relationship with Slot was gone, that it felt like someone didn\u2019t want him at the club anymore. That is pure heart talking, no filter, no pretending, no corporate shield.</p>' +
        '<p>Now he is leaving at the end of the season.</p>' +
        '<p>Yes, Liverpool will forever live in his nostalgia bank — the city, the fans, the trophies, the spirit he says became part of his life and his family\u2019s home. He poured his soul into this club. He gave them everything a man can give.</p>' +
        '<p>But that love and those memories are not enough to make him want to remain.</p>' +
        '<p>When the emotional connections that truly anchor a man like Salah fade, sentiment pulls him elsewhere. The official reasons may speak of fresh starts or finances, yet at his core he is all heart. He is not a machine optimising a contract. He is a human being following the pull he feels in his chest.</p>' +
        '<p>This is the deeper truth the modern game tries to hide: the best players are rarely driven by spreadsheets. They are driven by feeling. By loyalty that must be reciprocated. By the invisible thread that either binds them to a place or gently lets them go.</p>' +
        '<p>The system wants us to believe everything is rational. Contracts. Numbers. Fresh starts. But Salah reminds us that football, at its highest level, is still a game of the heart.</p>' +
        '<p>And when the heart no longer feels at home, no amount of money or nostalgia can force it to stay.</p>' +
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 9,
      category: 'profile',
      slug: 'wrexham-exception',
      title: 'Wrexham Ownership Exception',
      summary: 'Wrexham proves you can make serious money while genuinely improving fans\u2019 quality of life.',
      cover: './reflective/covers/09-wrexham.jpg',
      content:
        '<h1>Wrexham Ownership Exception</h1>' +
        '<p>There is a fundamental misunderstanding across industries and the sports sector is another cog or marionette.</p>' +
        '<p>Leaders today in sports are often criticised for ticket prices, ignoring the culture of their football club, reckless spending, poor decisions concerning staff, and the fans are correct at pointing the finger at leadership.</p>' +
        '<p>While most leaders in sport are focusing on the business bottom line they disregard the quality of life for their fans even with the Orwellian doublespeak of "football is nothing without fans". What they really want to say is that "football is nothing without fans with buckets of cash."</p>' +
        '<p>There are, of course, exceptions and it has been documented at Wrexham. Ownership have consistently communicated the value of the community and always take into consideration their fan base while making business decisions.</p>' +
        '<p>The owners at Wrexham, although labelled derogatorily as "Hollywood ownership" because they have Hollywood money, also possess creative-arts sensibilities. Their empathy and business acumen has lifted a whole town back to life. And this is not hyperbole. Wrexham was bleak but now the spotlight is casting rays of hope that are putting the other owners to shame.</p>' +
        '<p>It\u2019s one thing to say "football is nothing without fans" and it is another to mean it. The Wrexham owners have given a roadmap that it is possible to make money while improving the quality of life of a city and football fans.</p>' +
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 10,
      category: 'opinion',
      slug: 'player-manager-disconnect',
      title: 'Player-Manager Disconnect',
      summary: 'The old "manager speaks, player obeys" model is dead. Modern football needs philosophy and inner work.',
      cover: './reflective/covers/10-player-manager.jpg',
      content:
        '<h1>Player-Manager Disconnect</h1>' +
        '<p>There is a growing disconnect between modern player mentality and traditional managerial authority in the Premier League.</p>' +
        '<p>At its root is something simple: accuracy. Accuracy equates to trust. And trust breaks the moment there is no transparency in how the message is delivered.</p>' +
        '<p>The manager can say one thing, but then behave in a way that is different, and that contradiction travels straight into the dressing room.</p>' +
        '<p>Today\u2019s players live inside a constant stream of social media and media consumption. They are heavily influenced by what they see and hear, yet many are not fully aware of how that influence shapes them. The old model of "manager speaks, player obeys" no longer holds when the player\u2019s mind is already crowded with other voices.</p>' +
        '<p>What is missing is deeper. Clubs need psychologists who can teach players the foundations of philosophy — to become better people, not just better players. Managers themselves need training not just in communication, but in philosophy, so they understand the basic foundations of trust.</p>' +
        '<p>The work is continuous. Individuals should never stop working on the self — take breaks, take little pauses, but the inner work never stops if we want to become our most optimal version.</p>' +
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 11,
      category: 'the-game',
      slug: 'actors-panels',
      title: 'Actors on Sports Panels',
      summary: 'Sports broadcasters are missing the obvious: panels should be filled with actors, not ex-footballers.',
      cover: './reflective/covers/11-actors-panels.jpg',
      content:
        '<h1>Actors on Sports Panels</h1>' +
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
        '<p><strong>I see it.</strong></p>'
    },
    {
      id: 12,
      category: 'profile',
      slug: 'como-1907-miracle',
      title: 'The Como 1907 Miracle',
      summary: 'While the big clubs fight for the Scudetto, Como 1907\u2019s quiet revolution under Cesc Fàbregas is the real story of 2025/26 Serie A.',
      cover: './reflective/covers/12-como-1907.jpg',
      content:
        '<h1>The Como 1907 Miracle: Patience, Intelligence, and the Quiet Alchemy of Cesc Fàbregas</h1>' +
        '<p>While Inter Milan, Juventus, and Napoli continue their familiar battle for the Scudetto, the defining story of the 2025/26 Serie A season unfolds quietly by the lake in Como. Hovering between 4th and 6th place, actively threatening a Champions League spot, Como 1907 have produced something far more profound than a typical newly-promoted surge.</p>' +
        '<p>This is not merely an underdog tale fueled by money. It is a study in intelligent transformation, and at its center stands head coach and minority partner Cesc Fàbregas — the single most important reason for Como\u2019s rise.</p>' +
        '<p>Fàbregas has rejected the reactive, low-block pragmatism that often defines sides like Como. Instead, he has instilled a hyper-modern, possession-based philosophy: meticulous build-up from the back, disciplined ball retention, and creative freedom for attacking midfielders. The results have been striking — a commanding 2-0 win over Juventus, a resilient draw at Napoli\u2019s Diego Armando Maradona Stadium, and in January 2026, a historic 6-0 demolition of Torino, the club\u2019s biggest-ever Serie A victory.</p>' +
        '<p>Yet tactics alone do not explain the depth of this progress. Fàbregas has cultivated a psychological environment of patience and trust, where talented young players can express themselves without the fear of instant judgment that stifles growth at bigger clubs. This environment produced the season\u2019s breakout star: 21-year-old Nico Paz. Signed from Real Madrid, Paz has become the central engine of Como\u2019s attack. In one seven-game stretch he contributed four goals and four assists — directly involved in eight of the team\u2019s nine goals in that period. His market value now sits at €65 million, with Real Madrid holding buy-back options that will dominate the next transfer window.</p>' +
        '<p>The financial backing from the Djarum Group is undeniable. As the wealthiest owners in Italian football, they have driven an aggressive summer 2025 spending spree that lifted the squad\u2019s value from €60 million to €352 million. Yet money buys players; it does not automatically create cohesion, identity, or sustained high-level execution. That alchemy belongs to Fàbregas.</p>' +
        '<p>His success flows from a rare combination of formation, intelligence, and environment. A product of the Arsène Wenger academy at Arsenal, he absorbed a rigorous education in technical precision, positional understanding, and long-term player development. Layered onto this is Fàbregas\u2019s own sharp football intelligence and a personal life shaped by marriage to a Lebanese woman — an experience that has widened his cultural lens, deepened his emotional intelligence, and strengthened his ability to build genuine harmony within a diverse squad.</p>' +
        '<p>This blend has given him the character, mindset, and skillset required for sustained success in one of Europe\u2019s most demanding leagues. It demands patience when results take time to form, determination to resist simpler defensive setups, and a continuous willingness to learn and refine. Fàbregas has shown all three qualities in abundance.</p>' +
        '<p>Como\u2019s story, then, is less about financial disruption and more about reflective leadership. In a league still defined by traditional powerhouses, a lakeside club is proving that intelligent, patient management — rooted in deep professional formation and a rich personal environment — can reshape expectations and redefine what success looks like.</p>' +
        '<p>The Djarum millions provided the canvas. Cesc Fàbregas is painting the masterpiece.</p>' +
        '<p><strong>I see it.</strong></p>'
    }
  ];
})();
