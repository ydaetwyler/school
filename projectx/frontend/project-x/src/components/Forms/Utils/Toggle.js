import React from 'react'

const Toggle = ({ onChange, defaultChecked, text }) => (
    <div className="absolute right-12">
        <label htmlFor="toggle" className="flex items-center cursor-pointer relative mb-4">
            <input 
                type="checkbox" 
                id="toggle" 
                className="sr-only"
                onChange={onChange}
                defaultChecked={defaultChecked}
            />
            <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
            <span className="ml-3 text-white text-sm font-medium">{text}</span>
        </label>
    </div>
)

export default Toggle