import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextInput from './Utils/TextInput'

const LOST_PASSWORD = gql`
    mutation LostPassword($email: String!) {
        lostPassword(email: $email)
    }
`

const validateForm = Yup.object({
    email: Yup.string()
        .max(40, 'Must be 40 characters or less')
        .required('Required')
        .email('Invalid email')
})

const LostPasswordForm = () => {
    const [sent, setSent] = useState(false)
    const [lostPassword, { loading, error }] = useMutation(LOST_PASSWORD, {
        onCompleted: () => setSent(true)
    })

    if (sent) return (
        <div>
            <p>Reset Link Sent</p>
        </div>
    )

    return (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={validateForm}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    lostPassword({ variables: { email: values.email } })
                    setSubmitting(false)
                }, 400)
            }}
        >
            <Form>
                <TextInput
                    label="E-Mail"
                    name="email"
                    type="text"
                    placeholder=""
                />
                <button disabled={loading} type="submit">Send reset link</button>
                {error && <p>{error.message}</p>}
            </Form>
        </Formik>
    )
}

export default LostPasswordForm