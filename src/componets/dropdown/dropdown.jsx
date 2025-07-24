import './dropdown.css';
import {useState, useEffect, useRef} from 'react';
import Button from '../button';

export default function DropDown() {
    const [dropdownToggle, setDropdownToggle] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null)
    const dropdownRef = useRef(null);
    
    useEffect(() => {
        function handler(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownToggle(false);
            }
        }
        document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);

    const dropDownOptions = [
        { id: 1, label: 'Glasgow', value: 'glasgow' },
        { id: 2, label: 'Edinburgh', value: 'edinburgh' },
        { id: 3, label: 'Aberdeen', value: 'aberdeen' },
        { id: 4, label: 'Inverness', value: 'inverness' }
    ];

    return (
        <div className='dropdown' ref={dropdownRef}>
            <Button onClick={() => setDropdownToggle(!dropdownToggle)}>
                {selectedOption ? selectedOption.label : 'Select a City'} {dropdownToggle ? '-' : '+'}
            </Button>
            <div className={`option${dropdownToggle ? ' visible' : ''}`}>
                {dropDownOptions.map((option) => (
                    <button
                        key={option.id}
                        className={selectedOption && selectedOption.id === option.id ? 'selected' : ''}
                        onClick={() => {
                            setSelectedOption(option);
                            setDropdownToggle(false);
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}