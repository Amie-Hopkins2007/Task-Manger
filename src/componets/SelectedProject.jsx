import { useEffect, useState } from "react";
import Button from "./button";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY 

export default function SelectedProject({project, onDelete}) {
    const [weather, setWeather] = useState('Loading...');
    const formatedDate = new Date(project.dueDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
    
    useEffect(() => {
        if (!project.city) {
            setWeather('No city set');
            return;
        }
        fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(project.city)}`)
            .then(res => res.json())
            .then(data => {
                if (data.current && data.current.temp_c !== undefined) {
                    setWeather(`${data.current.temp_c}°C, ${data.current.condition.text}`);
                } else if (data.error && data.error.message) {
                    setWeather(data.error.message);
                } else {
                    setWeather('No data');
                }
            })
            .catch(() => setWeather('Error fetching weather'));
    }, [project.city]);
    
    return (
        <div className="w-[35rem] mt-16">
            <header> 
                <h2 className="pb-4 uppercase text-stone-800 text-2xl font-bold">{project.title }</h2>
                <p className="text-stone-600 text-l">Due Date: {formatedDate}</p>
                <p className="text-stone-600 text-s">Description: {project.description}</p>
                <p className="text-stone-600">City: {project.city}</p>
                <p className="text-stone-600">Weather: {weather}</p>
            </header>
            <Button onClick={onDelete}>Completed</Button>
        </div>
    )
}