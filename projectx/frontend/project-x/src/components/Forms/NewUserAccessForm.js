import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextInput from './Utils/TextInput'

const SIGN_UP = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!, $userHash: String!) {
        signUp(username: $username, email: $email, password: $password, userHash: $userHash)
    }
`

const validateForm = Yup.object({
    email: Yup.string()
        .max(40, 'Must be 40 characters or less')
        .required('Required')
        .email('Invalid email'),
    username: Yup.string()
        .max(18, 'Must be 18 characters or less')
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, 'Only alphates are allowed'),
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

const NewUserAccess = () => {
    const [userHash] = useState(useParams().hash)
    const [cookies, setCookie] = useCookies(['userToken'])
    const [signUp, { loading, error }] = useMutation(SIGN_UP, {
        onCompleted: (data) => setCookie('userToken', data.signUp, { 
            maxAge: (60*60*24),
            sameSite: true
        })
    })

    return (
        <Formik
            initialValues={{ email: '', username: '', password: '', passwordConfirm: '' }}
            validationSchema={validateForm}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    signUp({ variables: { 
                        email: values.email,
                        username: values.username,
                        password: values.password,
                        userHash
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
                    label="Name"
                    name="username"
                    type="text"
                    placeholder=""
                />
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
                <button disabled={loading} type="submit">Create new user</button>
                {error && <p>{error.message}</p>}
            </Form>
        </Formik>
    )
}

export default NewUserAccess