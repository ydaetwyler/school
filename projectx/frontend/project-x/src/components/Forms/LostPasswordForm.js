import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'

import TextInput from './Utils/TextInput'
import { LOST_PASSWORD } from '../../utils/mutations'
import { validateLostPassword } from './Utils/validations'

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
            validationSchema={validateLostPassword}
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