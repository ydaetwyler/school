import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useCookies } from 'react-cookie'
import { Formik, Form } from 'formik'

import TextInput from './Utils/TextInput'
import { SIGN_IN } from '../../utils/mutations'
import { validateUserAccess } from './Utils/validations'

const UserAccessForm = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userToken', 'accessControl'])
    const [errorCounter, setErrorCounter] = useState(0)
    const [counter, setCounter] = useState(0)
    const [signIn, { loading, error }] = useMutation(SIGN_IN, {
        onCompleted: (data) => setCookie('userToken', data.signIn, { 
            maxAge: (60*60*24),
            sameSite: false
        }),
        onError: () => {
            setErrorCounter(errorCounter + 1)
            setCounter(30)
        }
    })

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter -1), 1000)
        return () => clearInterval(timer)
    }, [counter])

    if (errorCounter >= 3 || cookies.accessControl) {

        setCookie('accessControl', '9d0c8ddb-b739-4b2f-b67a-e7d9b0c488f8', {
            maxAge: 30
        })

        if (counter === 0) {
            removeCookie(['accessControl'])
            setErrorCounter(0)
        }

        return (
            <div>
                <h1>Login</h1>
                <p>Too many failed attempts. Retry in {counter} seconds.</p>
            </div>
        )
    }

    return (
        <div>
        <h1>Login</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validateUserAccess}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        signIn({ 
                            variables: {
                            email: values.email,
                            password: values.password
                            } 
                        })
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
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder=""
                    />
                    <button disabled={loading} type="submit">Enter</button>
                    {error && <p>{error.message}</p>}
                </Form>
            </Formik>
        </div>
    )
}

export default UserAccessForm