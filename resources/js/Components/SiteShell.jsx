import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const links = [
    ['projects', 'Projects'],
    ['about', 'About'],
    ['skills', 'Skills'],
    ['journey', 'Journey'],
    ['rhythm', 'Mini game'],
    ['contact', 'Contact'],
];

export default function SiteShell({ children }) {
    const { flash, url } = usePage().props;
    const pageUrl = usePage().url;
    const onHome = pageUrl === '/' || pageUrl.startsWith('/?') || pageUrl.startsWith('/#');
    const hrefFor = (id) => (onHome ? `#${id}` : `/#${id}`);
    const [open, setOpen] = useState(false);
    const [light, setLight] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('denzel-portfolio-theme') === 'light';
        setLight(saved);
        document.body.classList.toggle('light-theme', saved);
    }, []);

    useEffect(() => {
        const video = document.querySelector('#wallpaper-video');
        if (!video) return;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) video.pause();
        else video.play().catch(() => {});
    }, []);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
        const ripple = document.createElement('span');
        ripple.className = 'click-ripple';
        ripple.setAttribute('aria-hidden', 'true');
        document.body.append(ripple);
        const onDown = (event) => {
            ripple.style.left = `${event.clientX}px`;
            ripple.style.top = `${event.clientY}px`;
            ripple.getAnimations().forEach((a) => a.cancel());
            ripple.animate(
                [
                    { opacity: 0.75, transform: 'translate(-50%, -50%) scale(.35)' },
                    { opacity: 0, transform: 'translate(-50%, -50%) scale(2.7)' },
                ],
                { duration: 550, easing: 'ease-out' },
            );
        };
        document.addEventListener('pointerdown', onDown);
        return () => {
            document.removeEventListener('pointerdown', onDown);
            ripple.remove();
        };
    }, []);

    const toggleTheme = () => {
        const next = !light;
        setLight(next);
        document.body.classList.toggle('light-theme', next);
        localStorage.setItem('denzel-portfolio-theme', next ? 'light' : 'dark');
    };

    return (
        <>
            <div className="wallpaper-stack" aria-hidden="true">
                <video className="wallpaper-video" id="wallpaper-video" muted loop playsInline preload="auto" aria-hidden="true">
                    <source src="/videos/flower-loop.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="wallpaper-shade" aria-hidden="true" />

            <header className="site-header">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
                    <a className="brand" href={onHome ? '#home' : '/'} aria-label="Go to home">
                        DE<span>.</span>
                    </a>
                    <nav className="desktop-nav" aria-label="Main navigation">
                        {links.map(([id, label]) => (
                            <a key={id} href={hrefFor(id)}>{label}</a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle theme">
                            <span aria-hidden="true">{light ? '☾' : '☼'}</span>
                        </button>
                        <button className="icon-button mobile-only" type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
                            {open ? '✕' : '☰'}
                        </button>
                        <a href={hrefFor('contact')} className="button button-small desktop-contact">
                            Let's talk <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
                <nav id="mobile-nav" className="mobile-nav" hidden={!open}>
                    {links.map(([id, label]) => (
                        <a key={id} href={hrefFor(id)} onClick={() => setOpen(false)}>{label}</a>
                    ))}
                    <Link href="/projects" onClick={() => setOpen(false)}>Manage projects</Link>
                </nav>
            </header>

            <main id="home">
                {flash?.success && (
                    <div className="section-wrap" style={{ paddingTop: 110 }}>
                        <p className="flash-banner" role="status">{flash.success}</p>
                    </div>
                )}
                {children}
            </main>

            <footer className="site-footer">
                <div className="section-wrap footer-inner">
                    <a className="brand" href={onHome ? '#home' : '/'}>DE<span>.</span></a>
                    <p>Designed and built by Mark Denzel Espiritu · {new Date().getFullYear()}</p>
                    <span>
                        <a href={onHome ? '#home' : '/'}>Back to top ↑</a>
                        {' · '}
                        <Link href="/projects">Manage projects</Link>
                    </span>
                </div>
            </footer>
        </>
    );
}
