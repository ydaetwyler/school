import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { gql, useQuery, useMutation } from '@apollo/client'
import getShortDate from '../../utils/getShortDate'
import stringToDate from '../../utils/stringToDate'

import Gallery from './Gallery'

import TextInput from '../Forms/Utils/TextInput'
import TextArea from '../Forms/Utils/TextArea'
import { validateEvent } from '../Forms/Utils/validations'

import { 
    REMOVE_PARTICIPANT,
    ADD_PARTICIPANT,
    CHECK_USER_PARTICIPANT,
    UPDATE_EVENT_ITEM
 } from '../../utils/mutations'

const GET_EVENTPARTICIPANTS = gql`
    query GetEventParticipants($_id: ID!) {
        getEventParticipants(_id: $_id) {
            activityParticipantsList {
                userName,
                avatarUrl
            }
        }
    }
`

const PARTICIPANTS_SUBSCRIPTION = gql`
    subscription  EventParticipantsChanged($_id: ID!) {
        eventParticipantsChanged(_id: $_id) {
            activityParticipantsList {
                userName,
                avatarUrl
            }
        }
    }
`

const UpdateEvent = ({ clicked, setClicked, id, item }) => {
    const [removeParticipant] = useMutation(REMOVE_PARTICIPANT, {
        onError: () => setFail(true)
    })
    const [addParticipant] = useMutation(ADD_PARTICIPANT, {
        onError: () => setFail(true)
    })
    const { loading, error, data: dataParticipants, subscribeToMore } = useQuery(GET_EVENTPARTICIPANTS, {
        variables: { _id: id }
    })
    const [galleryClicked, setGalleryClicked] = useState(false)
    const [imgUrl, setImgUrl] = useState(item.activityImageUrl)
    const [fail, setFail] = useState(false)
    const [joined, setJoined] = useState()

    const [checkUserParticipant, { data }] = useMutation(CHECK_USER_PARTICIPANT, {
        onError: () => setFail(true),
        onCompleted: data => setJoined(data.checkUserParticipant)
    })

    const [updateEventItem, { loading: loadingUpdateEvent, error: errorUpdateEvent }] = useMutation(UPDATE_EVENT_ITEM, {
        onCompleted: () => setClicked(false),
        onError: () => setFail(true)
    })

    useEffect(() => {
        checkUserParticipant({ 
            variables: { 
                _id: id
            } 
        })
    }, [])

    useEffect(() => {
        subscribeToMore({
            document: PARTICIPANTS_SUBSCRIPTION,
            variables: { _id: id },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const newEventItem = subscriptionData.data.eventItemChanged

                return {
                    getEventParticipants: {...prev.getEventItem, ...newEventItem}
                }
            }
        })
    }, [])

    const handleJoinChange = () => {
        if (joined) {
            removeParticipant({ 
                variables: { 
                    _id: id,
                } 
            })
            setJoined(false)
        } else {
            addParticipant({ 
                variables: { 
                    _id: id,
                } 
            })
            setJoined(true)
        }
    }
    
    if (!clicked) return null

    if (loading || loadingUpdateEvent) return <img src="/icons/loading.png" className="animate-spin h-9 w-9" />
    if (error || errorUpdateEvent) return JSON.stringify(error ? error : errorUpdateEvent, null, 2)

    return (
        <div>
            <div className="h-screen w-full backdrop-blur-md top-0 fixed">
                <div className="h-auto w-96 min-w-[480px] bg-gray-800/[.9] absolute -translate-y-2/4 translate-x-2/4 top-2/4 right-2/4 rounded-md border-2 border-white/[.1] shadow-xl shadow-gray-900/[.6] py-12 px-9 before:(p-0, m-0, box-border) after:(p-0, m-0, box-border) font-['Mulish']">
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
                            activityDescription: item.activityDescription,
                            activityUrl: item.activityUrl,
                        }}
                        validationSchema={validateEvent}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                updateEventItem({ variables: { 
                                    _id: id,
                                    activityImageUrl: imgUrl,
                                    activityName: values.activityName,
                                    activityDescription: values.activityDescription,
                                    activityDate: stringToDate(values.activityDate),
                                    activityLocation: values.activityLocation,
                                    activityAddress: values.activityAddress,
                                    activityUrl: values.activityUrl,
                                    } })
                                setSubmitting(false)
                            }, 400)
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
                            <TextInput
                                className="mb-6 block h-12 w-full bg-white/[.07] rounded-sm px-2 mt-2 text-xl font-medium text-white"
                                id="activityUrl"
                                label="Url"
                                name="activityUrl"
                                type="text"
                                placeholder=""
                            />
                            <button
                                className="mt-3 mb-6 w-full bg-white text-black py-3 text-xl font-semibold rounded-sm cursor-pointer" 
                                disabled={loading || loadingUpdateEvent} 
                                type="submit"
                            >
                            Update event
                            </button>
                            {errorUpdateEvent && <p>{errorUpdateEvent.message}</p>}
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
                            {dataParticipants.getEventParticipants.activityParticipantsList ? dataParticipants.getEventParticipants.activityParticipantsList.map((member) => 
                                <p key={member.userName} className="text-white">{member.userName}</p>
                            ) : null}
                            {dataParticipants.getEventParticipants.activityParticipantsList ? dataParticipants.getEventParticipants.activityParticipantsList.map((member) =>
                                <img key={member.userName} className="h-12 w-12" src={member.avatarUrl} />
                            ) : null}
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