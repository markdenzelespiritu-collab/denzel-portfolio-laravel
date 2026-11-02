<?php

use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Portfolio', [
        'projects' => Project::orderBy('display_order')->orderBy('id')->get(),
    ]);
})->name('portfolio');

Route::resource('projects', ProjectController::class)->except(['show']);
