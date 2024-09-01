<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjecResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        if(request('name'))
            $query->where('name', 'like', '%' . request('name') . '%');


        $query = $query->paginate(10)->onEachSide(1);

        return inertia("Project/index", [
            "projects" => ProjecResource::collection($query),
            "parameters" => request()->query() ?: null,
        ]);
    }

    /**
     * View the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        Project::create($data);

        return to_route('project.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $tasks = $project->tasks();

        if(request('name'))
            $tasks->where('name', 'like', '%' . request('name') . '%');
        if(request('status'))
            $tasks->where('status', request('status'));

        $tasks = $tasks->paginate(10)->onEachSide(1);

        return inertia("Project/view", [
            "project" => new ProjecResource($project),
            "tasks" => TaskResource::collection($tasks),
            "paramaters" => request()->query() ?: null,
        ]);
    }

    /**
     * View the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
