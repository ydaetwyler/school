import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'

import TextInput from './Utils/TextInput'
import { LOST_PASSWORD } from '../../utils/mutations'
import { validateLostPassword } from './Utils/validations'

const LostPasswordForm = () => {
    const [sent, setSent] = useState(false)
    const [mailto, setMailto] = useState('')
    const [lostPassword, { loading, error }] = useMutation(LOST_PASSWORD, {
        onCompleted: () => setSent(true),
        onError: () => setSent(true)
    })

    if (sent) return (
        <div>
            <p>Reset link sent to {mailto} (if user exists)</p>
            <p>Please check your mailbox</p>
        </div>
    )

    return (
        <div>
        <h1>Reset password</h1>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={validateLostPassword}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        setMailto(values.email)
                        lostPassword({ variables: { email: values.email } })
                        setSubmitting(false)
                    }, 400)
                }}
            >
                <Form>
                    <TextInput
                        id="email"
                        label="E-Mail"
                        name="email"
                        type="text"
                        placeholder=""
                    />
                    <button disabled={loading} type="submit">Send reset link</button>
                </Form>
            </Formik>
        </div>
    )
}

export default LostPasswordForm