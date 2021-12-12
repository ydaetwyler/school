import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useMutation } from '@apollo/client'
import { Navigate } from 'react-router-dom'

import TextInput from './Utils/TextInput'
import { CREATE_FAMILY } from '../../utils/mutations'
import { validateNewFamily } from './Utils/validations'

const NewFamilyForm = () => {
    const [redirect, setRedirect] = useState("")
    const [fail, setFail] = useState(false)
    const [createFamily, { loading, error }] = useMutation(CREATE_FAMILY, {
        onCompleted: (data) => setRedirect(`/login/${data.createFamily}`),
        onError: () => setFail(true)
    })

    if (redirect) return <Navigate to={redirect} />

    return (
        <div>
        <h1>Start family</h1>
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
                        id="familyName"
                        label="Family name"
                        name="familyName"
                        type="text"
                        placeholder=""
                    />
                    <button disabled={loading} type="submit">Create family</button>
                    {error && <p>{error.message}</p>}
                </Form>
            </Formik>
        </div>
    )
}

export default NewFamilyForm