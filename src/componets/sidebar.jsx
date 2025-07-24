import Button from "./button"

export default function Sidebar({ onStartAddProject, projects = [], onSelectProject, selectedProjectId }) {
    return (
        <aside className='w-1/3 px-8 py-16 bg-stone-500 text-stone-800 md:w-72 rounded-r h-screen'>
            <h2 className='mb-8 font-bold uppercase md:text-xl text-stone-900'>Your Tasks</h2>
            <div>
                <Button onClick={onStartAddProject}>+ Add Project</Button>
            </div>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        <button className='w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                        onClick={() => onSelectProject(project.id)}>{project.title}</button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}