import { useState } from 'react';

const filters = [
    ['all', 'All work'],
    ['web', 'Web development'],
    ['school', 'Academic'],
    ['personal', 'Personal'],
];

function Visual({ project }) {
    if (project.image) {
        return (
            <div className="project-visual" style={{ padding: 0, overflow: 'hidden' }}>
                <img src={`/storage/${project.image}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
        );
    }
    if (project.category === 'school') {
        return (
            <div className="project-visual visual-uv">
                <span className="visual-tag">{project.visual_tag}</span>
                <div className="map-lines"><span /><span /><span /><b>YOU<br />ARE HERE</b></div>
            </div>
        );
    }
    if (project.category === 'personal') {
        return (
            <div className="project-visual visual-portfolio">
                <span className="visual-tag">{project.visual_tag}</span>
                <div className="portfolio-mini"><b>DE.</b><span>Web developer portfolio</span><i /><i /><i /></div>
            </div>
        );
    }
    return (
        <div className="project-visual visual-studyquest">
            <span className="visual-tag">{project.visual_tag}</span>
            <div className="mock-window">
                <div className="mock-dots"><i /><i /><i /></div>
                <div className="mock-line long" />
                <div className="mock-line" />
                <div className="mock-blocks"><i /><i /><i /></div>
            </div>
        </div>
    );
}

export default function ProjectCards({ projects }) {
    const [filter, setFilter] = useState('all');
    const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="projects" className="section-wrap section-block">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">SELECTED WORK</p>
                    <h2>Projects & experiments</h2>
                </div>
                <p className="section-intro">A mix of school work, ongoing builds, and things I create to keep learning.</p>
            </div>
            <div className="filter-row" role="group" aria-label="Filter projects">
                {filters.map(([value, label]) => (
                    <button key={value} className={`filter-chip${filter === value ? ' active' : ''}`} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>
                        {label}
                    </button>
                ))}
            </div>
            <div className="project-grid">
                {visible.map((project) => (
                    <article key={project.id} className="project-card glass-card">
                        <Visual project={project} />
                        <div className="project-content">
                            <p className="project-type">{String(project.display_order).padStart(2, '0')} / {project.type_label}</p>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tag-list">
                                {project.tech_stack.split(',').map((tag) => (
                                    <span key={tag.trim()}>{tag.trim()}</span>
                                ))}
                            </div>
                            <p className="project-status">
                                {(project.category === 'web' || project.category === 'personal') && <span className="status-dot" />}
                                {project.status}
                            </p>
                            {(project.project_url || project.repository_url) && (
                                <p className="project-status">
                                    {project.project_url && <a href={project.project_url} target="_blank" rel="noreferrer">Live ↗</a>}
                                    {project.project_url && project.repository_url ? ' · ' : ''}
                                    {project.repository_url && <a href={project.repository_url} target="_blank" rel="noreferrer">Code ↗</a>}
                                </p>
                            )}
                        </div>
                    </article>
                ))}
            </div>
            <p className="section-footnote">Project descriptions identify work in progress and concepts honestly. Add screenshots or repository links when they are ready to share.</p>
        </section>
    );
}
