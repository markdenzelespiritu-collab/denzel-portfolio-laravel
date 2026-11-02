<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->string('type_label');
            $table->text('description');
            $table->string('tech_stack');
            $table->string('status');
            $table->string('visual_tag');
            $table->string('project_url')->nullable();
            $table->string('repository_url')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();
            $table->unique('title');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
