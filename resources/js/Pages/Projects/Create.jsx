import { Head, Link } from '@inertiajs/react';
import ProjectForm from '../../Components/ProjectForm';
import SiteShell from '../../Components/SiteShell';

export default function Create() {
    return (
        <SiteShell>
            <Head title="New project" />
            <div className="section-wrap manage-wrap">
                <p className="eyebrow">CREATE</p>
                <h1>New project</h1>
                <p style={{ margin: '12px 0 20px' }}><Link className="link-quiet" href="/projects">← Back to list</Link></p>
                <ProjectForm />
            </div>
        </SiteShell>
    );
}
