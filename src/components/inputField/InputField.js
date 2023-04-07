import React from 'react';

function InputField(props) {
    const { label, type, name, id, value, onChange, required } = props;
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}

export default InputField;