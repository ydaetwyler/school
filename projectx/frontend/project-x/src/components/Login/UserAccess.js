import React from 'react'

const UserAccess = () => {

    return (
        <div className="login-wrapper">
            <form>
                <label>
                    <p>E-Mail</p>
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

export default UserAccess