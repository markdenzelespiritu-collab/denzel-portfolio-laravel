<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'category', 'type_label', 'description', 'tech_stack',
        'status', 'visual_tag', 'project_url', 'repository_url', 'image', 'display_order',
    ];
}
