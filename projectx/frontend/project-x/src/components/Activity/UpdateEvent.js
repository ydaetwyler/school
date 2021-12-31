import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { gql, useQuery, useMutation } from '@apollo/client'
import getShortDate from '../../utils/getShortDate'
import stringToDate from '../../utils/stringToDate'

import Gallery from './Gallery'

import TextInput from '../Forms/Utils/TextInput'
import TextArea from '../Forms/Utils/TextArea'
import { validateEvent } from '../Forms/Utils/validations'

import { REMOVE_PARTICIPANT } from '../../utils/mutations'
import { ADD_PARTICIPANT } from '../../utils/mutations'

const GET_USER = gql`
    query GetUser {
        getUser {
            userName,
            avatarUrl
        }
    }
`

const UpdateEvent = ({ clicked, setClicked, id, item, familyID }) => {
    const [galleryClicked, setGalleryClicked] = useState(false)
    const [imgUrl, setImgUrl] = useState(item.activityImageUrl)
    const [joined, setJoined] = useState()
    const [fail, setFail] = useState(false)
    
    const { data } = useQuery(GET_USER)

    const [removeParticipant ,{error}] = useMutation(REMOVE_PARTICIPANT, {
        onError: () => setFail(true)
    })
    const [addParticipant] = useMutation(ADD_PARTICIPANT, {
        onError: () => setFail(true)
    })

    useEffect(() => {
        if (data) {
            setJoined(item.activityParticipantsList.some(user => user.userName === data.getUser.userName))
        }
    }, [data])

    const handleJoinChange = () => {
        if (joined) {
            removeParticipant({ 
                variables: { 
                    _id: familyID,
                    eventId: id
                } 
            })
            setJoined(false)
        } else {
            addParticipant({ 
                variables: { 
                    _id: familyID,
                    eventId: id
                } 
            })
            setJoined(true)
        }
    }
    if (error) return JSON.stringify(error, null, 2)
    if (!clicked) return null

    return (
        <div>
            <div className="h-screen w-full backdrop-blur-md top-0 fixed">
                <div className="h-3/5 min-h-[1200px] w-96 min-w-[480px] bg-gray-800/[.9] absolute -translate-y-2/4 translate-x-2/4 top-2/4 right-2/4 rounded-md border-2 border-white/[.1] shadow-xl shadow-gray-900/[.6] py-12 px-9 before:(p-0, m-0, box-border) after:(p-0, m-0, box-border) font-['Mulish']">
                    <img 
                        src="/icons/close.png" 
                        className="absolute top-1.5 right-1.5 h-6 w-6 opacity-30 hover:opacity-100 cursor-pointer"
                        onClick={() => setClicked(false)}
                    />
                    <img 
                        className="-mt-7 mb-5 rounded-lg w-80 mx-auto cursor-pointer" 
                        src={imgUrl} 
                        onClick={() => setGalleryClicked(true)}
                    />
                    <Formik
                        initialValues={{ 
                            activityName: item.activityName,
                            activityDate: getShortDate(item.activityDate),
                            activityLocation: item.activityLocation,
                            activityAddress: item.activityAddress,
                            activityDescription: item.activityDescription
                        }}
                        validationSchema={validateEvent}
                        onSubmit={(values, { setSubmitting }) => {
                            /*setTimeout(() => {
                                updateFamily({ variables: { 
                                    _id: familyID,
                                    familyName: values.familyName,
                                    familyAvatarUrl: selectEmoji
                                    } })
                                setSubmitting(false)
                            }, 400)*/
                        }}
                    >
                        <Form>
                            <TextInput
                                className="mb-7 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-4xl font-medium text-white text-center"
                                id="activityName"
                                name="activityName"
                                type="text"
                                placeholder=""
                            />
                            <TextArea
                                className="mb-6 block w-full bg-white/[.07] rounded-sm px-2 mt-2 text-base font-medium text-white"
                                id="activityDescription"
                                name="activityDescription"
                                rows="4"
                                placeholder=""
                            />
                            <TextInput
                                className="mb-6 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-xl font-medium text-white"
                                id="activityDate"
                                label="Date"
                                name="activityDate"
                                type="text"
                                placeholder=""
                            />
                            <TextInput
                                className="mb-3 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-xl font-medium text-white"
                                id="activityLocation"
                                label="City"
                                name="activityLocation"
                                type="text"
                                placeholder=""
                            />
                            <TextInput
                                className="mb-6 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-xl font-medium text-white"
                                id="activityAddress"
                                label="Address"
                                name="activityAddress"
                                type="text"
                                placeholder=""
                            />
                        </Form>
                    </Formik>
                    <div className="absolute right-12">
                        <label htmlFor="toggle" className="flex items-center cursor-pointer relative mb-4">
                            <input 
                                type="checkbox" 
                                id="toggle" 
                                className="sr-only"
                                onChange={handleJoinChange}
                                defaultChecked={joined}
                            />
                            <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                            <span className="ml-3 text-white text-sm font-medium">Join activity</span>
                        </label>
                    </div>
                    <h4 className="block text-xl font-medium text-gray-300">Participants</h4>
                    <div className="flex flex-row overflow-x-scroll mt-3 mb-6">
                        <div className="flex flex-col items-center">
                            {item.activityParticipantsList.map((member) => 
                                <p key={member.userName} className="text-white">{member.userName}</p>
                            )}
                            {item.activityParticipantsList.map((member) =>
                                <img key={member.userName} className="h-12 w-12" src={member.avatarUrl} />
                            )}
                        </div>
                    </div>
                    <div>
                        <h4 className="block text-xl font-medium text-gray-300">Weather forecast</h4>
                        <div className="flex flex-row flex-nowrap w-full">
                            <div className="flex flex-col w-1/2 items-center">
                                <img className="-mt-3 w-26" src={item.activityWeatherIcon} />
                                <p className="-mt-7 text-white text-base font-light">
                                    {item.activityWeatherDesc}
                                </p>
                                <p className="mt-1 text-white text-base font-medium">
                                    {item.activityWeatherTemp}
                                </p>
                                <p className="text-white text-base font-light">
                                    {item.activityWeatherWind}
                                </p>
                            </div>
                            <div className="pl-6 pt-6 flex flex-col w-1/2 items-start">
                                <div className="flex flex-row flex-nowrap items-baseline mb-5">
                                    <img src="/icons/sunrise.png" className="w-10 mr-4" />
                                    <p className="text-white text-base font-light">
                                        {item.activityWeatherSunrise}
                                    </p>
                                </div>
                                <div className="flex flex-row flex-nowrap items-baseline">
                                    <img src="/icons/sunset.png" className="w-10 mr-4" />
                                    <p className="text-white text-base font-light">
                                        {item.activityWeatherSunset}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Gallery
                galleryClicked={galleryClicked}
                setGalleryClicked={setGalleryClicked}
                setImgUrl={setImgUrl}
                imgUrl={imgUrl}
            />
        </div>
    )
}

export default UpdateEvent