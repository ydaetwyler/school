import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useMutation } from '@apollo/client'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import TextInput from './Utils/TextInput'
import { CREATE_FAMILY } from '../../utils/mutations'
import { validateNewFamily } from './Utils/validations'

const NewFamilyForm = () => {
    const [redirect, setRedirect] = useState("")
    const [fail, setFail] = useState(false)
    const [createFamily, { loading, error }] = useMutation(CREATE_FAMILY, {
        onCompleted: (data) => setRedirect(`/login/${data.createFamily}`),
        onError: () => setFail(true)
    })

    if (redirect) return <Navigate to={redirect} />

    return (
        <div className="h-2/5 min-h-[430px] w-96 min-w-[300px] bg-white/[.13] absolute -translate-y-2/4 translate-x-2/4 top-2/4 right-2/4 rounded-md backdrop-blur-md border-2 border-white/[.1] shadow-xl shadow-gray-900/[.6] py-12 px-9 before:(p-0, m-0, box-border) after:(p-0, m-0, box-border) font-['Mulish']">
            <h3 className="mb-2 text-center text-4xl text-white font-medium leading-9">
                Start family
            </h3>
            <Formik
                initialValues={{ familyName: '' }}
                validationSchema={validateNewFamily}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        createFamily({ variables: { familyName: values.familyName } })
                        setSubmitting(false)
                    }, 400)
                }}
            >
                <Form>
                    <TextInput
                        className="mb-3 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-sm font-light text-white"
                        id="familyName"
                        label="Family name"
                        name="familyName"
                        type="text"
                        placeholder=""
                    />
                    <button 
                        className="mt-12 w-full bg-white text-black py-3 text-xl font-semibold rounded-sm cursor-pointer" 
                        disabled={loading} 
                        type="submit"
                    >
                        Create family
                    </button>
                    {error && <p>{error.message}</p>}
                </Form>
            </Formik>
            <div className="mt-6 flex flex-row justify-between">
                <Link to="/">Back to login</Link>
            </div>
        </div>
    )
}

export default NewFamilyForm