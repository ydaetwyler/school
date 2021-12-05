import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const SIGN_UP = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!, $userHash: String!) {
        signUp(username: $username, email: $email, password: $password, userHash: $userHash)
    }
`

const NewUserAccess = () => {
    const [userHash] = useState(useParams().hash)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie] = useCookies(['userToken'])
    const [signUp, { loading, error }] = useMutation(SIGN_UP, {
        onCompleted: (data) => setCookie('userToken', data.signUp, { 
            maxAge: (60*60*24),
            sameSite: true
        })
    })

    console.log(userHash)

    const submitHandler = async event => {
        event.preventDefault()
        try {
            await signUp({ variables: { username, email, password, userHash } })
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