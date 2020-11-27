import React from 'react'

const Input = ({ id, name, label, type, onChange }) => (
    <div>
        <label htmlFor={id}>{label}</label>
        <input
            className='form-control' type={type} name={name} id={id} onChange={onChange}
        />
    </div>
)

export default Input
