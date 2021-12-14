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
        <div className="h-3/5 min-h-[630px] w-96 min-w-[300px] bg-white/[.13] absolute -translate-y-2/4 translate-x-2/4 top-2/4 right-2/4 rounded-md backdrop-blur-md border-2 border-white/[.1] shadow-xl shadow-gray-900/[.6] py-12 px-9 before:(p-0, m-0, box-border) after:(p-0, m-0, box-border) font-['Mulish']">
            <h3 className="mb-2 text-center text-4xl text-white font-medium leading-9">
                Join family
            </h3>
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
                        className="mb-3 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-sm font-light text-white"
                        id="email"
                        label="E-Mail"
                        name="email"
                        type="text"
                        placeholder=""
                    />
                    <TextInput
                        className="mb-3 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-sm font-light text-white"
                        id="username"
                        label="Name"
                        name="username"
                        type="text"
                        placeholder=""
                    />
                    <TextInput
                        className="mb-3 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-sm font-light text-white"
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder=""
                    />
                    <TextInput
                        className="mb-3 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-sm font-light text-white"
                        id="passwordConfirm"
                        label="Password confirmation"
                        name="passwordConfirm"
                        type="password"
                        placeholder=""
                    />
                    <button
                        className="mt-12 w-full bg-white text-black py-3 text-xl font-semibold rounded-sm cursor-pointer" 
                        disabled={loading} 
                        type="submit"
                    >
                        Create new user
                    </button>
                    {error && <p>{error.message}</p>}
                </Form>
            </Formik>
        </div>
    )
}

export default NewUserAccessForm