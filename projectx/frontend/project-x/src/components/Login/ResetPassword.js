import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const RESET_PASSWORD = gql`
    mutation ResetPassword($password: String!, $userHash: String!) {
        resetPassword(password: $password, userHash: $userHash)
    }
`

const ResetPassword = () => {
    const [userHash] = useState(useParams().hash)
    const [password, setPassword] = useState("")
    const [cookies, setCookie] = useCookies(['userToken'])
    const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
        onCompleted: (data) => setCookie('userToken', data.resetPassword, { 
            maxAge: (60*60*24),
            sameSite: true
        })
    })

    const submitHandler = async event => {
        event.preventDefault()
        try {
            await resetPassword({ variables: { password, userHash } })
        } catch(error) {
            console.log(JSON.stringify(error, null, 2))
        }
    }

    const passwordInputHandler = event => setPassword(event.target.value)

    return (
        <div className="login-wrapper">
            <form onSubmit={submitHandler}>
                <label>
                    <p>New Password</p>
                    <input onChange={passwordInputHandler} type="password" />
                </label>
                <div>
                    <button disabled={loading} type="submit">Reset Password</button>
                    {error && <p>{error.message}</p>}
                </div>
            </form>
        </div>
    )
}

export default ResetPassword