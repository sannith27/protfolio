import { useState } from 'react'
import {
  profile,
  stats,
  about,
  skills,
  projects,
  experience,
  education,
  certifications,
} from './data.js'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  const [active, setActive] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    setActive(id)
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar sections={sections} active={active} onNavigate={scrollTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <Hero profile={profile} stats={stats} onNavigate={scrollTo} />

      <Section id="about" title="About Me">
        <About profile={profile} about={about} skills={skills} />
      </Section>

      <Section id="skills" title="Skills" tone="alt">
        <Skills skills={skills} />
      </Section>

      <Section id="projects" title="Projects">
        <Projects projects={projects} />
      </Section>

      <Section id="experience" title="Experience & Education" tone="alt">
        <Experience experience={experience} education={education} certifications={certifications} />
      </Section>

      <Section id="contact" title="Get In Touch">
        <Contact profile={profile} />
      </Section>

      <Footer profile={profile} />
    </div>
  )
}

function Navbar({ sections, active, onNavigate, menuOpen, setMenuOpen }) {
  return (
    <header className="navbar">
      <button className="brand" onClick={() => onNavigate('about')}>
        {`<Dev />`}
      </button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={active === s.id ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault()
              onNavigate(s.id)
            }}
          >
            {s.label}
          </a>
        ))}
      </nav>
      <button className="hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}

function Hero({ profile, stats, onNavigate }) {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <p className="hello">Hello, I&apos;m</p>
        <h1 className="hero-name">{profile.name}</h1>
        <h2 className="hero-role">{profile.role}</h2>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onNavigate('projects')}>
            View My Work
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('contact')}>
            Contact Me
          </button>
        </div>
        <div className="hero-socials">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-link">
              {s.label}
            </a>
          ))}
        </div>
        <div className="hero-stats">
          {stats.map((st) => (
            <div className="stat" key={st.label}>
              <span className="stat-value">{st.value}</span>
              <span className="stat-label">{st.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <div className="avatar">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} />
          ) : (
            <span className="avatar-placeholder">{profile.name.charAt(0)}</span>
          )}
        </div>
        <div className="code-card">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <pre>{`const developer = {
  name: "${profile.name}",
  role: "${profile.role}",
  languages: ["JS", "TS", "Python"],
  passion: "building things"
};`}</pre>
        </div>
      </div>
    </section>
  )
}

function Section({ id, title, children, tone }) {
  return (
    <section id={id} className={`section ${tone ? 'section-alt' : ''}`}>
      <div className="section-inner">
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  )
}

function About({ profile, about, skills }) {
  return (
    <div className="about-grid">
      <div className="about-text">
        {about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="about-meta">
          <div>
            <strong>Location</strong>
            <p>{profile.location}</p>
          </div>
          <div>
            <strong>Email</strong>
            <p>{profile.email}</p>
          </div>
        </div>
        {profile.resumeLink && (
          <a className="btn btn-primary" href={profile.resumeLink} target="_blank" rel="noreferrer">
            Download Resume
          </a>
        )}
      </div>
      <div className="about-skills">
        <h3>Top Skills</h3>
        <div className="skill-cloud">
          {skills.slice(0, 3).map((group) =>
            group.items.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function Skills({ skills }) {
  return (
    <div className="skills-grid">
      {skills.map((group) => (
        <div className="skill-card" key={group.category}>
          <h3>{group.category}</h3>
          <div className="skill-list">
            {group.items.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Projects({ projects }) {
  return (
    <div className="projects-grid">
      {projects.map((p) => (
        <div className="project-card" key={p.title}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <div className="project-tech">
            {p.tech.map((t) => (
              <span className="chip chip-sm" key={t}>
                {t}
              </span>
            ))}
          </div>
          <div className="project-links">
            <a href={p.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function Experience({ experience, education, certifications }) {
  return (
    <div className="exp-grid">
      <div>
        <h3 className="block-title">Work Experience</h3>
        <div className="timeline">
          {experience.map((job) => (
            <div className="timeline-item" key={job.role + job.company}>
              <div className="timeline-head">
                <h4>{job.role}</h4>
                <span className="period">{job.period}</span>
              </div>
              <p className="company">{job.company}</p>
              <ul>
                {job.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="block-title">Education</h3>
        {education.map((ed) => (
          <div className="timeline-item" key={ed.degree}>
            <div className="timeline-head">
              <h4>{ed.degree}</h4>
              <span className="period">{ed.period}</span>
            </div>
            <p className="company">{ed.school}</p>
            <p>{ed.detail}</p>
          </div>
        ))}
        <h3 className="block-title">Certifications</h3>
        <ul className="cert-list">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Contact({ profile }) {
  return (
    <div className="contact-grid">
      <div className="contact-info">
        <p>
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
        <div className="contact-lines">
          <div>
            <strong>Email</strong>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div>
            <strong>Phone</strong>
            <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}>{profile.phone}</a>
          </div>
          <div>
            <strong>Location</strong>
            <span>{profile.location}</span>
          </div>
        </div>
        <div className="hero-socials">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-link">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={(e) => {
          e.preventDefault()
          window.open(
            `mailto:${profile.email}?subject=${encodeURIComponent('Portfolio Contact')}`,
            '_self'
          )
        }}
      >
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea rows="5" placeholder="Your Message" required />
        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>
    </div>
  )
}

function Footer({ profile }) {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React.
      </p>
      <p>{profile.role}</p>
    </footer>
  )
}
