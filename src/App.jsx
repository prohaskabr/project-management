import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(name) {
    setProjectsState(prev => {
      const newId = Math.random();

      const newTask = {
        id: newId,
        projectId: prev.selectedProjectId,
        name: name,
      };

      return {
        ...prev,
        tasks: [...prev.tasks, newTask]
      };
    });

  }

  function handleDeleteTask(id) {
    setProjectsState(prev => {
      return {
        ...prev,
        tasks: [...prev.tasks.filter(t => t.id !== id)],
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState(prev => {
      return {
        ...prev,
        selectedProjectId: null
      };
    });
  }

  function handleCancelProject() {
    setProjectsState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prev => {
      const newId = Math.random();

      const newProject = {
        id: newId,
        title: projectData.title,
        description: projectData.description,
        dueDate: projectData.dueDate,
      };

      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject]
      };
    });
  }

  function handleSelectProject(projectId) {
    setProjectsState(prev => {
      return {
        ...prev,
        selectedProjectId: projectId
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState(prev => {
      return {
        ...prev,
        projects: [...prev.projects.filter(p => p.id !== prev.selectedProjectId)],
        selectedProjectId: undefined
      };
    });
  }

  const selectedProject = projectsState.projects.find(p => p.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} tasks={projectsState.tasks} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onSaveProject={handleAddProject} onCancel={handleCancelProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8" >
      <ProjectSidebar onStartAddProject={handleStartAddProject} onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId} projects={projectsState.projects} selectedProjectId={projectsState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
