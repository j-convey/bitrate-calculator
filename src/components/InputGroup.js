import React from 'react';
import '../App.css'
function InputGroup({ label, id, type, value, placeholder, onChange }) {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}:</label>
            <input
                type={type}
                id={id}
                value={value}
                 placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

export default InputGroup;