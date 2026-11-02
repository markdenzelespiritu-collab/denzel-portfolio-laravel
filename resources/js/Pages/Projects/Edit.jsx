import { Head, Link } from '@inertiajs/react';
import ProjectForm from '../../Components/ProjectForm';
import SiteShell from '../../Components/SiteShell';

export default function Edit({ project }) {
    return (
        <SiteShell>
            <Head title={`Edit ${project.title}`} />
            <div className="section-wrap manage-wrap">
                <p className="eyebrow">UPDATE</p>
                <h1>Edit {project.title}</h1>
                <p style={{ margin: '12px 0 20px' }}><Link className="link-quiet" href="/projects">← Back to list</Link></p>
                <ProjectForm project={project} />
            </div>
        </SiteShell>
    );
}
