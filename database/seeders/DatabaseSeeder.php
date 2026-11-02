<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'StudyQuest',
                'category' => 'web',
                'type_label' => 'WEB APPLICATION',
                'description' => 'A group learning-platform project exploring how teachers can share lessons and quizzes while students complete class activities.',
                'tech_stack' => 'Laravel, Blade, JavaScript, Firebase',
                'status' => 'Ongoing school project',
                'visual_tag' => 'IN PROGRESS',
                'display_order' => 1,
            ],
            [
                'title' => 'UCU Freshman UV Navigation',
                'category' => 'school',
                'type_label' => 'HUMAN-COMPUTER INTERACTION',
                'description' => 'A campus-navigation concept aimed at helping new students find university locations with less confusion.',
                'tech_stack' => 'HCI, Navigation UX, Student-centered design',
                'status' => 'Academic project concept',
                'visual_tag' => 'ACADEMIC CONCEPT',
                'display_order' => 2,
            ],
            [
                'title' => 'Personal Portfolio',
                'category' => 'personal',
                'type_label' => 'FRONTEND',
                'description' => 'This website brings together my background, skills, projects, and a flower-loop wallpaper built with Laravel, Inertia, and React.',
                'tech_stack' => 'Laravel, Inertia.js, React, Tailwind CSS',
                'status' => 'Building and improving',
                'visual_tag' => 'PERSONAL BUILD',
                'display_order' => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['title' => $project['title']], $project);
        }
    }
}
