import React from 'react';
import './CustomTags.css';

export const TextArea = ({input, meta, ...props}) => {
    const isCorrect = meta.touched && meta.error;
    return(
        <div className = {isCorrect ? 'error' : 'valid'}>
             <div><textarea {...input} {...props} /></div>
             {isCorrect && <span>{meta.error}</span>}
        </div>
    )
}

export const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
    <input type={type} name={name} checked={checked} onChange={onChange} />
);