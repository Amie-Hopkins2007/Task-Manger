import { useState, useEffect } from "react";

import NoProjectSelected from "./componets/NoProjectSelected";
import Sidebar from "./componets/sidebar";
import NewProject from "./componets/NewProject.jsx";
import SelectedProject from "./componets/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState(() => {
    const saved = localStorage.getItem('projectsState');
    return saved ? JSON.parse(saved) : {
      selectedProjectId: undefined,
      projects: []
    };
  });

  useEffect(() => {
    localStorage.setItem('projectsState', JSON.stringify(projectsState));
  }, [projectsState]);

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id, 
      }
    })
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null, 
      }
    })
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined, 
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      };
    
    return {
      ...prevState,
      selectedProjectId: undefined, 
      projects: [...prevState.projects, newProject]
    }
    });
  }

  function handleDeleteProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined, 
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId), 
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject}/>; 

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/> 
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>; 
  }

  const saveToLocalStorage = () => {
    localStorage.setItem("projects", JSON.stringify(projectsState.projects));
  }

  localStorage.setItem("selectedProjectId", JSON.stringify(projectsState.selectedProjectId));
 
  return (
    <main className='h-screen flex gap-8'>
      <Sidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject}/>
      {content}
    </main>
  );
}
export default App;
