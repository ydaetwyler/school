import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useMutation } from '@apollo/client'
import { Navigate } from 'react-router-dom'

import TextInput from './Utils/TextInput'
import { CREATE_FAMILY } from '../../utils/mutations'
import { validateNewFamily } from './Utils/validations'

const NewFamilyForm = () => {
    const [redirect, setRedirect] = useState("")
    const [createFamily, { loading, error }] = useMutation(CREATE_FAMILY, {
        onCompleted: (data) => setRedirect(`/login/${data.createFamily}`)
    })

    if (redirect) return <Navigate to={redirect} />

    return (
        <Formik
            initialValues={{ familyName: '' }}
            validationSchema={validateNewFamily}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    createFamily({ variables: { familyName: values.familyName } })
                    setSubmitting(false)
                }, 400)
            }}
        >
            <Form>
                <TextInput
                    label="Family Name"
                    name="familyName"
                    type="text"
                    placeholder=""
                />
                <button disabled={loading} type="submit">Create Family</button>
                {error && <p>{error.message}</p>}
            </Form>
        </Formik>
    )
}

export default NewFamilyForm