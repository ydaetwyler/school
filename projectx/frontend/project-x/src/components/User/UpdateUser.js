import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'

import TextInput from '../Forms/Utils/TextInput'
import { UPDATE_USER } from '../../utils/mutations'
import { validateUserUpdate } from '../Forms/Utils/validations'

const GET_USER = gql`
    query GetUser {
        getUser {
            userName,
            avatarUrl
        }
    }
`

const UpdateUser = ({ clicked, setClicked, initialUser, initialAvatar }) => {
    const [emojis, setEmojis] = useState([])
    const [selectEmoji, setSelectEmoji] = useState(initialAvatar)
    const [fail, setFail] = useState(false)
    
    const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
        update: (cache, { data }) => {

            cache.writeQuery({
                query: GET_USER,
                data: {
                   getUser: {
                       userName: data.username,
                       avatarUrl: data.avatarUrl
                   } 
                }
            })
        },
        onCompleted: () => setClicked(false),
        onError: () => setFail(true)
    })

    const getEmojis = () => {
        const arr = []
        
        for (let i = 1; i <= 117; i++) {
            arr.push(`/openmoji/emoji${i}.png`)
        }

        return arr
    }

    useEffect(() => {
        setEmojis(getEmojis())
    }, [])

    useEffect(() => {
        const handleEsc = event => {
            if (event.keyCode === 27) {
                setClicked(false)
            }
        }
        window.addEventListener('keydown', handleEsc)
    })

    if (loading) return <img src="/icons/loading.png" className="animate-spin h-9 w-9" />
    if (error) return JSON.stringify(error, null, 2)

    if (!clicked) return null

    return (
        <div className="h-2/5 min-h-[430px] w-96 min-w-[300px] bg-white/[.13] absolute -translate-y-2/4 translate-x-2/4 top-2/4 right-2/4 rounded-md backdrop-blur-md border-2 border-white/[.1] shadow-xl shadow-gray-900/[.6] py-12 px-9 before:(p-0, m-0, box-border) after:(p-0, m-0, box-border) font-['Mulish'] z-50">
            <img 
                src="/icons/close.png" 
                className="absolute top-1.5 right-1.5 h-6 w-6 opacity-30 hover:opacity-100 cursor-pointer"
                onClick={() => setClicked(false)}
            />
            <h3 className="mb-2 text-center text-4xl text-white font-medium leading-9">
                Change user
            </h3>
            <Formik
                initialValues={{ username: initialUser }}
                validationSchema={validateUserUpdate}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        updateUser({ variables: { 
                            username: values.username,
                            avatarUrl: selectEmoji
                            } })
                        setSubmitting(false)
                    }, 400)
                }}
            >
                <Form>
                    <TextInput
                        className="mb-3 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-xl font-medium text-white"
                        id="username"
                        label="Name"
                        name="username"
                        type="text"
                        placeholder=""
                    />
                    <div className="flex flex-row overflow-x-scroll mt-6">
                        {emojis.map((emoji) => 
                            <img key={emoji} className={`h-12 w-12 mb-4 cursor-pointer ${(emoji === selectEmoji) ? "bg-blue-200/[.5]" : "bg-none"}`} src={emoji} onClick={() => setSelectEmoji(emoji)} />
                        )}
                    </div>
                    <button
                        className="mt-6 w-full bg-white text-black py-3 text-xl font-semibold rounded-sm cursor-pointer" 
                        disabled={loading} 
                        type="submit"
                    >
                        Save
                    </button>
                    {error && <p>{error.message}</p>}
                </Form>
            </Formik>
        </div>
)
}

export default UpdateUser