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
        <div className="h-2/5 w-96 bg-white/[.13] absolute -translate-y-2/4 translate-x-2/4 top-2/4 right-2/4 rounded-md backdrop-blur-md border-2 border-white/[.1] shadow-xl shadow-gray-900/[.6] py-12 px-9 before:(p-0, m-0, box-border) after:(p-0, m-0, box-border)">
            <h3 
                className="text-center text-3xl text-white font-medium leading-9">
                Login
            </h3>
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
                            className="block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-sm font-light text-white"
                            id="email"
                            label="E-Mail"
                            name="email"
                            type="text"
                            placeholder=""
                        />
                        <TextInput
                            className="block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-sm font-light text-white"
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            placeholder=""
                        />
                        <button
                            className="mt-12 w-full bg-white text-black py-3 text-xl font-semibold rounded-sm cursor-pointer"
                            disabled={loading} 
                            type="submit">
                                Enter
                        </button>
                        {error && <p>{error.message}</p>}
                    </Form>
                </Formik>
        </div>
    )
}

export default UserAccessForm