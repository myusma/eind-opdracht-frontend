import React from 'react';

function SubmitButton({ label,onClick ,className }) {
    return (
        <button type="submit" onClick={onClick} className={className}>
            {label}
        </button>
    );
}

export default SubmitButton;