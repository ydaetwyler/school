import React, { useState } from 'react'

import { gql, useMutation } from '@apollo/client'
import { Navigate, useParams } from 'react-router-dom'

const SIGN_UP = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!, $familyHash: String!) {
        signUp(username: $username, email: $email, password: $password, familyHash: $familyHash)
    }
`

const NewUserAccess = ({ setToken }) => {
    const [familyHash, setFamilyHash] = useState(useParams().hash)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [signUp, { loading, error }] = useMutation(SIGN_UP, {
        onCompleted: (data) => setToken(data.signUp)
    })

    const submitHandler = async event => {
        event.preventDefault()
        try {
            await signUp({ variables: { username, email, password, familyHash } })
        } catch(error) {
            console.log(JSON.stringify(error, null, 2))
        }
    }

    const emailInputHandler = event => setEmail(event.target.value)
    const usernameInputHandler = event => setUsername(event.target.value)
    const passwordInputHandler = event => setPassword(event.target.value)

    return (
        <div className="login-wrapper">
            <h2>Create new user</h2>
            <form onSubmit={submitHandler}>
                <label>
                    <p>E-Mail</p>
                    <input onChange={emailInputHandler} type="text" />
                </label>
                <label>
                    <p>Username</p>
                    <input onChange={usernameInputHandler} type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input onChange={passwordInputHandler} type="password" />
                </label>
                <div>
                    <button disabled={loading} type="submit">Login</button>
                    {error && <p>{error.message}</p>}
                </div>
            </form>
        </div>
    )
}

export default NewUserAccess