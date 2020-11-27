import React from 'react'

const Select = ({ id, name, label, options, onChange }) => (
    <div>
        <label htmlFor={id}>{label}</label>
        <select class='form-control' name={name} id={id} onChange={onChange}>
            {options.map((option, index) => (renderOption(option, index)))}
        </select>
    </div>
)

function renderOption (option, index) {
    return <option value={option.id} key={index}>{option.city}</option>
}

export default Select
