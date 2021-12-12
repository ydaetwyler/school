import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { Formik, Form } from 'formik'

import TextInput from './Utils/TextInput'
import { SIGN_UP } from '../../utils/mutations'
import { validateNewUserAccess } from './Utils/validations'

const NewUserAccessForm = () => {
    const [userHash] = useState(useParams().hash)
    const [cookies, setCookie] = useCookies(['userToken'])
    const [fail, setFail] = useState(false)
    const [signUp, { loading, error }] = useMutation(SIGN_UP, {
        onCompleted: (data) => setCookie('userToken', data.signUp, { 
            maxAge: (60*60*24),
            sameSite: false
        }),
        onError: () => setFail(true)
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
                            username: values.username,
                            email: values.email,
                            password: values.password,
                            userHash
                            } })
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
                    <TextInput
                        id="username"
                        label="Name"
                        name="username"
                        type="text"
                        placeholder=""
                    />
                    <TextInput
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder=""
                    />
                    <TextInput
                        id="passwordConfirm"
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

export default NewUserAccessForm