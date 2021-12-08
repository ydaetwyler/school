import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Formik, Form } from 'formik'

import TextInput from './Utils/TextInput'
import { RESET_PASSWORD } from '../../utils/mutations'
import { validateResetPassword } from './Utils/validations'

const ResetPassword = () => {
    const [userHash] = useState(useParams().hash)
    const [cookies, setCookie] = useCookies(['userToken'])
    const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
        onCompleted: (data) => setCookie('userToken', data.resetPassword, { 
            maxAge: (60*60*24),
            sameSite: true
        })
    })

    return (
        <div>
            <h1>Reset Password</h1>
            <Formik
                initialValues={{ password: '', passwordConfirm: '' }}
                validationSchema={validateResetPassword}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        resetPassword({ variables: { 
                            password: values.password,
                            userHash
                            } })
                        setSubmitting(false)
                    }, 400)
                }}
            >
                <Form>
                    <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder=""
                    />
                    <TextInput
                        label="Password confirmation"
                        name="passwordConfirm"
                        type="password"
                        placeholder=""
                    />
                    <button disabled={loading} type="submit">Reset password</button>
                    {error && <p>{error.message}</p>}
                </Form>
            </Formik>
        </div>

    )
}

export default ResetPassword