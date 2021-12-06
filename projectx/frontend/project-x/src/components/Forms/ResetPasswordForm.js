import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextInput from './Utils/TextInput'
import { RESET_PASSWORD } from '../../utils/mutations'

const validateForm = Yup.object({
    password: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .min(8, 'Password has to be 8 characters or more')
        .required('Required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must contain 8 characters or more, one uppercase, one lowercase, one number and one special case character"
        ),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password confirmation does not match')
})

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
        <Formik
            initialValues={{ password: '', passwordConfirm: '' }}
            validationSchema={validateForm}
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
    )
}

export default ResetPassword