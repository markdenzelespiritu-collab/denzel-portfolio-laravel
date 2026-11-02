import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import SiteShell from '../../Components/SiteShell';

export default function Index({ projects }) {
    const [confirmId, setConfirmId] = useState(null);

    return (
        <SiteShell>
            <Head title="Manage projects" />
            <div className="section-wrap manage-wrap">
                <div className="manage-head">
                    <div>
                        <p className="eyebrow">DATABASE</p>
                        <h1>Manage projects</h1>
                        <p className="section-intro">These records are what visitors see in the projects section.</p>
                    </div>
                    <Link href="/projects/create" className="button">New project</Link>
                </div>
                <div className="manage-list">
                    {projects.map((project) => (
                        <article key={project.id} className="glass-card manage-row">
                            <strong>{String(project.display_order).padStart(2, '0')}</strong>
                            <div>
                                <h3>{project.title}</h3>
                                <p className="section-intro">{project.type_label} · {project.category}</p>
                            </div>
                            <div className="manage-actions">
                                <Link className="link-quiet" href={`/projects/${project.id}/edit`}>Edit</Link>
                                {confirmId === project.id ? (
                                    <>
                                        <button className="confirm-delete" type="button" onClick={() => router.delete(`/projects/${project.id}`)}>Confirm delete</button>
                                        <button className="link-quiet" type="button" onClick={() => setConfirmId(null)} style={{ background: 'transparent', border: 0 }}>Cancel</button>
                                    </>
                                ) : (
                                    <button className="confirm-delete" type="button" onClick={() => setConfirmId(project.id)}>Delete</button>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </SiteShell>
    );
}
