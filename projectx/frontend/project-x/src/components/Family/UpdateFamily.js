import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'

import TextInput from '../Forms/Utils/TextInput'
import { UPDATE_FAMILY } from '../../utils/mutations'
import { validateNewFamily} from '../Forms/Utils/validations'

const GET_FAMILY = gql`
    query GetFamily {
        getFamily {
            familyName,
            familyAvatarUrl,
            familyMembers {
                userName,
                avatarUrl
            }
        }
    }
`

const UpdateFamily = ({ clicked, setClicked, initialFamily, initialAvatar, familyMembers }) => {
    const [emojis, setEmojis] = useState([])
    const [selectEmoji, setSelectEmoji] = useState(initialAvatar)
    const [fail, setFail] = useState(false)
    
    const [updateUser, { loading, error }] = useMutation(UPDATE_FAMILY, {
        update: (cache, { data }) => {

            cache.writeQuery({
                query: GET_FAMILY,
                data: {
                   getFamily: {
                       familyName: data.familyName,
                       familyAvatarUrl: data.familyAvatarUrl
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

    if (loading) return 'Loading...'
    if (error) return JSON.stringify(error, null, 2)

    if (!clicked) return null

    return (
        <div className="h-2/5 min-h-[530px] w-96 min-w-[300px] bg-white/[.13] absolute -translate-y-2/4 translate-x-2/4 top-2/4 right-2/4 rounded-md backdrop-blur-md border-2 border-white/[.1] shadow-xl shadow-gray-900/[.6] py-12 px-9 before:(p-0, m-0, box-border) after:(p-0, m-0, box-border) font-['Mulish']">
            <img 
                src="/icons/close.png" 
                className="absolute top-1.5 right-1.5 h-6 w-6 opacity-30 hover:opacity-100 cursor-pointer"
                onClick={() => setClicked(false)}
            />
            <h3 className="mb-2 text-center text-4xl text-white font-medium leading-9">
                Members
            </h3>
            <div className="flex flex-row overflow-x-scroll mt-2">
                <div className="flex flex-col items-center">
                    {familyMembers.map((member) =>
                        <p key={member.userName} className="text-white">{member.userName}</p>
                    )}
                    {familyMembers.map((member) => 
                        <img key={member.userName} className="h-12 w-12 mb-4" src={member.avatarUrl} />
                    )}
                </div>
            </div>
            <h3 className="mb-2 text-center text-4xl text-white font-medium leading-9">
                Change family
            </h3>
            <Formik
                initialValues={{ familyName: initialFamily }}
                validationSchema={validateNewFamily}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        updateUser({ variables: { 
                            familyName: values.familyName,
                            familyAvatarUrl: selectEmoji
                            } })
                        setSubmitting(false)
                    }, 400)
                }}
            >
                <Form>
                    <TextInput
                        className="mb-3 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-sm font-light text-white"
                        id="familyName"
                        label="Name"
                        name="familyName"
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

export default UpdateFamily