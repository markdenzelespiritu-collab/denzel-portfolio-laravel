import { useForm } from '@inertiajs/react';

function Field({ label, error, children }) {
    return (
        <div>
            <label>
                {label}
                {children}
            </label>
            {error && <p className="field-error">{error}</p>}
        </div>
    );
}

export default function ProjectForm({ project = null }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: project?.title || '',
        category: project?.category || 'web',
        type_label: project?.type_label || '',
        description: project?.description || '',
        tech_stack: project?.tech_stack || '',
        status: project?.status || '',
        visual_tag: project?.visual_tag || '',
        project_url: project?.project_url || '',
        repository_url: project?.repository_url || '',
        display_order: project?.display_order ?? 1,
        image: null,
        _method: project ? 'put' : 'post',
    });

    const submit = (event) => {
        event.preventDefault();
        post(project ? `/projects/${project.id}` : '/projects', { forceFormData: true });
    };

    return (
        <form className="glass-card manage-form" onSubmit={submit}>
            <Field label="Title" error={errors.title}>
                <input value={data.title} onChange={(e) => setData('title', e.target.value)} />
            </Field>
            <Field label="Category" error={errors.category}>
                <select value={data.category} onChange={(e) => setData('category', e.target.value)}>
                    <option value="web">Web development</option>
                    <option value="school">Academic</option>
                    <option value="personal">Personal</option>
                </select>
            </Field>
            <Field label="Type label" error={errors.type_label}>
                <input value={data.type_label} onChange={(e) => setData('type_label', e.target.value)} placeholder="WEB APPLICATION" />
            </Field>
            <Field label="Description" error={errors.description}>
                <textarea rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </Field>
            <Field label="Tech / topics (comma separated)" error={errors.tech_stack}>
                <input value={data.tech_stack} onChange={(e) => setData('tech_stack', e.target.value)} />
            </Field>
            <Field label="Status line" error={errors.status}>
                <input value={data.status} onChange={(e) => setData('status', e.target.value)} />
            </Field>
            <Field label="Card badge" error={errors.visual_tag}>
                <input value={data.visual_tag} onChange={(e) => setData('visual_tag', e.target.value)} />
            </Field>
            <Field label="Live URL" error={errors.project_url}>
                <input value={data.project_url} onChange={(e) => setData('project_url', e.target.value)} placeholder="https://" />
            </Field>
            <Field label="Repository URL" error={errors.repository_url}>
                <input value={data.repository_url} onChange={(e) => setData('repository_url', e.target.value)} placeholder="https://github.com/..." />
            </Field>
            <Field label="Display order" error={errors.display_order}>
                <input type="number" min="0" value={data.display_order} onChange={(e) => setData('display_order', e.target.value)} />
            </Field>
            <Field label={project?.image ? 'Replace image (optional)' : 'Image (optional)'} error={errors.image}>
                <input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0])} />
            </Field>
            {project?.image && <img src={`/storage/${project.image}`} alt="" style={{ width: 160, borderRadius: 12 }} />}
            {progress && <p className="section-footnote">Uploading {progress.percentage}%</p>}
            <button className="button" type="submit" disabled={processing}>
                {processing ? 'Saving…' : project ? 'Update project' : 'Create project'}
            </button>
        </form>
    );
}
