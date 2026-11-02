import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ContactForm from '../Components/ContactForm';
import MemoryGame from '../Components/MemoryGame';
import ProjectCards from '../Components/ProjectCards';
import SiteShell from '../Components/SiteShell';

export default function Portfolio({ projects }) {
    const [paused, setPaused] = useState(false);
    const [note, setNote] = useState('Flower loop · Motion playing');

    const toggleWallpaper = () => {
        const video = document.querySelector('#wallpaper-video');
        if (!video) return;
        if (video.paused) {
            video.play().catch(() => setNote('Flower loop · Playback unavailable'));
            setPaused(false);
            setNote('Flower loop · Motion playing');
        } else {
            video.pause();
            setPaused(true);
            setNote('Flower loop · Motion paused');
        }
    };

    return (
        <SiteShell>
            <Head title="Mark Denzel D. Espiritu | Web Developer Portfolio" />
            <section className="hero section-wrap">
                <div className="hero-copy">
                    <p className="eyebrow"><span className="status-dot" /> BSIT student · aspiring web developer</p>
                    <h1>Building useful things,<br /><span className="gradient-text">one line at a time.</span></h1>
                    <p className="hero-description">I'm Mark Denzel Espiritu, a third-year Information Technology student who enjoys turning ideas into practical, user-friendly web experiences.</p>
                    <div className="hero-actions">
                        <a className="button" href="#projects">Explore my work <span aria-hidden="true">↘</span></a>
                        <a className="button button-quiet" href="#contact">Get in touch</a>
                    </div>
                    <div className="hero-meta">
                        <span>Currently learning <strong>Laravel</strong></span>
                        <span className="meta-separator" aria-hidden="true">/</span>
                        <span>Based in the Philippines</span>
                    </div>
                </div>
                <aside className="hero-card glass-card" aria-label="Quick introduction">
                    <div className="avatar" role="img" aria-label="Initials D E">DE</div>
                    <p className="small-label">A little about me</p>
                    <h2>Curious by default.</h2>
                    <p>I like understanding how things work, then building and improving them through practice.</p>
                    <div className="hero-card-bottom"><span className="mini-dot" /><span>Open to learning and collaboration</span></div>
                </aside>
                <div className="scroll-note" aria-hidden="true"><span /> SCROLL TO EXPLORE</div>
            </section>

            <ProjectCards projects={projects} />

            <section id="about" className="section-wrap section-block about-section">
                <div className="section-heading"><div><p className="eyebrow">A BIT ABOUT ME</p><h2>Learning through building</h2></div></div>
                <div className="about-grid">
                    <article className="glass-card about-main">
                        <p className="about-quote">“The best way to learn is to <span className="gradient-text">build, test, and improve.</span>”</p>
                        <p>I'm currently pursuing a BS in Information Technology at Urdaneta City University. Outside class, I explore web development and work on improving my problem-solving skills. I also have experience in transcription and data annotation, where accuracy and attention to detail matter.</p>
                        <p>My goal is to grow into a web developer who can build accessible, reliable, and useful applications.</p>
                        <div className="interest-list"><span>Web development</span><span>Problem-solving</span><span>Technology</span><span>AI data workflows</span></div>
                    </article>
                    <aside className="about-side">
                        <div className="glass-card stat-card"><span className="stat-number">03</span><span className="stat-label">Current year in college</span></div>
                        <div className="glass-card stat-card"><span className="stat-number">∞</span><span className="stat-label">Things left to learn</span></div>
                        <div className="glass-card note-card"><span className="note-symbol">✳</span><p><strong>What I value</strong><br />Curiosity, consistency, and being willing to ask why.</p></div>
                    </aside>
                </div>
            </section>

            <section id="skills" className="section-wrap section-block">
                <div className="section-heading">
                    <div><p className="eyebrow">TOOLS I USE</p><h2>Skills I'm developing</h2></div>
                    <p className="section-intro">These are technologies I've studied or practiced. I'm still learning, and I keep building to improve.</p>
                </div>
                <div className="skills-grid">
                    <article className="glass-card skill-card"><div className="skill-icon">01</div><h3>Frontend</h3><p>Building page structure and responsive interfaces.</p><div className="tag-list"><span>HTML5</span><span>CSS</span><span>Tailwind CSS</span><span>JavaScript</span></div></article>
                    <article className="glass-card skill-card"><div className="skill-icon">02</div><h3>Backend</h3><p>Learning how web apps handle routes, data, and server logic.</p><div className="tag-list"><span>PHP</span><span>Laravel</span><span>Java</span></div></article>
                    <article className="glass-card skill-card"><div className="skill-icon">03</div><h3>Data & tools</h3><p>Working with databases and local development tools.</p><div className="tag-list"><span>MySQL</span><span>Firebase</span><span>Git</span><span>XAMPP</span></div></article>
                    <article className="glass-card skill-card"><div className="skill-icon">04</div><h3>Ways of working</h3><p>Habits that support better software and teamwork.</p><div className="tag-list"><span>Attention to detail</span><span>Problem-solving</span><span>Teamwork</span><span>Continuous learning</span></div></article>
                </div>
                <p className="section-footnote">No skill percentages are shown because I prefer to demonstrate ability through working projects rather than arbitrary numbers.</p>
            </section>

            <section id="journey" className="section-wrap section-block">
                <div className="section-heading"><div><p className="eyebrow">MY JOURNEY</p><h2>Education & experience</h2></div></div>
                <div className="journey-grid">
                    <div className="glass-card journey-card"><h3><span className="journey-mark">↗</span> Education</h3><div className="timeline-item"><span className="timeline-date">2024 – Present</span><h4>Bachelor of Science in Information Technology</h4><p>Urdaneta City University</p><span className="timeline-note">Third-year student</span></div></div>
                    <div className="glass-card journey-card"><h3><span className="journey-mark">↗</span> Experience</h3><div className="timeline-item"><span className="timeline-date">2025 – Present</span><h4>Transcriber / Annotator</h4><p>Sigma AI</p><span className="timeline-note">Transcription, annotation, and quality-focused review</span></div></div>
                </div>
                <div className="certificates">
                    <div className="certificate-heading"><h3>Training & certificates</h3><p>Credentials listed from my existing portfolio draft.</p></div>
                    <div className="certificate-grid">
                        <article className="glass-card certificate-card"><div className="certificate-icon">✓</div><div><p className="timeline-date">April 2024</p><h4>Computer Systems Servicing NC II</h4><p>COC 1: Installing and configuring computer systems<br />COC 2: Setting up computer networks</p></div></article>
                        <article className="glass-card certificate-card"><div className="certificate-icon">✓</div><div><p className="timeline-date">July 2024</p><h4>Electronic Products Assembly and Servicing NC II</h4><p>Assembly and servicing of electronic products and systems.</p></div></article>
                    </div>
                </div>
            </section>

            <section id="wallpaper" className="section-wrap section-block wallpaper-section">
                <div className="wallpaper-demo glass-card">
                    <div>
                        <p className="eyebrow">A LITTLE EXTRA</p>
                        <h2>A flower in motion.</h2>
                        <p>A locally stored flower-loop video brings a little movement to the page. Pause or resume it whenever you like.</p>
                    </div>
                    <div className="wallpaper-controls">
                        <button className="button button-small button-quiet" type="button" aria-pressed={paused} onClick={toggleWallpaper}>
                            {paused ? 'Resume motion' : 'Pause motion'}
                        </button>
                        <span aria-live="polite">{note}</span>
                    </div>
                </div>
            </section>

            <MemoryGame />

            <section id="contact" className="section-wrap section-block contact-section">
                <div className="contact-grid">
                    <div>
                        <p className="eyebrow">GET IN TOUCH</p>
                        <h2>Have an idea?<br /><span className="gradient-text">Let's talk.</span></h2>
                        <p className="contact-copy">I'm happy to connect about web development, school projects, or opportunities to learn and collaborate.</p>
                        <div className="contact-links">
                            <a href="mailto:markdenzelespiritu@gmail.com">✉ markdenzelespiritu@gmail.com</a>
                            <a href="https://github.com/markdenzelespiritu-collab" target="_blank" rel="noreferrer">↗ GitHub profile</a>
                            <a href="https://www.linkedin.com/in/mark-denzel-undefined-74448a281" target="_blank" rel="noreferrer">↗ LinkedIn</a>
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </section>
        </SiteShell>
    );
}
