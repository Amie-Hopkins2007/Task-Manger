import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal} from 'react-dom'; 

const Modal = forwardRef(function Modal({children, buttonCaption}, ref) {
    const dialog = useRef(); 
    
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal(); 
            }
        }
    }); 

    return createPortal(
        <dialog ref={dialog} className='rounded-md text-l bg-stone-50 text-red-500 text-center p-8 backdrop:bg-stone-900 backdrop:bg-opacity-85 shadow-md'>
            {children}
            <form method='dialog'>
                <button className='text-right text-stone-300 bg-stone-800 rounded-md mt-3'>Close</button>
            </form> 
        </dialog>, document.getElementById('modal-root')
        );
}); 

export default Modal;