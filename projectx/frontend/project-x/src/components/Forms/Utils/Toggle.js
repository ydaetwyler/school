import React from 'react'
import './toggle.css'

const Toggle = ({ onChange, defaultChecked, text, position, id }) => (
    <div className={position}>
        <label htmlFor={id} className="flex items-center cursor-pointer relative mb-4">
            <input 
                type="checkbox" 
                id={id} 
                className="sr-only"
                onChange={onChange}
                defaultChecked={defaultChecked}
            />
            <div className="bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full toggle-bg"></div>
            <span className="ml-3 text-white text-sm font-medium">{text}</span>
        </label>
    </div>
)

export default Toggle