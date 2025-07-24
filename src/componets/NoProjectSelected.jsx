import noProjectsImg from '../assets/no-projects.png';
import Button from './button.jsx';

export default function NoProjectSelected({onStartAddProject}) {
    return (
        <div className='mt-24 text-center w-2/3'>
            <img src={noProjectsImg} className='w-16 h-16 object-contain mx-auto mt-4'/>
            <h2 className='mt-2 uppercase text-stone-900 font-semibold'>No Task Has Been Selected</h2>
            <p className=' text-stone-600'>Please select a task from the sidebar or create a new project</p>
            <p>
                <Button onClick={onStartAddProject}>Create New Project</Button>
            </p>
        </div>
    );
}