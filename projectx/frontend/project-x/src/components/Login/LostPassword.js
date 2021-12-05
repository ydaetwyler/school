import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const LOST_PASSWORD = gql`
    mutation LostPassword($email: String!) {
        lostPassword(email: $email)
    }
`

const LostPassword = () => {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const [lostPassword, { loading, error }] = useMutation(LOST_PASSWORD, {
        onCompleted: () => setSent(true)
    })

    const submitHandler = async event => {
        event.preventDefault()
        try {
            await lostPassword({ variables: { email } })
        } catch(error) {
            console.log(JSON.stringify(error, null, 2))
        }
    }

    const inputHandler = event => setEmail(event.target.value)

    if (sent) return (
        <div>
            <p>Reset Link Sent</p>
        </div>
    )
    
    return (
        <div className="login-wrapper">
            <form onSubmit={submitHandler}>
                <label>
                    <p>E-Mail</p>
                    <input onChange={inputHandler} type="text" />
                </label>
                <div>
                    <button disabled={loading} type="submit">Send Reset Link</button>
                    {error && <p>{error.message}</p>}
                </div>
            </form>
        </div>
    )
}

export default LostPassword