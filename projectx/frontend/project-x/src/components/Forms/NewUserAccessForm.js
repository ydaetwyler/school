import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Formik, Form } from 'formik'

import TextInput from './Utils/TextInput'
import { SIGN_UP } from '../../utils/mutations'
import { validateNewUserAccess } from './Utils/validations'

const NewUserAccess = () => {
    const [userHash] = useState(useParams().hash)
    const [cookies, setCookie] = useCookies(['userToken'])
    const [signUp, { loading, error }] = useMutation(SIGN_UP, {
        onCompleted: (data) => setCookie('userToken', data.signUp, { 
            maxAge: (60*60*24),
            sameSite: false
        })
    })

    return (
        <div>
        <h1>Join family</h1>
            <Formik
                initialValues={{ email: '', username: '', password: '', passwordConfirm: '' }}
                validationSchema={validateNewUserAccess}
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
        </div>
    )
}

export default NewUserAccess