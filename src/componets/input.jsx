import { forwardRef } from "react";

const input = forwardRef(function Input({textarea, label, ...props}, ref) {
    let style = 'bg-stone-400 border-stone-900 rounded-md text-stone-800 px-4 py-2 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-stone-600 focus:border-transparent';
    
    return (
        <p className="flex flex-col gap-0.5 mb-4">
            <label className="uppercase text-sm font-semibold text-stone-700">{label}</label>
            {textarea ? <textarea {...props} className={style} ref={ref}/> : <input {...props} className={style} ref={ref}/>}
        </p>
    )
}); 

export default input;