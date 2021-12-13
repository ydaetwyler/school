import React from 'react'
import { useField } from 'formik'

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <>
            <label className="block mt-7 text-base font-medium text-white" htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}

export default TextField