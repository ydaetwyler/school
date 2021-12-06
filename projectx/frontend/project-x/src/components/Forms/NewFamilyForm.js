import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { Navigate } from 'react-router-dom'

import TextInput from './Utils/TextInput'

const CREATE_FAMILY = gql`
    mutation CreateFamily($familyName: String!) {
        createFamily(familyName: $familyName)
    }
`

const validateForm = Yup.object({
    familyName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, 'Only alphates are allowed')
})

const NewFamilyForm = () => {
    const [redirect, setRedirect] = useState("")
    const [createFamily, { loading, error }] = useMutation(CREATE_FAMILY, {
        onCompleted: (data) => setRedirect(`/login/${data.createFamily}`)
    })

    if (redirect) return <Navigate to={redirect} />

    return (
        <Formik
            initialValues={{ familyName: '' }}
            validationSchema={validateForm}
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