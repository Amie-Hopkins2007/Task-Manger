import { useRef, useState } from "react"

import Button from "./button"
import Input from "./input"
import Modal from './Modal.jsx';
import DropDown from "./dropdown/dropdown.jsx";

export default function NewProject({ onAdd, onCancel }) {
    const modal = useRef(); 

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    const [selectedCity, setSelectedCity] = useState('');

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if ( 
            enteredTitle.trim() === '' || 
            enteredDescription.trim() === '' || 
            enteredDueDate.trim() === '' ||
            selectedCity === ''
        ) {
            modal.current.open(); 
            return; 
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
            city: selectedCity
        }); 
    }

    return (
        <>
        <Modal ref={modal} buttonCaption='Okay'>
            <h2>Invalid Input</h2>
            <p>Oops ... looks like you forgot to enter a value.</p> 
            <p>Please make sure you provide a vaild value for every input filed.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className='flex  items-center justify-end gap-4 my-4'>
                <li><Button onClick={onCancel}>Cancel</Button></li>
                <li><Button onClick={handleSave}>Save</Button></li>
            </menu>
            <div>
                <Input type='text' ref={title} label='Title'/>
                <Input ref={description} label='Description' textarea/>
                <Input type='date' ref={dueDate} label='Due Date'/>
                <div className='text-xs text-stone-500 mt-2'>* Please enter a valid date</div>
                <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="bg-stone-400 border-stone-900 rounded-md text-stone-800 px-4 py-2 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent mb-4">
                  <option value="">Select a City</option>
                  <option value="glasgow">Glasgow</option>
                  <option value="edinburgh">Edinburgh</option>
                  <option value="aberdeen">Aberdeen</option>
                  <option value="inverness">Inverness</option>
                </select>
            </div>
        </div>
        </>
    )
}