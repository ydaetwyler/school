import React from 'react'

const NewUserAccess = () => {

    return (
        <div className="login-wrapper">
            <h2>Invitation</h2>
            <p>Create new user to join</p>
            <form>
                <label>
                    <p>E-Mail</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Username</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default NewUserAccess