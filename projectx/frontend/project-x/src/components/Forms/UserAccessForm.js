import React from 'react'
import { useMutation } from '@apollo/client'
import { useCookies } from 'react-cookie'
import { Formik, Form } from 'formik'

import TextInput from './Utils/TextInput'
import { SIGN_IN } from '../../utils/mutations'
import { validateUserAccess } from './Utils/validations'

const UserAccessForm = () => {
    const [cookies, setCookie] = useCookies(['userToken'])
    const [signIn, { loading, error }] = useMutation(SIGN_IN, {
        onCompleted: (data) => setCookie('userToken', data.signIn, { 
            maxAge: (60*60*24),
            sameSite: true
        })
    })

    return (
        <div>
        <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validateUserAccess}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        signIn({ variables: {
                            email: values.email,
                            password: values.password
                            } })
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
                    <TextInput
                        label="Password"
                        name="password"
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

export default UserAccessForm