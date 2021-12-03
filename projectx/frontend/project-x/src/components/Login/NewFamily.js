import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Navigate } from 'react-router-dom'

const CREATE_FAMILY = gql`
    mutation CreateFamily($familyName: String!) {
        createFamily(familyName: $familyName)
    }
`

const NewFamily = () => {
    const [familyName, setFamilyName] = useState("")
    const [redirect, setRedirect] = useState("")
    const [createFamily, { loading, error }] = useMutation(CREATE_FAMILY, {
        onCompleted: (data) => setRedirect(`/login/${data.createFamily}`)
    })

    const submitHandler = async event => {
        event.preventDefault()
        try {
            await createFamily({ variables: { familyName } })
        } catch(error) {
            console.log(error)
        }
    }

    const inputHandler = event => setFamilyName(event.target.value)

    if (redirect) return <Navigate to={redirect} />

    return (
        <div className="login-wrapper">
            <form onSubmit={submitHandler}>
                <label>
                    <p>Family Name</p>
                    <input onChange={inputHandler} type="text" />
                </label>
                <div>
                    <button disabled={loading} type="submit">Create</button>
                    {error && <p>{error.message}</p>}
                </div>
            </form>
        </div>
    )
}

export default NewFamily