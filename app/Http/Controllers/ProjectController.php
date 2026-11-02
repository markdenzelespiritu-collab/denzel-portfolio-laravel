<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::orderBy('display_order')->orderBy('id')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate($this->rules(), $this->messages());
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }
        Project::create($validated);
        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', ['project' => $project]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate($this->rules($project), $this->messages());
        if ($request->hasFile('image')) {
            if ($project->image) Storage::disk('public')->delete($project->image);
            $validated['image'] = $request->file('image')->store('projects', 'public');
        } else {
            unset($validated['image']);
        }
        $project->update($validated);
        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->image) Storage::disk('public')->delete($project->image);
        $project->delete();
        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }

    private function rules(?Project $project = null): array
    {
        return [
            'title' => ['required', 'string', 'max:120', Rule::unique('projects', 'title')->ignore($project?->id)],
            'category' => ['required', Rule::in(['web', 'school', 'personal'])],
            'type_label' => ['required', 'string', 'max:80'],
            'description' => ['required', 'string', 'min:20', 'max:1000'],
            'tech_stack' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'max:120'],
            'visual_tag' => ['required', 'string', 'max:40'],
            'project_url' => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'display_order' => ['required', 'integer', 'min:0', 'max:999'],
        ];
    }

    private function messages(): array
    {
        return [
            'title.required' => 'Give the project a title.',
            'title.unique' => 'You already have a project with this title.',
            'title.max' => 'The title may not be longer than 120 characters.',
            'category.required' => 'Choose a category so the filters still work.',
            'category.in' => 'Category must be web, school, or personal.',
            'type_label.required' => 'Add a short type label, like WEB APPLICATION.',
            'description.required' => 'Write a description so visitors know what this is.',
            'description.min' => 'The description needs at least 20 characters.',
            'tech_stack.required' => 'List the tools or topics used, separated by commas.',
            'status.required' => 'Add a status line, like Ongoing school project.',
            'visual_tag.required' => 'Add the small badge text shown on the card.',
            'project_url.url' => 'The live URL must start with http:// or https://.',
            'repository_url.url' => 'The repository URL must start with http:// or https://.',
            'image.image' => 'The upload has to be an image.',
            'image.mimes' => 'Use a jpeg, png, jpg, gif, or webp image.',
            'image.max' => 'The image may not be larger than 2MB.',
            'display_order.integer' => 'Display order must be a whole number.',
            'display_order.min' => 'Display order cannot be negative.',
        ];
    }
}
