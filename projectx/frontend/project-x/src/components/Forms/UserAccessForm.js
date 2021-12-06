import React from 'react'
import { useMutation } from '@apollo/client'
import { useCookies } from 'react-cookie'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextInput from './Utils/TextInput'
import { SIGN_IN } from '../../utils/mutations'

const validateForm = Yup.object({
    email: Yup.string()
        .required('Required')
        .email('Invalid email'),
    password: Yup.string()
        .required('Required')
})

const UserAccessForm = () => {
    const [cookies, setCookie] = useCookies(['userToken'])
    const [signIn, { loading, error }] = useMutation(SIGN_IN, {
        onCompleted: (data) => setCookie('userToken', data.signIn, { 
            maxAge: (60*60*24),
            sameSite: true
        })
    })

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validateForm}
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
    )
}

export default UserAccessForm