'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Circle,
  Fingerprint,
  Layers3,
  Menu,
  MoveRight,
  Network,
  Orbit,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  X,
} from 'lucide-react';

type ModalProps = { open: boolean; onClose: () => void };

function ConversationModal({ open, onClose }: ModalProps) {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (!open) setSubmitted(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="conversation-modal" role="dialog" aria-modal="true" aria-labelledby="conversation-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close conversation form"><X size={19} /></button>
        {submitted ? (
          <div className="form-success">
            <div className="success-mark"><Check size={22} /></div>
            <p className="eyebrow">Message received</p>
            <h2>Good businesses start with a clear first conversation.</h2>
            <p>We’ll get back to you with a thoughtful next step.</p>
            <button className="button button-dark" onClick={onClose}>Back to the page <ArrowUpRight size={16} /></button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Start a conversation</p>
            <h2 id="conversation-title">Tell us where the system feels stuck.</h2>
            <p className="modal-intro">A few lines is enough. We read every note ourselves.</p>
            <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <label>Name<input required name="name" placeholder="Your name" /></label>
              <label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label>
              <label>What are you building?<textarea required name="context" rows={3} placeholder="A little context..." /></label>
              <button className="button button-lime button-full" type="submit">Send the note <MoveRight size={17} /></button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`brand ${light ? 'brand-light' : ''}`} aria-label="Studio Agentic home"><span className="brand-orbit"><span /></span><span>studio<br /><strong>agentic</strong></span></div>;
}

function AgentField() {
  return (
    <div className="agent-field" aria-label="Your context, combined with people and AI, leads to clear decisions">
      <div className="field-grid" />
      <div className="field-crosshair crosshair-one" /><div className="field-crosshair crosshair-two" />
      <div className="field-readout"><span className="pulse-dot" /> how it works / 3 steps</div>
      <div className="signal-stack">
        <div className="signal-stage">
          <span className="stage-index">01</span>
          <div><span className="stage-kicker">Start with</span><strong>Your context</strong></div>
          <span className="stage-meta">Your goals, knowledge and constraints</span>
        </div>
        <div className="signal-stage signal-stage-active">
          <span className="stage-index">02</span>
          <div><span className="stage-kicker">Work together</span><strong>People + AI</strong></div>
          <span className="stage-meta">Human judgment with intelligent support</span>
        </div>
        <div className="signal-stage">
          <span className="stage-index">03</span>
          <div><span className="stage-kicker">Move forward</span><strong>Clear decisions</strong></div>
          <span className="stage-meta">Know what to do next</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = mainRef.current?.querySelectorAll('.reveal');
    if (!elements) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ['top', 'system', 'products', 'studio']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-20% 0px -55%', threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main ref={mainRef} className="site-shell">
      <header className="site-header">
        <button className="logo-button" onClick={() => goTo('top')} aria-label="Go to the top of the page"><Logo /></button>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <button className={activeSection === 'system' ? 'is-active' : ''} aria-current={activeSection === 'system' ? 'page' : undefined} onClick={() => goTo('system')}>The system <ArrowDownRight size={16} /></button>
          <button className={activeSection === 'products' ? 'is-active' : ''} aria-current={activeSection === 'products' ? 'page' : undefined} onClick={() => goTo('products')}>Products</button>
          <button className={activeSection === 'studio' ? 'is-active' : ''} aria-current={activeSection === 'studio' ? 'page' : undefined} onClick={() => goTo('studio')}>Studio Agentic</button>
          <button className="nav-mobile-cta" onClick={() => { setMenuOpen(false); setModalOpen(true); }}>Start a conversation <ArrowUpRight size={14} /></button>
        </nav>
        <button className="header-cta" onClick={() => setModalOpen(true)}>Start a conversation <ArrowUpRight size={15} /></button>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section id="top" className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow reveal">Business, with a better nervous system.</p>
          <h1 className="hero-title reveal">Make your<br /><em>business</em> more<br />investable.</h1>
          <div className="hero-bottom reveal">
            <p>We help ambitious founders turn the invisible work of growth into a system that can carry more: more clarity, more capability, more future.</p>
          </div>
        </div>
        <AgentField />
      </section>

      <section className="manifesto section-pad">
        <div className="section-kicker manifesto-kicker reveal"><span>Why now</span></div>
        <div className="manifesto-layout">
          <h2 className="display-title reveal">The next constraint<br />is rarely <span>ambition.</span></h2>
          <div className="manifesto-note reveal"><p>It is usually the way ambition moves through the business.</p><p className="muted-copy">Decisions live in too many places. Expertise leaves with one person. Good work gets repeated from scratch. We make the underlying system visible — then make it work better.</p></div>
        </div>
        <div className="signal-strip reveal"><span>Signal over noise</span><span>Human judgment, multiplied</span><span>Built for the next chapter</span></div>
      </section>

      <section id="system" className="dark-section section-pad">
        <div className="section-kicker light system-kicker reveal"><span>The system</span><i className="kicker-rule" /></div>
        <div className="dark-intro">
          <h2 className="display-title light reveal">Build a business<br />that <span>remembers.</span></h2>
          <p className="light-copy reveal">A strong business does not depend on one heroic person holding everything in their head. It turns insight into infrastructure — without sanding off the human edge.</p>
        </div>
        <div className="system-map reveal">
          <div className="map-origin"><span className="map-number" aria-hidden="true"><Fingerprint size={16} strokeWidth={1.7} /></span><strong>Your context</strong><small>what makes this business yours</small></div>
          <div className="map-path"><span className="path-line" /><span className="path-label">translate / connect / repeat</span><span className="map-orb"><Network size={19} /></span></div>
          <div className="map-destination"><span className="map-number" aria-hidden="true"><Orbit size={16} strokeWidth={1.7} /></span><strong>A living system</strong><small>more capacity, less dependency</small></div>
        </div>
        <div className="pillar-grid">
          {[
            [Workflow, 'Clear the drag', 'See where work slows, gets lost, or asks too much of the wrong person. Then redesign the flow.'],
            [Sparkles, 'Orchestrate intelligence', 'Put agents and people in the right sequence so information becomes decisions, not more noise.'],
            [Layers3, 'Scale what is rare', 'Turn your team’s best judgment into shared capability — a system others can build on.'],
            [ShieldCheck, 'Make it durable', 'Create operating rhythms that make the business easier to run, explain, and invest in.'],
          ].map(([Icon, title, copy], index) => {
            const PillarIcon = Icon as typeof Workflow;
            return <article className={`pillar-card pillar-${index + 1}`} key={title as string}><span className="pillar-index">0{index + 1}</span><PillarIcon size={22} strokeWidth={1.5} /><h3>{title as string}</h3><p>{copy as string}</p><ArrowUpRight className="pillar-arrow" size={17} /></article>;
          })}
        </div>
      </section>

      <section id="products" className="products section-pad">
        <div className="section-kicker products-kicker reveal"><span>Products</span></div>
        <div className="products-head"><h2 className="display-title reveal">Intelligence, orchestrated.<br /><span>Your business, amplified.</span></h2><p className="reveal">Studio Agentic’s specialized agents work together to remove friction, amplify capability, and make growth easier to navigate.</p></div>
        <div className="products-list">
          {[
            [Workflow, '01', 'Workflow Optimization', 'Strip friction, redesign processes so teams move faster and data flows cleanly.'],
            [Network, '02', 'AI Command Center', 'Central intelligence layer that coordinates agents, monitors performance, and surfaces decisions in real time.'],
            [Sparkles, '03', 'Capability Amplification', 'Turn individual expertise into scalable systems so the team (and the founder) becomes more valuable.'],
            [Target, '04', 'Investability Layer', 'Metrics, narratives, and operating rhythms that make capital partners say yes.'],
          ].map(([Icon, number, title, copy], index) => {
            const ProductIcon = Icon as typeof Workflow;
            return <button className={`product-card reveal row-${index + 1}`} key={number as string} onClick={() => setModalOpen(true)} aria-label={`Discuss ${title}`}>
              <span className="product-card-top"><span className="product-number">{number as string}</span></span>
              <span className="product-icon"><ProductIcon size={27} strokeWidth={1.5} /></span>
              <span className="product-content"><h3>{title as string}</h3><p>{copy as string}</p></span>
              <span className="product-action"><span>Explore agent</span><MoveRight size={20} /></span>
            </button>;
          })}
        </div>
      </section>

      <section id="studio" className="studio-section section-pad">
        <div className="studio-visual reveal">
          <div className="visual-topline"><span>Studio Agentic / Command centre</span><span><i /> connected</span></div>
          <div className="visual-title"><span>work /</span><strong>in motion</strong></div>
          <div className="command-grid"><div className="command-card command-card-main"><div className="card-label">signal map <span>updated now</span></div><div className="bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="card-foot"><span>capacity</span><strong>moving outward <ArrowUpRight size={14} /></strong></div></div><div className="command-card command-card-side"><div className="card-label">active agents</div><div className="agent-line"><span className="mini-orb lime" />Research <b>04</b></div><div className="agent-line"><span className="mini-orb coral" />Ops design <b>02</b></div><div className="agent-line"><span className="mini-orb blue" />Decision log <b>07</b></div></div><div className="command-card command-card-note"><span className="note-mark"><Target size={15} /></span><p>The best system makes the next good decision easier.</p></div></div>
          <div className="visual-ticker"><span>observe</span><MoveRight size={14} /><span>orchestrate</span><MoveRight size={14} /><span>learn</span><MoveRight size={14} /><span>repeat</span></div>
        </div>
        <div className="studio-copy"><div className="section-kicker reveal"><span>Inside the studio</span></div><h2 className="display-title reveal">Your business,<br /><span>with a second brain.</span></h2><p className="reveal">Studio Agentic is the working partnership for founders who want to grow without making everything heavier. We pair clear-eyed operating design with a practical AI command centre — calibrated to your people, your pace, and your ambition.</p><button className="button button-dark reveal" onClick={() => setModalOpen(true)}>Talk through your system <ArrowUpRight size={16} /></button></div>
      </section>

      <section className="principles section-pad">
        <div className="principles-quote reveal"><span className="quote-mark">“</span><p>AI should not make your business feel less human. It should give the human parts more room to matter.</p><span className="quote-caption">A principle we build by.</span></div>
        <div className="principles-aside reveal"><div className="aside-stamp"><Circle size={13} fill="currentColor" /> human + machine</div><p>We are interested in the space between a founder’s instinct and a team’s ability to act on it.</p></div>
      </section>

      <section className="closing section-pad">
        <p className="eyebrow light reveal">The next version starts here.</p>
        <h2 className="closing-title reveal">Make room<br />for <em>what’s next.</em></h2>
        <p className="closing-copy reveal">Bring the knot, the question, or the ambition. We’ll bring a clear view of the system around it.</p>
        <button className="button button-lime reveal" onClick={() => setModalOpen(true)}>Start a conversation <ArrowUpRight size={17} /></button>
      </section>

      <footer className="site-footer"><Logo light /><div className="footer-middle"><span>Business-building studio for ambitious founders.</span><span>© {new Date().getFullYear()} Studio Agentic</span></div><button className="footer-top" onClick={() => goTo('top')}>Back to top <ArrowUpRight size={15} /></button></footer>
      <ConversationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
