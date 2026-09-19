import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, Clock3, FileText, LayoutDashboard, Menu, Pin, RotateCcw, Search, X } from 'lucide-react';
import { clearProgress, readHeroCollapsed, readPinnedTopics, readProgress, setHeroCollapsed, setTopicRead, togglePinnedTopic } from './lib/progress';
import type { Catalog, Progress, Topic } from './types';

type View = 'dashboard' | 'topic';

const phaseOrder = ['Fundamentals', 'Databases & Storage', 'Caching & Performance', 'Distributed Systems', 'Networking', 'Security', 'DevOps & Infrastructure', 'Architecture Patterns', 'Real-World Designs', 'Reference Library'];

function getTopicFromUrl(): string | null {
  return new URLSearchParams(window.location.search).get('topic');
}

function navigate(topic?: string): void {
  const url = topic ? `?topic=${encodeURIComponent(topic)}` : window.location.pathname;
  window.history.pushState({}, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function App() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [progress, setProgress] = useState<Progress>(readProgress);
  const [topicSlug, setTopicSlug] = useState(getTopicFromUrl);
  const [query, setQuery] = useState('');
  const [activePhase, setActivePhase] = useState('All topics');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pinnedTopics, setPinnedTopics] = useState<string[]>(readPinnedTopics);
  const [heroCollapsed, setHeroCollapsed] = useState(readHeroCollapsed);

  useEffect(() => {
    fetch('./generated/catalog.json').then((response) => response.json()).then(setCatalog);
    const handlePopState = () => setTopicSlug(getTopicFromUrl());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const topics = catalog?.topics ?? [];
  const activeTopic = topics.find((topic) => topic.slug === topicSlug);
  const readCount = topics.filter((topic) => progress[topic.slug]?.read).length;
  const completion = topics.length ? Math.round((readCount / topics.length) * 100) : 0;
  const filteredTopics = useMemo(() => topics.filter((topic) => {
    const matchesQuery = `${topic.title} ${topic.phase}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (activePhase === 'All topics' || topic.phase === activePhase);
  }), [activePhase, query, topics]);
  const phases = phaseOrder.filter((phase) => topics.some((topic) => topic.phase === phase));
  const nextTopic = topics.find((topic) => !progress[topic.slug]?.read) ?? topics[0];

  function updateRead(topic: Topic, read: boolean) {
    setProgress(setTopicRead(topic.slug, read));
  }

  function resetProgress() {
    if (window.confirm('Reset all learning progress?')) setProgress(clearProgress());
  }

  function togglePin(slug: string) {
    const next = togglePinnedTopic(slug);
    setPinnedTopics(next);
    if (next.length > 0 && !heroCollapsed) {
      setHeroCollapsed(true);
      setHeroCollapsed(true);
    }
  }

  function toggleHero() {
    const next = !heroCollapsed;
    setHeroCollapsed(next);
    setHeroCollapsed(next);
  }

  if (!catalog) return <div className="loading-screen"><div className="loader-mark">SD</div><p>Preparing your field guide...</p></div>;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><div className="brand-mark">SD</div><div><strong>Field Guide</strong><span>System design, made learnable</span></div></div>
        <button className="sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        <nav className="primary-nav">
          <button className={!activeTopic ? 'nav-item active' : 'nav-item'} onClick={() => { navigate(); setMobileOpen(false); }}><LayoutDashboard size={17} /> Dashboard</button>
          <div className="nav-label">Roadmap</div>
          <button className={activePhase === 'All topics' && !activeTopic ? 'phase-link active' : 'phase-link'} onClick={() => { setActivePhase('All topics'); navigate(); setMobileOpen(false); }}>All topics <span>{topics.length}</span></button>
          {phases.map((phase) => <button key={phase} className={activePhase === phase && !activeTopic ? 'phase-link active' : 'phase-link'} onClick={() => { setActivePhase(phase); navigate(); setMobileOpen(false); }}>{phase} <span>{topics.filter((topic) => topic.phase === phase).length}</span></button>)}
        </nav>
        <div className="sidebar-footer"><button className="reset-button" onClick={resetProgress}><RotateCcw size={14} /> Reset progress</button><span>Local progress only</span></div>
      </aside>
      {mobileOpen && <button className="scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
      <main className="main-content">
        <header className="topbar"><button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search concepts, systems, patterns..." /></div><div className="topbar-progress"><span>{completion}% complete</span><div><i style={{ width: `${completion}%` }} /></div></div></header>
        {activeTopic ? <TopicReader topic={activeTopic} topics={topics} progress={progress} onBack={() => navigate()} onRead={updateRead} /> : <Dashboard topics={filteredTopics} allTopics={topics} nextTopic={nextTopic} readCount={readCount} completion={completion} phases={phases} pdfs={catalog.pdfs} activePhase={activePhase} onPhase={setActivePhase} onOpen={navigate} progress={progress} pinnedTopics={pinnedTopics} heroCollapsed={heroCollapsed} onTogglePin={togglePin} onToggleHero={toggleHero} />}
      </main>
    </div>
  );
}

function Dashboard({ topics, allTopics, nextTopic, readCount, completion, phases, pdfs, activePhase, onPhase, onOpen, progress, pinnedTopics, heroCollapsed, onTogglePin, onToggleHero }: { topics: Topic[]; allTopics: Topic[]; nextTopic?: Topic; readCount: number; completion: number; phases: string[]; pdfs: string[]; activePhase: string; onPhase: (phase: string) => void; onOpen: (slug?: string) => void; progress: Progress; pinnedTopics: string[]; heroCollapsed: boolean; onTogglePin: (slug: string) => void; onToggleHero: () => void }) {
  const [visibleCount, setVisibleCount] = useState(18);
  const visibleTopics = topics.slice(0, visibleCount);
  const pinned = pinnedTopics.map((slug) => allTopics.find((topic) => topic.slug === slug)).filter((topic): topic is Topic => Boolean(topic));
  return <div className="dashboard page-wrap">
    <section className={`hero ${heroCollapsed ? 'hero-collapsed' : ''}`}><div className="hero-topline"><div className="eyebrow"><span className="eyebrow-dot" /> Your learning workspace</div><button className="hero-toggle" onClick={onToggleHero} aria-expanded={!heroCollapsed}>{heroCollapsed ? 'Expand intro' : 'Minimise intro'} <ChevronRight size={15} /></button></div>{!heroCollapsed && <><h1>Build systems<br /><em>that hold up.</em></h1><p>Navigate 237 carefully collected notes, sharpen your trade-offs, and turn architecture concepts into interview-ready judgment.</p><div className="hero-actions"><button className="button button-primary" onClick={() => nextTopic && onOpen(nextTopic.slug)}>{readCount ? 'Continue learning' : 'Start the roadmap'} <ArrowRight size={16} /></button><span className="hero-caption"><Check size={15} /> Progress stays in this browser</span></div></>}</section>
    {pinned.length > 0 && <section className="pinned-section"><div className="pinned-heading"><span className="eyebrow"><Pin size={13} /> Pinned topics</span><small>{pinned.length} saved</small></div><div className="pinned-list">{pinned.map((topic) => <TopicCard key={topic.slug} topic={topic} read={Boolean(progress[topic.slug]?.read)} pinned onOpen={onOpen} onTogglePin={onTogglePin} />)}</div></section>}
    <section className="stats-grid"><Stat value={`${completion}%`} label="Roadmap complete" detail={`${readCount} of ${allTopics.length} topics`} /><Stat value={`${allTopics.filter((topic) => topic.isCore).length}`} label="Core resources" detail="Start here first" /><Stat value={`${phases.length}`} label="Learning phases" detail="From basics to designs" /><Stat value={`${pdfs.length}`} label="Reference PDFs" detail="Already in the repo" /></section>
    <section className="section-heading"><div><span className="eyebrow">01 / Roadmap</span><h2>Choose your next idea.</h2></div><div className="filter-row"><button className={activePhase === 'All topics' ? 'filter active' : 'filter'} onClick={() => onPhase('All topics')}>Everything</button>{phases.slice(0, 4).map((phase) => <button key={phase} className={activePhase === phase ? 'filter active' : 'filter'} onClick={() => onPhase(phase)}>{phase}</button>)}</div></section>
    <section className="topic-grid">{visibleTopics.map((topic) => <TopicCard key={topic.slug} topic={topic} read={Boolean(progress[topic.slug]?.read)} pinned={pinnedTopics.includes(topic.slug)} onOpen={onOpen} onTogglePin={onTogglePin} />)}</section>
    {topics.length > visibleCount && <button className="load-more" onClick={() => setVisibleCount((count) => count + 18)}>Show more topics <ChevronRight size={16} /></button>}
    <section className="resource-band"><div><span className="eyebrow">02 / Reference shelf</span><h2>Go deeper when the map gets dense.</h2><p>Keep the existing PDF resources close without duplicating them in the app.</p></div><div className="pdf-list">{pdfs.map((pdf) => <a key={pdf} href={pdf} target="_blank" rel="noreferrer"><FileText size={17} /><span>{decodeURIComponent(pdf.replace('../', ''))}</span><ArrowRight size={15} /></a>)}</div></section>
  </div>;
}

function Stat({ value, label, detail }: { value: string; label: string; detail: string }) { return <div className="stat"><strong>{value}</strong><span>{label}</span><small>{detail}</small></div>; }

function TopicCard({ topic, read, pinned, onOpen, onTogglePin }: { topic: Topic; read: boolean; pinned: boolean; onOpen: (slug: string) => void; onTogglePin: (slug: string) => void }) { return <article className={`topic-card ${read ? 'is-read' : ''}`}><button className="topic-card-main" onClick={() => onOpen(topic.slug)}><div className="topic-card-top"><span className="topic-phase">{topic.phase}</span></div><h3>{topic.title}</h3><div className="topic-meta"><span><Clock3 size={14} /> {topic.estimatedMinutes} min</span><span>{topic.wordCount.toLocaleString()} words</span></div><span className="card-arrow"><ArrowUpRight /></span></button><div className="card-status"><button className={`pin-button ${pinned ? 'pinned' : ''}`} onClick={() => onTogglePin(topic.slug)} aria-label={pinned ? `Unpin ${topic.title}` : `Pin ${topic.title}`} aria-pressed={pinned}><Pin size={14} /></button>{read && <span className="read-badge"><Check size={12} /> Read</span>}</div></article>; }

function TopicReader({ topic, topics, progress, onBack, onRead }: { topic: Topic; topics: Topic[]; progress: Progress; onBack: () => void; onRead: (topic: Topic, read: boolean) => void }) {
  const index = topics.findIndex((item) => item.slug === topic.slug);
  const previous = topics[index - 1];
  const next = topics[index + 1];
  const [html, setHtml] = useState('');
  useEffect(() => { setHtml(''); fetch(`./${topic.htmlPath}`).then((response) => response.text()).then(setHtml); }, [topic.htmlPath]);
  const isRead = Boolean(progress[topic.slug]?.read);
  return <article className="reader page-wrap"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to roadmap</button><div className="reader-heading"><div><span className="eyebrow">{topic.phase}</span><h1>{topic.title}</h1><div className="reader-meta"><span><Clock3 size={15} /> {topic.estimatedMinutes} min read</span><span>{topic.wordCount.toLocaleString()} words</span><span>{topic.source}</span></div></div><button className={isRead ? 'read-control marked' : 'read-control'} onClick={() => onRead(topic, !isRead)}>{isRead ? <Check size={17} /> : <BookOpen size={17} />}{isRead ? 'Marked as read' : 'Mark as read'}</button></div><div className="reader-layout"><div className="article-content" dangerouslySetInnerHTML={{ __html: html || '<p>Loading note...</p>' }} />{topic.pdfs.length > 0 && <aside className="article-aside"><span className="eyebrow">Reference PDF</span>{topic.pdfs.map((pdf) => <a key={pdf} href={pdf} target="_blank" rel="noreferrer"><FileText size={16} /> Open PDF <ArrowRight size={14} /></a>)}</aside>}</div><div className="reader-nav">{previous ? <button onClick={() => { window.history.pushState({}, '', `?topic=${previous.slug}`); window.dispatchEvent(new PopStateEvent('popstate')); }}><ArrowLeft size={16} /><span>Previous<strong>{previous.title}</strong></span></button> : <span />}{next && <button className="next-reader" onClick={() => { window.history.pushState({}, '', `?topic=${next.slug}`); window.dispatchEvent(new PopStateEvent('popstate')); }}><span>Next topic<strong>{next.title}</strong></span><ArrowRight size={16} /></button>}</div></article>;
}

export { App };
